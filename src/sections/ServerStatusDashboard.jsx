import React from 'react';

const StatusCard = ({ name, status, icon }) => (
  <div className="bg-devops-card/40 backdrop-blur-md rounded-xl border border-devops-border p-6 flex items-center justify-between hover:scale-[1.02] transition-all duration-300 group shadow-lg">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-devops-bg/50 text-devops-secondary border border-devops-secondary/20 group-hover:border-devops-secondary/50 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-devops-text font-bold text-sm tracking-wide">{name}</h3>
        <p className="text-devops-textMuted text-xs font-mono uppercase mt-1 tracking-tighter">{status}</p>
      </div>
    </div>
    <div className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devops-primary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-devops-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
    </div>
  </div>
);

const ServerStatusDashboard = () => {
  return (
    <section id="status-dashboard" className="py-24 bg-devops-bg relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight">
            <span className="text-devops-primary font-mono mr-2">05.</span> System Availability
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-slate-900 border border-devops-border text-[10px] font-mono text-devops-primary">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devops-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-devops-primary"></span>
            </span>
            LIVE MONITORING
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard 
            name="n8n Server" 
            status="Online" 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />
          <StatusCard 
            name="Cloudflare Tunnel" 
            status="Active" 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
          />
          <StatusCard 
            name="Monitoring Service" 
            status="Running" 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          />
          <StatusCard 
            name="Docker Containers" 
            status="Healthy" 
            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          />
        </div>
      </div>
    </section>
  );
};

export default ServerStatusDashboard;
