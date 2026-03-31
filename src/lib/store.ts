import { ChatbotConfig } from '@/types/chatbot';

// In-memory store for demonstration purposes
// In a real SaaS, this would be a database like PostgreSQL or MongoDB
const configStore: Record<string, ChatbotConfig> = {};

export async function getChatbotConfig(siteId: string): Promise<ChatbotConfig | null> {
  return configStore[siteId] || null;
}

export async function saveChatbotConfig(siteId: string, config: ChatbotConfig): Promise<void> {
  configStore[siteId] = config;
}

export async function getAllConfigs(): Promise<Record<string, ChatbotConfig>> {
  return configStore;
}
