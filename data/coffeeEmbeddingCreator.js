const fs = require('fs');
const { OpenAI } = require('openai');
const { coffeeText } = require('./coffeeText');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function createEmbeddings() {
  const embeddings = [];

  for (let i = 0; i < coffeeText.length; i++) {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: coffeeText[i],
      });

      embeddings.push({
        text: coffeeText[i],
        embedding: response.data[0].embedding
      });

      console.log(`Created embedding for text ${i + 1}/${coffeeText.length}`);
    } catch (error) {
      console.error(`Error creating embedding for text ${i + 1}:`, error);
    }
  }

  fs.writeFileSync(
    './data/coffeeEmbedding.json',
    JSON.stringify(embeddings, null, 2)
  );
  console.log('Embeddings saved to coffeeEmbedding.json');
}

createEmbeddings().catch(console.error);
