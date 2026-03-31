export interface BusinessProfile {
  name: string;
  domain: string;
  industry: string;
  tone_of_voice: string;
  primary_goals: string[];
}

export interface ChunkMapping {
  id: string;
  text: string;
  url?: string;
  section?: string;
  tags?: string[];
  businessName?: string;
  siteId?: string;
}

export interface DataModel {
  site_id: string;
  chunk: ChunkMapping;
  namespace_strategy: string;
}

export interface RagPipeline {
  embedding_model: string;
  chat_model: string;
  top_k: number;
  max_context_tokens: number;
  fallback_behavior: string;
}

export interface Procedures {
  booking_flow: string;
  pricing_policy: string;
  refund_policy: string;
  custom_instructions: string;
}

export interface ChatWidgetConfig {
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | string;
  theme: string;
  welcome_message: string;
  suggested_questions: string[];
}

export interface UiComponents {
  chat_widget: ChatWidgetConfig;
}

export interface AppRoutes {
  chat_endpoint: string;
  healthcheck_endpoint: string;
}

export interface Deployment {
  backend_stack: string;
  hosting: string;
  env_vars: string[];
  routes: AppRoutes;
}

export interface MemoryConfig {
  store_conversation_history: boolean;
  max_history_messages: number;
  per_user_memory_key: string;
}

export interface ChatbotConfig {
  business_profile: BusinessProfile;
  data_model: DataModel;
  rag_pipeline: RagPipeline;
  procedures: Procedures;
  ui_components: UiComponents;
  deployment: Deployment;
  memory: MemoryConfig;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
