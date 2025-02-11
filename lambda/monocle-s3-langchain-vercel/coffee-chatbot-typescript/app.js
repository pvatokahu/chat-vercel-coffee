
// Monocle instrumentation
/*
const { setupMonocle } = require("monocle2ai")
setupMonocle(
  "openai.app"
)
*/

const { extractMessageAndTrackSpans, waitFor } = require("./utils.js") 
const { langchainInvoke } = require("./langchain.js")

export function GET(request) {

// exports.lambdaHandler = async (event, context) => {
 // var { requestMessage, cachedFoo, spans } = extractMessageAndTrackSpans(event, context)

  // extract parameter query from request
  const query = request.query;
  const llmRagResponse = langchainInvoke(requestMessage)

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        role: "assistant",
        content: [
          {
            text: llmRagResponse
          }
        ]
      },
      spans: [...spans]
    })
  };
  return response;
};


async function waitForResponse(cachedFoo) {
  await waitFor(3000);
  console.dir = cachedFoo;
}

