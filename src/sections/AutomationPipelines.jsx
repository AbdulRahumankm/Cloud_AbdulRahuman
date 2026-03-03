import React from 'react';

const AutomationStep = ({ name, type, icon, active }) => (
  <div className="flex flex-col items-center group">
    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border flex items-center justify-center transition-all duration-500 shadow-lg ${
      active 
      ? 'bg-devops-secondary/10 border-devops-secondary text-devops-secondary shadow-[0_0_20px_rgba(56,189,248,0.2)]' 
      : 'bg-devops-card border-devops-border text-devops-textMuted group-hover:border-devops-secondary/50 group-hover:text-devops-secondary'
    }`}>
      {icon}
    </div>
    <div className="mt-3 text-center">
      <span className="text-[10px] font-mono text-devops-text uppercase font-bold tracking-tight">{name}</span>
      <div className="text-[8px] font-mono text-devops-textMuted uppercase tracking-widest mt-0.5">{type}</div>
    </div>
  </div>
);

const ConnectionLine = ({ horizontal = true, active = false }) => (
  <div className={`flex items-center justify-center ${horizontal ? 'flex-1 h-px bg-devops-border min-w-[20px] md:min-w-[40px]' : 'h-10 w-px bg-devops-border'}`}>
    <div className={`${horizontal ? 'w-full h-full' : 'w-full h-full'} relative`}>
      <div className={`absolute inset-0 bg-devops-secondary shadow-[0_0_10px_#38bdf8] ${active ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>
      {active && (
        <div className={`absolute ${horizontal ? 'top-[-2px] left-0 animate-flow-h h-[5px] w-[20px]' : 'left-[-2px] top-0 animate-flow-v w-[5px] h-[20px]'} bg-devops-secondary rounded-full`}></div>
      )}
    </div>
  </div>
);

const AutomationPipelines = () => {
  return (
    <section id="automation" className="py-24 bg-devops-bg relative overflow-hidden">
      <style>{`
        @keyframes flow-h {
          0% { left: -10%; }
          100% { left: 110%; }
        }
        @keyframes flow-v {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-flow-h { animation: flow-h 2s linear infinite; }
        .animate-flow-v { animation: flow-v 2s linear infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight uppercase">
            Workflow <span className="text-devops-secondary">Automation Pipeline</span>
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="mb-16 max-w-3xl">
          <p className="text-devops-textMuted text-lg leading-relaxed">
            Implementing <span className="text-devops-secondary font-bold">event-driven automation systems</span> that orchestrate complex cross-platform workflows. 
            By integrating disparate APIs and services through logic-based triggers, I eliminate manual toil and ensure consistent, scalable operations across the entire infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* n8n Visualizer */}
          <div className="bg-[#0f172a] rounded-3xl border border-devops-border p-8 md:p-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-4 right-6 flex items-center gap-2">
              <span className="text-[10px] font-mono text-devops-secondary animate-pulse">● WORKFLOW EXECUTING</span>
              <img src="https://n8n.io/images/n8n-logo.svg" className="w-4 h-4 invert opacity-50" alt="n8n" />
            </div>

            <h3 className="text-lg font-bold text-devops-text mb-12">Production n8n Node Logic</h3>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <AutomationStep 
                name="Webhook" 
                type="Trigger" 
                active={true}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
              />
              <ConnectionLine active={true} />
              
              <AutomationStep 
                name="Format Data" 
                type="JS Function" 
                active={true}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
              />
              <ConnectionLine active={true} />

              <AutomationStep 
                name="HTTP Request" 
                type="Service API" 
                active={true}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>}
              />
              <ConnectionLine active={true} />

              <AutomationStep 
                name="Sync DB" 
                type="Final Action" 
                active={true}
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" /></svg>}
              />
            </div>

            <div className="mt-12 p-4 bg-devops-bg/50 rounded-lg border border-devops-border/40 font-mono text-[10px] text-emerald-400">
               <div className="flex justify-between mb-2">
                 <span>Exec ID: #f4-291</span>
                 <span>Avg Latency: 124ms</span>
               </div>
               <div className="text-devops-textMuted leading-relaxed">
                 [2024-03-03 23:45:12] Workflow execution initiated via Webhook<br/>
                 [2024-03-03 23:45:12] Data cleaning step success: 120 nodes processed<br/>
                 [2024-03-03 23:45:13] API Handshake complete. Pushing to PostgreSQL...<br/>
                 <span className="text-white">WAITING FOR NEXT TRIGGER..._</span>
               </div>
            </div>
          </div>

          {/* Business Impact / Capabilities */}
          <div className="space-y-6 flex flex-col justify-center">
             <div className="p-6 bg-devops-card border border-devops-border rounded-2xl">
                <h4 className="text-devops-secondary font-bold mb-2 uppercase text-xs tracking-widest">Scalability</h4>
                <p className="text-devops-textMuted text-sm">Orchestrating hundreds of micro-transactions daily across distributed systems using Dockerized n8n clusters.</p>
             </div>
             <div className="p-6 bg-devops-card border border-devops-border rounded-2xl">
                <h4 className="text-devops-primary font-bold mb-2 uppercase text-xs tracking-widest">Self-Healing</h4>
                <p className="text-devops-textMuted text-sm">Integrated error handlers that automatically trigger recovery pipelines if an API node returns non-200 status.</p>
             </div>
             <div className="p-6 bg-devops-card border border-devops-border rounded-2xl">
                <h4 className="text-devops-accent font-bold mb-2 uppercase text-xs tracking-widest">DevSecOps</h4>
                <p className="text-devops-textMuted text-sm">Sensitive credentials managed via Docker Secrets and environment variables, ensuring no leak in automation logs.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomationPipelines;
