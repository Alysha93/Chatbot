import { openrouter } from './clients';

export async function embedText(text: string): Promise<number[]> {
  try {
    const res = await openrouter.post('/embeddings', {
      model: process.env.EMBEDDING_MODEL || 'openai/text-embedding-3-small',
      input: text,
    });

    return res.data.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding', error);
    throw error;
  }
}
