'use server';

import { saveChatbotConfig } from '@/lib/store';
import { ChatbotConfig } from '@/types/chatbot';
import { revalidatePath } from 'next/cache';

export async function createTenantConfig(formData: FormData) {
  const name = formData.get('name') as string;
  const domain = formData.get('domain') as string;
  const industry = formData.get('industry') as string;
  
  const siteId = `site_${domain.replace(/[^a-zA-Z0-9]/g, '_')}`;

  const config: ChatbotConfig = {
    business_profile: {
      name,
      domain,
      industry,
      tone_of_voice: formData.get('tone') as string || 'Helpful and polite',
      primary_goals: ['Answer FAQs', 'Drive conversions'],
    },
    data_model: {
      site_id: siteId,
      chunk: { id: '', text: '' },
      namespace_strategy: siteId,
    },
    rag_pipeline: {
      embedding_model: 'openai/text-embedding-3-small',
      chat_model: 'openai/gpt-4o-mini',
      top_k: 5,
      max_context_tokens: 2000,
      fallback_behavior: 'If answer not in context, say you are not sure.',
    },
    procedures: {
      booking_flow: formData.get('booking_flow') as string || '',
      pricing_policy: formData.get('pricing_policy') as string || '',
      refund_policy: formData.get('refund_policy') as string || '',
      custom_instructions: formData.get('custom_instructions') as string || '',
    },
    ui_components: {
      chat_widget: {
        position: 'bottom-right',
        theme: 'purple-gradient',
        welcome_message: `Hi! I'm your ${name} assistant. How can I help?`,
        suggested_questions: ['What are your hours?', 'How do I book?'],
      },
    },
    deployment: {
      backend_stack: 'Next.js',
      hosting: 'Vercel',
      env_vars: ['PINECONE_API_KEY', 'OPENROUTER_API_KEY'],
      routes: { chat_endpoint: '/api/chat', healthcheck_endpoint: '/api/health' },
    },
    memory: {
      store_conversation_history: true,
      max_history_messages: 20,
      per_user_memory_key: 'session_id',
    },
  };

  await saveChatbotConfig(siteId, config);
  revalidatePath('/dashboard');
  
  return { success: true, siteId };
}
