import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-6">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors">
            Overview
          </Link>
          <Link href="/dashboard/new" className="px-4 py-2 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 transition-colors font-medium">
            + Onboard Business
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto w-full">
        {children}
      </div>
    </div>
  );
}
