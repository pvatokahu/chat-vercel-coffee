import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Embeddings } from "@langchain/core/embeddings";
import { PromptTemplate } from "@langchain/core/prompts";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import coffeeData from "../../../../data/coffeeEmbedding.json";
import { VectorStoreRetriever } from "@langchain/core/vectorstores"


export const waitFor = async (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

interface ChatbotComponents {
  retriever: VectorStoreRetriever<MemoryVectorStore>;
  prompt: PromptTemplate;
  model: ChatOpenAI;
}

export const createChatbotComponents = async (): Promise<ChatbotComponents> => {


  const embeddings = new OpenAIEmbeddings();
  const model = new ChatOpenAI({});
  const prompt = PromptTemplate.fromTemplate(`Answer the question based only on the following context:
  {context} .
  If you don't know the answer, you can say "I don't know".
  
  Question: {question}`);

  class CoffeeEmbeddings extends Embeddings {
    model = "OpenAIEmbeddings";

    embedDocuments(_documents: string[]): Promise<number[][]> {
      return new Promise((resolve) => {
        resolve(coffeeData.map((item) => item.embedding));
      });
    }

    async embedQuery(document: string): Promise<number[]> {
      return await embeddings.embedQuery(document);
    }
  }

  const documents = coffeeData.map((item) => {
    return new Document({
      pageContent: item.text,
      metadata: {}
    });
  })
  const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    new CoffeeEmbeddings({}),
    {}
  );
  const retriever = vectorStore.asRetriever();

  return { retriever, prompt, model };
};
