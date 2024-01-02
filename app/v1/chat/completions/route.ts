import { NextRequest, NextResponse } from 'next/server'
import config, { ApiKey, parseApiKey } from '@/app/v1/chat/completions/config'

const DEFAULT_API_VERSION = '2023-05-15'
const MAX_RETRY_COUNT = 3
const RETRY_DELAY = 1000

export async function POST(request: NextRequest) {
  let apiKey: ApiKey
  const apiKeyStr = request.headers.get('authorization')?.replace('Bearer ', '')
  let unAuth = NextResponse.json({ message: 'Unauthenticated' }, { status: 401 })
  if (!apiKeyStr) {
    return unAuth
  }
  try {
    apiKey = parseApiKey(apiKeyStr)
  } catch (e) {
    if (config.userTokens.some(userToken => userToken.token === apiKeyStr)) {
      apiKey = config.primaryApiKey
    } else {
      return unAuth
    }
  }
  const body = await request.json()

  let retryCount = 0
  while (true) {
    let response = await chat(apiKey, body)
    const status = response.status
    if (status < 300) {
      console.log(`Status is ${status}, return response`)
      return response
    }
    if (status === 400) {
      retryCount++
      console.log(`Status is ${status}, use secondary api key`)
      apiKey = config.secondaryApiKey
    }
    if (retryCount >= MAX_RETRY_COUNT) {
      return response
    } else {
      retryCount++
      console.log(`Status is ${status}, Retry ${retryCount} times`)
      await delay(RETRY_DELAY)
    }
  }
}

async function chat(apiKey: ApiKey, body: any) {
  const model = body['model']

  // get deployment id
  const deploymentId = apiKey.deployment[model] || Object.values(apiKey.deployment)[0]

  let url = `https://${apiKey.resourceId}.openai.azure.com/openai/deployments/${deploymentId}/chat/completions?api-version=${apiKey.apiVersion || DEFAULT_API_VERSION}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'api-key': apiKey.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  let status = 200
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let resultStream = new ReadableStream(
    {
      async pull(controller) {
        const reader = response.body!.getReader()

        while (true) {
          const { value, done } = await reader.read()
          if (done) {
            console.log('close controller')
            controller.close()
            break
          }
          let data = decoder.decode(value)
          console.log('Received', data)
          try {
            let ret = handlePackage(data)
            if (ret) {
              controller.enqueue(encoder.encode(ret))
            }
          } catch (e) {
            console.log(`handle package error: ${e}`)
            if (typeof (e) === 'number') {
              status = e
            } else {
              status = 500
            }
          }
        }
      },
    },
    {
      highWaterMark: 1,
      size(chunk) {
        return chunk.length
      },
    },
  )

  return new Response(resultStream, {
    status: status,
    headers: response.headers,
  })
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function handlePackage(data: string) {
  try {
    const json = JSON.parse(data)
    if (json.choices[0].finish_reason === 'content_filter') {
      throw 400
    }
    return data
  } catch {
    // ignore
  }
  const contents = data.split(/\s*data: /).map(content => content.trim()).filter(content => content !== '')
  const ret = contents.map(content => {
    if (content === '[DONE]') {
      return 'data: [DONE]\n\n'
    }
    const json = JSON.parse(content)
    if (json.choices.length === 0) {
      return
    }
    if (json.choices[0].finish_reason === 'content_filter') {
      throw 400
    }
    delete json['prompt_filter_results']
    for (let choice of json.choices) {
      delete choice['content_filter_results']
    }
    return `data: ${JSON.stringify(json)}`
  }).filter(content => content)
  if (ret?.length === 0) {
    return
  }
  return `${ret.join('\n\n')}\n\n`
}
