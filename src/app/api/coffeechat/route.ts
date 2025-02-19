import { logger } from '@/libs/Logger';
import { Document } from "llamaindex";
import { VectorStoreIndex } from "llamaindex";
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {

    const sessionId = request.headers.get('X-Session-Id');
    logger.info(`Processing request for session: ${sessionId}`);

    process.env["MONOCLE_S3_KEY_PREFIX_CURRENT"] = sessionId ? sessionId + "__" : ""

    process.env.MONO
    const json = await request.json()
    console.log("Request:", json.message);

    // Create a simple document
    const document = new Document({
        text: "Coffee is a drink made from coffee beans.",
    });

    // Create an index from the document
    const index = await VectorStoreIndex.fromDocuments([document]);

    // Query the index
    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query(
        { query: json.message }
    );

    console.log("Response from llm:", response.toString());
    return NextResponse.json({
        message: {
          role: "assistant",
          content: [
            {
              text: response.toString()
            }
          ]
        }
      });
};
