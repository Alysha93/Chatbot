import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Antigravity Chatbot SaaS',
  description: 'Multi-tenant RAG chatbot platform powered by Pinecone and OpenRouter.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen bg-[#020617] text-slate-100 flex flex-col`}>
        {/* Background ambient glows */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/30 blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] rounded-full bg-pink-900/20 blur-[120px]" />
        </div>
        
        <nav className="glass sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 flex items-center justify-center font-bold text-lg">
              A
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-white">Antigravity Chat</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a>
            <a href="https://github.com/Alysha93" target="_blank" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </nav>
        
        <main className="flex-1 w-full flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
