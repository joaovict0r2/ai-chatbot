"use server"

import { generateHashId } from '@/lib/utils/crypto';
import { redirect } from 'next/navigation';

type CompletionState = {
  message: string | null;
  data?: string;
};

export async function completion(
  prevState: CompletionState,
  formData: FormData
): Promise<CompletionState> {
  const prompt = formData.get('prompt');
  // nao deixa fazer request sem algo digitado
  if (!prompt) {
    return {
      message: 'Prompt is required',
      data: undefined,
    };
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt,
        max_tokens: 100
      })
    });

    const data = await response.json()
    const resultText = data.choices[0].text

    const hash = generateHashId()

    redirect(`/chat/${hash}`)

  } catch (error: any) {
    return {
      message: `An error occurred: ${error.message}`,
      data: undefined,
    };
  }
}