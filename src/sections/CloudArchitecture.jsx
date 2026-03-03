import React from 'react';

const Node = ({ name, icon, isFlowing }) => (
  <div className="flex flex-col items-center gap-4 relative z-10">
    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-devops-card/60 backdrop-blur-xl border border-devops-border flex items-center justify-center text-devops-secondary shadow-2xl transition-all duration-500 hover:scale-110 group relative`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-devops-secondary/5 rounded-2xl group-hover:bg-devops-secondary/10 transition-colors"></div>
      
      {/* Icon */}
      <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
        {icon}
      </div>

      {/* Floating Sparkle/Neon Circle */}
      <div className="absolute -inset-1 bg-gradient-to-tr from-devops-secondary/20 to-devops-primary/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity"></div>
    </div>
    
    <span className="text-xs md:text-sm font-mono font-bold text-devops-text tracking-wider text-center uppercase">
      {name}
    </span>
  </div>
);

const ConnectionLabel = ({ label }) => (
  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-devops-secondary bg-devops-bg px-2 py-0.5 rounded border border-devops-secondary/20 whitespace-nowrap z-20">
    {label}
  </span>
);

const ConnectionLine = ({ label }) => (
  <div className="hidden md:flex flex-1 h-px bg-gradient-to-r from-devops-border via-devops-secondary/30 to-devops-border relative items-center">
    <ConnectionLabel label={label} />
    {/* Flowing Pulse Animation */}
    <div className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-devops-primary/40 to-transparent h-full animate-flow-right"></div>
  </div>
);

const CloudArchitecture = () => {
  return (
    <section id="architecture" className="py-24 bg-devops-bg relative overflow-hidden">
      {/* Custom Keyframe Animations */}
      <style>{`
        @keyframes flow-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .animate-flow-right {
          animation: flow-right 4s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight">
            <span className="text-devops-primary font-mono mr-2">06.</span> Infrastructure Topology
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 mt-20">
          <Node 
            name="User" 
            icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          />
          <ConnectionLine label="HTTPS/SSL" />
          
          <Node 
            name="Cloudflare" 
            icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
          />
          <ConnectionLine label="SECURE TUNNEL" />

          <Node 
            name="Home Server" 
            icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>}
          />
          <ConnectionLine label="LOCAL BRIDGE" />

          <Node 
            name="Docker / Services" 
            icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          />
        </div>

        {/* Legend / Status Info */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-2xl bg-devops-card/20 border border-devops-border backdrop-blur-sm shadow-inner">
          <div className="space-y-2">
            <h4 className="text-devops-text font-bold text-sm tracking-widest uppercase">Encryption</h4>
            <p className="text-devops-textMuted text-xs font-mono tracking-tight leading-relaxed">End-to-End TLS 1.3 / AES-256 encrypted tunnel without exposed public IP infrastructure.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-devops-text font-bold text-sm tracking-widest uppercase">Orchestration</h4>
            <p className="text-devops-textMuted text-xs font-mono tracking-tight leading-relaxed">Containerized workload management with isolated service networks and persistent storage volumes.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-devops-text font-bold text-sm tracking-widest uppercase">Edge Security</h4>
            <p className="text-devops-textMuted text-xs font-mono tracking-tight leading-relaxed">WAF protection, DDoS mitigation, and Zero Trust access policies enforced at the global edge network.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudArchitecture;
