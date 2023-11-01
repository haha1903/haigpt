import {NextRequest, NextResponse} from 'next/server';
import {ApiKey, parseApiKey} from "@/app/v1/chat/completions/config";
import config from "@/app/v1/chat/completions/config";

const DEFAULT_API_VERSION = '2023-05-15'
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 1000;

export async function POST(request: NextRequest) {
  let apiKey: ApiKey;
  const apiKeyStr = request.headers.get('authorization')?.replace('Bearer ', '')
  let unAuth = NextResponse.json({message: 'Unauthenticated'}, {status: 401});
  if (!apiKeyStr) {
    return unAuth;
  }
  try {
    apiKey = parseApiKey(apiKeyStr);
  } catch (e) {
    if (config.userTokens.some(userToken => userToken.token === apiKeyStr)) {
      apiKey = config.primaryApiKey;
    } else {
      return unAuth;
    }
  }
  const body = await request.json();

  let retryCount = 0;
  while (true) {
    let response = await chat(apiKey, body);
    const status = response.status;
    // const json = await response.json();
    /*if(json?.choices[0]?.finish_reason === 'content_filter') {
      console.log(`Status is ${status}, retry`);
    }*/
    if (status < 300) {
      console.log(`Status is ${status}, return response`);
      return response;
    }
    if (status === 400) {
      retryCount++;
      console.log(`Status is ${status}, use secondary api key`);
      apiKey = config.secondaryApiKey;
    }
    if (retryCount >= MAX_RETRY_COUNT) {
      return response;
    } else {
      retryCount++;
      console.log(`Status is ${status}, Retry ${retryCount} times`);
      await delay(RETRY_DELAY);
    }
  }
}

async function chat(apiKey: ApiKey, body: any) {
  const model = body['model'];

  // get deployment id
  const deploymentId = apiKey.deployment[model] || Object.values(apiKey.deployment)[0];

  let url = `https://${apiKey.resourceId}.openai.azure.com/openai/deployments/${deploymentId}/chat/completions?api-version=${apiKey.apiVersion || DEFAULT_API_VERSION}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'api-key': apiKey.apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });

  let resultStream: ReadableStream | undefined;
  let isFirstPackage = true;
  const status: number = await new Promise(resolve => {
        const decoder = new TextDecoder();
        resultStream = new ReadableStream(
          {
            async pull(controller) {
              const reader = response.body!.getReader();

              while (true) {
                const {value, done} = await reader.read();
                if (done) {
                  console.log('close controller')
                  controller.close();
                }
                let data = decoder.decode(value);
                if (isFirstPackage) {
                  isFirstPackage = false;
                  let status = handleFirstPackage(data);
                  resolve(status || response.status);
                }
                console.log('Received', data);
                controller.enqueue(value);
              }
            }
          },
          {
            highWaterMark: 1,
            size(chunk) {
              return chunk.length;
            },
          }
        );
      }
    )
  ;

  return new Response(resultStream, {
    status: status,
    headers: response.headers,
  });
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getContent(data: string) {
  let match = data.match(/^data: (.*?)\n$\ndata:(.*?)\n$/m);
  return [match?.[1], match?.[2]];
}

function handleFirstPackage(data: string) {
  try {
    const [firstJson, secondJson] = getContent(data);
    const firstPackage = JSON.parse(firstJson!!);
    const secondPackage = JSON.parse(secondJson!!);
    if(firstPackage.error) {
      return 500;
    }
    if(secondPackage.choices[0].finish_reason === 'content_filter') {
      return 400;
    }
  } catch (e) {
    console.log(`parse json error: ${e}`);
    return 0;
  }
}
