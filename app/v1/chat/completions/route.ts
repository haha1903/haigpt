import {NextRequest, NextResponse} from 'next/server';

const DEFAULT_API_VERSION = '2023-05-15'
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 1000;

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!apiKey) {
    return NextResponse.json({message: 'Unauthenticated'}, {status: 401})
  }
  const body = await request.json();

  let retryCount = 0;
  while (true) {
    let response = await chat(apiKey, body);
    const status = response.status;
    if (status < 300 || status === 400) {
      console.log(`Status is ${status}, return response`);
      return response;
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

async function chat(apiKey: string, body: any) {
  const [resourceId, mapping, azureApiKey, apiVersion] = apiKey.split(':')
  const model = body['model'];

  // get deployment id
  let deploymentId;
  if (mapping.includes('|')) {
    const modelMapping = Object.fromEntries(mapping.split(',').map(pair => pair.split('|')));
    deploymentId = modelMapping[model] || Object.values(modelMapping)[0];
  } else {
    deploymentId = mapping;
  }

  let url = `https://${resourceId}.openai.azure.com/openai/deployments/${deploymentId}/chat/completions?api-version=${apiVersion || DEFAULT_API_VERSION}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'api-key': azureApiKey,
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
                  if (handleFirstPackage(data)) {
                    resolve(response.status);
                  } else {
                    resolve(500);
                  }
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

function handleFirstPackage(data: string) {
  try {
    let json = data.match(/^data: (.*?)\n$/m)?.[1];
    const firstPackage = JSON.parse(json!!);
    return !firstPackage.error;
  } catch (e) {
    console.log(`parse json error: ${e}`);
    return true;
  }
}