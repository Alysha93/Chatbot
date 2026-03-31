import { ArrowRight, Bot, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-6 py-20 min-h-[calc(100vh-80px)] items-center justify-center text-center">
      
      {/* Hero Section */}
      <h1 className="text-5xl md:text-7xl font-extrabold font-outfit tracking-tight leading-tight mb-8">
        Turn your website into a <br />
        <span className="text-gradient">Gen-AI Powerhouse</span>
      </h1>
      <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-12">
        A drop-in, premium RAG chatbot powered by Pinecone and OpenRouter. 
        Easily onboard clients, inject their knowledge base, and give their users instant, accurate answers.
      </p>

      <div className="flex items-center gap-6 mb-24">
        <Link 
          href="/dashboard"
          className="flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-semibold py-4 px-8 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all animate-float"
        >
          Go to Dashboard <ArrowRight size={20} />
        </Link>
        <Link 
          href="https://github.com/Alysha93/Chatbot"
          target="_blank"
          className="flex items-center gap-3 glass hover:bg-slate-800/60 text-white font-semibold py-4 px-8 rounded-full transition-all"
        >
          View Source Code
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Bot size={24} />
          </div>
          <h3 className="text-xl font-bold font-outfit text-white">Advanced RAG Core</h3>
          <p className="text-slate-400">
            Retrieval-Augmented Generation ensures your bot only answers based on the ground-truth data you provide it.
          </p>
        </div>
        
        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
            <Zap size={24} />
          </div>
          <h3 className="text-xl font-bold font-outfit text-white">Instant Setup</h3>
          <p className="text-slate-400">
            Just paste a customized JSON blueprint into your dashboard, and instantly receive a drop-in widget tag.
          </p>
        </div>
        
        <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-xl font-bold font-outfit text-white">Multi-Tenant Secured</h3>
          <p className="text-slate-400">
            Powered by Pinecone namespaces, customer vectors are strictly partitioned. 100% white-labeled solution.
          </p>
        </div>
      </div>
      
    </div>
  );
}
