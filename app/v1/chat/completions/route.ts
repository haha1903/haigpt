import { NextRequest, NextResponse } from 'next/server'
import config, { ApiKey, parseApiKey } from '@/app/v1/chat/completions/config'

const DEFAULT_API_VERSION = '2023-05-15'

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

  while (true) {
    let response = await chat(apiKey, body)
    const status = response.status
    if (status < 300) {
      console.log(`Status is ${status}, return response`)
      return response
    }
    if (status === 400) {
      console.log(`Status is ${status}, use secondary api key`)
      return await chat(config.secondaryApiKey, body)
    }
    return response
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

  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let resultStream
  const status: number = await new Promise(resolve => {
    resultStream = new ReadableStream(
      {
        async pull(controller) {
          try {
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
                  resolve(response.status)
                  controller.enqueue(encoder.encode(ret))
                }
              } catch (e: any) {
                resolve(e.code)
                controller.enqueue(encoder.encode(e.message))
              }
            }
          } catch (e) {
            console.log(`pull error`)
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
  })

  return new Response(resultStream, {
    status: status,
    headers: getHeaders(response),
  })
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function handlePackage(data: string) {
  let json
  try {
    json = JSON.parse(data)
  } catch (e) {
    // ignore
  }
  if (json && json.error) {
    throw json.error
  }
  if (json && json.choices[0].finish_reason === 'content_filter') {
    throw {
      code: 400,
      message: `Content filter triggered, ${JSON.stringify(json.choices[0])}`,
    }
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

function getHeaders(response: Response) {
  let headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/event-stream; charset=utf-8')
  headers.delete('Content-Length')
  return headers
}
