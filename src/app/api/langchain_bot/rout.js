import { NextResponse } from 'next/server';
import { langchainInvoke } from './langchainInvoke';

export async function POST(request) {
    try {
        // Parse the JSON body from the request
        const { question } = await request.question;
        const answer = await langchainInvoke(question);
        // Return the same question as response
        return NextResponse.json({
            response: question,
            status: 200
        });

    } catch (error) {
        // Handle any errors
        return NextResponse.json({
            error: error.message || 'Something went wrong',
            status: 500
        });
    }
}