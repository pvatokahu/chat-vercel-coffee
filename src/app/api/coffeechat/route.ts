import { logger } from '@/libs/Logger';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const sessionId = request.headers.get('X-Session-Id');
  logger.info(`Processing request for session: ${sessionId}`);
  
  const json = await request.json()
  console.log(json)
  const id: string = uuidv4();
  const requestJson = {
    ...json,
    requestId: id,
    sessionId: sessionId
  };
  console.log(requestJson)
  const response = await fetch('chatbot-coffee-vercel-git-main-okahu.vercel.app/langchain_bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: requestJson.question
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reply = await response.json();



  try {
    const responsePayload = new TextDecoder('utf-8').decode(reply.Payload);
    return NextResponse.json(JSON.parse(JSON.parse(responsePayload).body));
  } catch (error) {
    logger.error(`Error invoking lambda function: ${error}`);
    return NextResponse.json({ error: 'Failed to invoke lambda function' }, { status: 500 });
  }
};
