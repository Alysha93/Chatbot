'use client';

import { createTenantConfig } from '../actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Bot, Save } from 'lucide-react';

export default function NewTenantPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await createTenantConfig(formData);
      if (res.success) {
        router.push('/dashboard');
      }
    });
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-outfit text-white flex items-center gap-3">
          <Bot className="text-purple-400" />
          Onboard New Business
        </h1>
        <p className="text-slate-400 mt-2">
          Fill out the details below to generate a new Pinecone namespace and RAG configuration blueprint for your client.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Business Profile */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-700/50 pb-2">Business Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
              Business Name
              <input name="name" required placeholder="Luxe Glow Salon" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
              Domain URL
              <input name="domain" required placeholder="luxeglowsalon.com" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
              Industry
              <input name="industry" required placeholder="Beauty / Salon" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
              Tone of Voice
              <input name="tone" placeholder="Friendly, confident, reassuring" className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-all" />
            </label>
          </div>
        </section>

        {/* Procedures & Guardrails */}
        <section className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white border-b border-slate-700/50 pb-2">Procedures & Guidelines</h2>
          
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
              Booking Flow Instructions
              <textarea name="booking_flow" placeholder="If user wants to book, direct them to /book..." className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none min-h-[80px]" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
              Pricing Policy
              <textarea name="pricing_policy" placeholder="Prices listed on /services are final..." className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none min-h-[80px]" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-300">
              Custom RAG Instructions
              <textarea name="custom_instructions" placeholder="Never invent prices; always rely on context..." className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-purple-500 outline-none min-h-[80px]" />
            </label>
          </div>
        </section>

        <div className="flex justify-end mt-4">
          <button 
            type="submit" 
            disabled={isPending}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-8 rounded-xl shadow-[0_4px_20px_rgba(168,85,247,0.3)] transition-all disabled:opacity-50"
          >
            {isPending ? 'Generating Spec...' : <><Save size={18} /> Generate Chatbot Spec</>}
          </button>
        </div>
        
      </form>
    </div>
  );
}
