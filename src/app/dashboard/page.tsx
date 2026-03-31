import { getAllConfigs } from '@/lib/store';
import Link from 'next/link';
import { Settings, Bot, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardOverview() {
  const configs = await getAllConfigs();
  const sites = Object.keys(configs);

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold font-outfit mb-8">Your Active Tenants</h1>

      {sites.length === 0 ? (
        <div className="glass-panel text-center py-24 rounded-2xl flex flex-col justify-center items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex flex-col items-center justify-center text-purple-400">
            <Bot size={32} />
          </div>
          <h2 className="text-xl font-semibold text-white">No businesses onboarded yet</h2>
          <p className="text-slate-400 max-w-sm mb-4">
            Start by creating a LyshaChatbot config for your first client to generate their embeddable widget.
          </p>
          <Link href="/dashboard/new" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            Create First LyshaChatbot
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((siteId) => {
            const bot = configs[siteId];
            return (
              <div key={siteId} className="glass-panel p-6 rounded-2xl flex flex-col gap-4 group">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{bot.business_profile.name}</h3>
                    <p className="text-sm text-slate-400">{bot.business_profile.domain}</p>
                  </div>
                  <button title="Settings" className="text-slate-500 hover:text-white transition-colors">
                    <Settings size={20} />
                  </button>
                </div>
                
                <div className="text-sm text-slate-300 mt-2">
                  <span className="inline-block px-2 py-1 bg-purple-900/40 text-purple-300 rounded-md text-xs font-semibold mr-2 border border-purple-500/20">
                    {bot.rag_pipeline.chat_model}
                  </span>
                  <span className="inline-block px-2 py-1 bg-pink-900/40 text-pink-300 rounded-md text-xs font-semibold border border-pink-500/20">
                    {bot.ui_components.chat_widget.theme}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                  <span className="text-slate-500">Namespace: {siteId}</span>
                  <Link href={`/dashboard/${siteId}`} className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Manage <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
