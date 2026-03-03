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
  const monitoringItems = [
    { 
      name: "n8n Automation", 
      status: "Online", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> 
    },
    { 
      name: "Cloudflare Tunnel", 
      status: "Active", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> 
    },
    { 
      name: "Monitoring Stack", 
      status: "Running", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> 
    },
    { 
      name: "Docker Workloads", 
      status: "Healthy", 
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> 
    },
  ];

  return (
    <section id="status-dashboard" className="py-24 bg-devops-bg relative overflow-hidden border-t border-devops-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight">
              Availability <span className="text-devops-primary">Dashboard</span>
            </h2>
            <p className="text-devops-textMuted font-mono text-sm tracking-tighter">Real-time infrastructure health metrics</p>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-emerald-500/5 border border-devops-primary/20 text-devops-primary font-mono text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devops-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-devops-primary"></span>
            </span>
            SYSTEMS OPERATIONAL
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {monitoringItems.map((item, index) => (
            <StatusCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerStatusDashboard;
