import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const user = await kv.hgetall('user:2');
  return NextResponse.json(user);
}

const DEFAULT_API_VERSION = '2023-03-15-preview'

const getDeploymentId = (mapping: string, model: string): string => {
  if (mapping.includes('|')) {
    let defaultDeploymentId = ''
    const modelMapping = mapping.split(',').reduce((acc: Record<string, string>, pair: string) => {
      const [key, value] = pair.split('|')
      if (!defaultDeploymentId) {
        defaultDeploymentId = value
      }
      acc[key] = value
      return acc
    }, {})

    if (!model) {
      return defaultDeploymentId
    }

    return modelMapping[model] || defaultDeploymentId
  }

  return mapping
}

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!apiKey) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 })
  }
  const body = await request.json();
  const [resourceId, mapping, azureApiKey, apiVersion] = apiKey.split(':')
  const deploymentId = getDeploymentId(mapping, body['model']);
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
          const { value, done } = await reader.read();
          if (done) controller.close();
          console.log('Received', decoder.decode(value));
          controller.enqueue(value);
        }
      },
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