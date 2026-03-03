import React from 'react';

const StatusCard = ({ name, status, icon }) => (
  <div className="bg-[#0f172a] border border-devops-border p-6 rounded-xl hover:border-devops-primary transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 w-16 h-16 bg-devops-primary/5 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-devops-primary/20 transition-all"></div>
    <div className="flex items-center gap-4">
      <div className="p-3 bg-devops-bg rounded-lg text-devops-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="text-devops-text font-bold text-sm tracking-tight">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devops-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-devops-primary"></span>
          </span>
          <span className="text-[10px] font-mono text-devops-primary font-bold uppercase tracking-widest">{status}</span>
        </div>
      </div>
    </div>
  </div>
);

const ServerStatusDashboard = () => {
  const monitoringItems = [
    { name: "n8n_cluster_01", status: "Healthy", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    { name: "cloudflare_tunnel", status: "Active", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 0 00-8 0v4h8z" /></svg> },
    { name: "prometheus_metrics", status: "Ingesting", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> },
    { name: "docker_sw_nodes", status: "Active", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
  ];

  return (
    <section id="observability" className="py-24 bg-devops-bg relative overflow-hidden border-y border-devops-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight uppercase">Observability <span className="text-devops-primary">Hub</span></h2>
            <div className="flex items-center gap-2 text-[10px] font-mono text-devops-textMuted tracking-widest">
              <span className="w-2 h-2 rounded-full bg-devops-primary"></span> 
              GLOBAL INFRASTRUCTURE STATUS: NOMINAL
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {monitoringItems.map((item, index) => (
            <StatusCard key={index} {...item} />
          ))}
        </div>

        {/* Live Metrics / Console Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#0a0f18] border border-devops-border rounded-2xl p-6 font-mono overflow-hidden">
             <div className="flex items-center justify-between mb-4 pb-4 border-b border-devops-border/30">
                <span className="text-[10px] text-devops-textMuted uppercase tracking-widest flex items-center gap-2">
                  <svg className="w-3 h-3 text-devops-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Real-time System Logs
                </span>
                <span className="text-[9px] text-emerald-400">STREAMING @ 120kb/s</span>
             </div>
             <div className="space-y-2 text-[11px] leading-relaxed opacity-70">
                <div className="flex gap-4"><span className="text-devops-textMuted">23:58:12</span> <span className="text-emerald-500">[OK]</span> <span>Health-check passed for pod/web-balancer-291</span></div>
                <div className="flex gap-4"><span className="text-devops-textMuted">23:58:14</span> <span className="text-blue-500">[INFO]</span> <span>n8n workflow triggered via external VPC call</span></div>
                <div className="flex gap-4"><span className="text-devops-textMuted">23:58:18</span> <span className="text-devops-primary">[SRE]</span> <span>Automatic scale up issued: target=docker-node-03</span></div>
                <div className="flex gap-4"><span className="text-devops-textMuted">23:58:22</span> <span className="text-emerald-500">[OK]</span> <span>Wazuh integrity check completed: 0 threats found</span></div>
                <div className="animate-pulse text-devops-primary">_</div>
             </div>
          </div>

          <div className="bg-[#0a0f18] border border-devops-border rounded-2xl p-6 flex flex-col">
             <div className="flex items-center gap-2 mb-6">
                <svg className="w-5 h-5 text-devops-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h4 className="text-xs font-bold text-devops-text uppercase tracking-widest">Resource Load</h4>
             </div>
             <div className="space-y-6 flex-1 flex flex-col justify-center">
                <div>
                   <div className="flex justify-between text-[10px] text-devops-textMuted mb-2 uppercase"><span>Cluster CPU Usage</span> <span>42%</span></div>
                   <div className="h-1.5 bg-devops-bg rounded-full overflow-hidden border border-devops-border/30">
                      <div className="h-full bg-gradient-to-r from-devops-primary to-devops-secondary w-[42%]"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-[10px] text-devops-textMuted mb-2 uppercase"><span>Infrastructure RAM</span> <span>6.4 GB / 16 GB</span></div>
                   <div className="h-1.5 bg-devops-bg rounded-full overflow-hidden border border-devops-border/30">
                      <div className="h-full bg-gradient-to-r from-devops-secondary to-blue-500 w-[64%]"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatusDashboard;
