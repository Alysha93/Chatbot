import { getPineconeIndex } from './clients';
import { embedText } from './embeddings';

export async function ingestWebsite(siteId: string, chunks: any[]) {
  const index = getPineconeIndex();
  const vectors = [];

  for (const chunk of chunks) {
    if (!chunk.text) continue;
    const embedding = await embedText(chunk.text);
    
    vectors.push({
      id: chunk.id || `${siteId}-${Date.now()}-${Math.random()}`,
      values: embedding,
      metadata: {
        text: chunk.text,
        url: chunk.url || '',
        section: chunk.section || '',
        businessName: chunk.businessName || '',
        siteId,
        ...(chunk.tags ? { tags: chunk.tags } : {}),
      },
    });
  }

  if (vectors.length > 0) {
    await index.namespace(siteId).upsert({ records: vectors });
  }
}
