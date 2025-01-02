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
Keep responses concise and relevant.
Answer questions on each row.
Personal Information:

Name: Lam Tan Phat.
Role: Backend & Web Developer.
Age: 20.
(Born: November 8, 2004).
Location: Can Tho, Vietnam.
Email: lamphat.job@gmail.com .
Phone: (+84) 0907450814 .
Education: Currently pursuing Bachelor's in Software Engineering at FPT University (2022-2026) .

Relationship Status: Loving with Bon Nguyên.

Professional Summary:

Backend software engineer with 2 years of experience.
Focuses on AI applications and full-stack development.
Currently working as an Intern IT & Web Designer (March 2024 - Present).

Technical Skills:
***Backend

Java, C#, C++, Python, Solidity

***Frontend

HTML, CSS, JavaScript
PHP
WordPress/CMS
Figma

***Other Tools

Git
Docker
IDEs: Visual Studio, Unity, Remix, PyCharm

Notable Projects:
https://github.com/LTPPPP?tab=repositories

Achievements:

Top 14 in National Hackathon Competitions.
2nd place in "Code race" programming competition.
3rd place in "Code work" programming contest.
Published scientific research articles.

Experience:

2 Papers Published.
68 Projects completed.
6 Years of coding experience.
10 Achievements earned.

Contact
provide clickable links
GitHub : https://github.com/LTPPPP
Skype : skype:live:.cid.e1439b506c3f5b6f?chat
FaceBook : https://www.facebook.com/profile.php?id=100041724977557
Instagram : https://www.instagram.com/phatlam811/
LinkedIn : https://www.linkedin.com/in/l%C3%A2m-t%E1%BA%A5n-ph%C3%A1t-36822524a/
Locket : https://locket.camera/links/c8xfRxfDNsV5zHHt7
`

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