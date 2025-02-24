import { logger } from '@/libs/Logger';
import { NextResponse } from 'next/server';
import { langchainInvoke } from './langchain';

export const POST = async (request: Request) => {

  const sessionId = request.headers.get('X-Session-Id');
  logger.info(`Processing request for session: ${sessionId}`);

  const json = await request.json()
  console.log("Request:", json.message);

  const llmResponse = await langchainInvoke(json.message);

  console.log("Response from llm:", llmResponse);
  return NextResponse.json({
    message: {
      role: "assistant",
      content: [
        {
          text: llmResponse
        }
      ]
    }
  });
};
