import { NextResponse } from 'next/server';
import { chatWithSiteBot } from '@/lib/rag/chat';
import { getChatbotConfig } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { siteId, message, history, sessionId } = body;

    if (!siteId || !message) {
      return NextResponse.json(
        { error: 'Missing siteId or message' },
        { status: 400 }
      );
    }

    // Retrieve the specific chatbot config for this siteId
    const config = await getChatbotConfig(siteId);

    if (!config) {
      return NextResponse.json(
        { error: 'Chatbot configuration not found for this siteId' },
        { status: 404 }
      );
    }

    const answer = await chatWithSiteBot({
      siteId,
      userMessage: message,
      history,
      businessProfile: config.business_profile,
      ragPipeline: config.rag_pipeline,
    });

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('API Chat Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing chat' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
