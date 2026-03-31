import { openrouter } from './clients';
import { retrieveContext } from './retrieve';
import { ChatMessage } from '@/types/chatbot';

export async function chatWithSiteBot(params: {
  siteId: string;
  userMessage: string;
  history?: ChatMessage[];
  businessProfile?: any;
  ragPipeline?: any;
}) {
  const { siteId, userMessage, history = [], businessProfile, ragPipeline } = params;

  // Retrieve context from Pinecone
  const topK = ragPipeline?.top_k || 5;
  const { context } = await retrieveContext(siteId, userMessage, topK);

  const systemPrompt = `
You are a helpful assistant for the website "${businessProfile?.name || siteId}".
Tone of voice: ${businessProfile?.tone_of_voice || 'helpful and polite'}

Use ONLY the provided context to answer questions about this business.
${ragPipeline?.fallback_behavior || "If the answer is not in the context, say you don't know."}

Context:
${context}
  `.trim();

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: userMessage },
  ];

  try {
    const res = await openrouter.post('/chat/completions', {
      model: ragPipeline?.chat_model || process.env.CHAT_MODEL || 'openai/gpt-4o-mini',
      messages,
    });

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error('Error in chat completion:', error);
    throw error;
  }
}
