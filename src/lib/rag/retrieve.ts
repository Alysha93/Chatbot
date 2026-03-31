import { getPineconeIndex } from './clients';
import { embedText } from './embeddings';

export async function retrieveContext(siteId: string, query: string, topK = 5) {
  const queryEmbedding = await embedText(query);
  const index = getPineconeIndex();

  const res = await index.query({
    namespace: siteId,
    topK,
    includeMetadata: true,
    vector: queryEmbedding,
  });

  const matches = res.matches ?? [];

  const context = matches
    .map((m: any) => m.metadata?.text)
    .filter(Boolean)
    .join('\n\n---\n\n');

  return { context, matches };
}
