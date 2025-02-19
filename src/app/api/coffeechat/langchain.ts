import { formatDocumentsAsString } from "langchain/util/document";
import { createChatbotComponents } from "./utils";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

export const langchainInvoke = async (msg: string): Promise<string> => {
    const { retriever, prompt, model } = await createChatbotComponents();
    
    // @ts-ignore
    const chain = RunnableSequence.from([
        {
            context: retriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
        },
        prompt,
        model,
        new StringOutputParser(),
    ]);

    const res = await chain.invoke(msg);
    return res;
};
