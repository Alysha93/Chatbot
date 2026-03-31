import axios from 'axios';
import { Pinecone } from '@pinecone-database/pinecone';

export const getPineconeClient = () => {
  if (!process.env.PINECONE_API_KEY) {
    console.warn('PINECONE_API_KEY is not set');
  }
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || 'dummy_key',
  });
};

export const getPineconeIndex = () => {
  const pc = getPineconeClient();
  return pc.Index(process.env.PINECONE_INDEX_NAME || 'websites-index');
};

export const openrouter = axios.create({
  baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
});
