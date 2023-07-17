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

export async function chat(apiKey: string, body: any) {
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

  const decoder = new TextDecoder();
  const resultStream = new ReadableStream(
    {
      async pull(controller) {
        const reader = response.body!.getReader();
        while (true) {
          const {value, done} = await reader.read();
          if (done) {
            console.log('close controller')
            controller.close();
          }
          console.log('Received', decoder.decode(value));
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

  return new Response(resultStream, {
    status: response.status,
    headers: response.headers,
  });
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}