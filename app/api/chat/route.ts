// route.ts

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyCxQGRW62OOvdqvJArZhM-hAXWtEMlAtXE");

// Thêm log để kiểm tra API key có được load không
console.log(genAI);

// Configure safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const SYSTEM_PROMPT = `You are a personal assistant with access to information about a specific person.
Use the following personal context to answer questions.
If you don't know the answer, just say you don't have that information - don't make up answers.
Keep responses concise and relevant.`;

console.log('Chat API loaded');

export async function POST(req: Request) {
  try {
    const { question, context } = await req.json();
    console.log('Received question:', question);
    
    // Get the Gemini model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      safetySettings,
    });

    // Start chat
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `${SYSTEM_PROMPT}\n\nContext: ${context}` }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I will use the provided context to answer questions about the person." }],
        },
      ],
    });

    // Generate response
    const result = await chat.sendMessage([{ text: question }]);
    const response = await result.response;
    
    return NextResponse.json({ 
      response: response.text(),
      sources: context // Return the relevant context used
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
}