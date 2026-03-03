import React from 'react';

const PipelineStage = ({ name, icon, status, delay }) => (
  <div className="flex flex-col items-center group relative min-w-[120px]" style={{ animationDelay: `${delay}s` }}>
    <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0f172a] rounded-full border border-devops-border flex items-center justify-center text-devops-primary shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:border-devops-secondary group-hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] relative z-10">
      {icon}
      {/* Animated Orbiting Ring */}
      <div className="absolute inset-[-4px] border border-devops-primary/20 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
    <div className="mt-6 text-center">
      <h4 className="text-devops-text font-bold text-xs md:text-sm whitespace-nowrap">{name}</h4>
      <div className="mt-2 flex items-center justify-center gap-1.5 uppercase tracking-widest text-[8px] font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-emerald-500/80">{status}</span>
      </div>
    </div>
  </div>
);

const PipelineConnector = ({ label, speed = '3s' }) => (
  <div className="hidden lg:flex flex-1 flex-col items-center justify-center h-20 -mt-10">
    <div className="w-full h-px bg-gradient-to-r from-devops-border via-devops-primary/30 to-devops-border relative">
      {/* Passing Data Pulse */}
      <div className="absolute top-1/2 left-0 w-16 h-[2px] bg-gradient-to-r from-transparent via-devops-secondary to-transparent animate-pipeline-flow -translate-y-1/2" style={{ animationDuration: speed }}></div>
    </div>
    <span className="mt-2 text-[9px] font-mono text-devops-textMuted uppercase tracking-widest opacity-60">
      {label}
    </span>
  </div>
);

const CicdPipeline = () => {
  return (
    <section id="cicd-pipeline" className="py-32 bg-devops-bg relative overflow-hidden border-b border-devops-border/10">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <style>{`
        @keyframes pipeline-flow {
          0% { left: -20%; }
          100% { left: 120%; }
        }
        .animate-pipeline-flow {
          animation: pipeline-flow linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight">
            <span className="text-devops-primary font-mono mr-2">09.</span> CI/CD Deployment Pipeline
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-devops-card border border-devops-border text-[10px] font-mono text-devops-secondary">
            <span className="animate-pulse">●</span> PIPELINE ENGINE ACTIVE
          </div>
        </div>

        {/* Global Pipeline Visualization */}
        <div className="bg-[#111827]/50 border border-devops-border rounded-3xl p-8 md:p-16 backdrop-blur-md shadow-inner relative">
          {/* Dashboard Header Info */}
          <div className="absolute top-6 left-8 flex gap-6 text-[10px] font-mono text-devops-textMuted uppercase tracking-widest opacity-40">
            <div>Project: cloud-portfolio</div>
            <div>Cluster: prod-k8s-01</div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4 mt-8">
            <PipelineStage 
              name="Developer Push" 
              status="Git Commit"
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
            />
            
            <PipelineConnector label="Trigger Webhook" speed="2s" />
            
            <PipelineStage 
              name="GitHub Repo" 
              status="Source Ready"
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57bfs 0-2.115-.015-4.14c-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.32-1.74-1.32-1.74-1.087-.741.083-.726.083-.726 1.203.084 1.838 1.234 1.838 1.234 1.07 1.83 2.805 1.305 3.492.997.107-.775.418-1.305.762-1.605-2.66-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.305-.54-1.52.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.87.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.31 24 12c0-6.63-5.37-12-12-12z" /></svg>}
            />

            <PipelineConnector label="CI Start" speed="3s" />

            <PipelineStage 
              name="CI Build" 
              status="Optimizing"
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
            />

            <PipelineConnector label="Containerize" speed="2.5s" />

            <PipelineStage 
              name="Docker" 
              status="Image Pushed"
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
            />

            <PipelineConnector label="CD Deploy" speed="3.5s" />

            <PipelineStage 
              name="Deployment" 
              status="Production"
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />

            <PipelineConnector label="Metrics" speed="4s" />

            <PipelineStage 
              name="Monitoring" 
              status="L1 Watch"
              icon={<svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
          </div>

          {/* Console Footnote */}
          <div className="mt-16 pt-8 border-t border-devops-border/20 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono text-devops-textMuted uppercase tracking-[0.2em] gap-4">
            <div className="flex items-center gap-4">
              <span className="text-devops-primary">BUILD #4521</span>
              <span>BRANCH: main</span>
            </div>
            <div className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded border border-emerald-500/20">
              SUCCESS: Artifacts deployed to Cloud_AbdulRahuman
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CicdPipeline;
