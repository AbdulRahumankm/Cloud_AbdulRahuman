import React from 'react';

const PipelineNode = ({ name, icon, description }) => (
  <div className="flex flex-col items-center group relative">
    <div className="w-16 h-16 md:w-20 md:h-20 bg-devops-card rounded-2xl border border-devops-border flex items-center justify-center text-devops-primary shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-devops-primary group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-10">
      {icon}
      {/* Background glow */}
      <div className="absolute inset-0 bg-devops-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
    <div className="mt-4 text-center">
      <h4 className="text-devops-text font-bold text-sm md:text-base">{name}</h4>
      <p className="text-[10px] text-devops-textMuted uppercase tracking-tighter mt-1 max-w-[100px] leading-tight">{description}</p>
    </div>
  </div>
);

const FlowArrow = () => (
  <div className="hidden md:flex flex-1 items-center justify-center h-px bg-gradient-to-r from-devops-border via-devops-primary/40 to-devops-border relative min-w-[40px] mt-[-60px]">
    <div className="absolute top-1/2 left-0 w-2 h-2 bg-devops-primary rounded-full animate-pipeline-flow -translate-y-1/2 shadow-[0_0_10px_#10b981]"></div>
    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-devops-primary rounded-full animate-pipeline-flow -translate-y-1/2 shadow-[0_0_10px_#10b981]" style={{ animationDelay: '1s' }}></div>
  </div>
);

const DataPipeline = () => {
  const pipelineProjects = [
    {
      title: "System Log Pipeline",
      tool: "Wazuh SIEM",
      desc: "End-to-end security log collection and analysis pipeline for threat detection across distributed nodes.",
      badges: ["Linux", "Logs", "Wazuh"]
    },
    {
      title: "Automation Event Pipeline",
      tool: "n8n Workflow",
      desc: "Asynchronous event-driven pipeline for multi-service task orchestration and API data transformations.",
      badges: ["Automation", "n8n", "Webhooks"]
    },
    {
      title: "Infra Monitoring Data Flow",
      tool: "Grafana Stack",
      desc: "Real-time telemetry pipeline funneling system metrics from Prometheus exporters to dashboard visualizations.",
      badges: ["Monitoring", "Data Flow", "Prometheus"]
    }
  ];

  return (
    <section id="data-pipeline" className="py-32 bg-devops-bg relative overflow-hidden">
      {/* Styles for animation */}
      <style>{`
        @keyframes pipeline-flow {
          0% { left: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .animate-pipeline-flow {
          animation: pipeline-flow 3s infinite linear;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight uppercase">
            Infrastructure <span className="text-devops-secondary">Data Pipeline</span>
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="mb-16 max-w-3xl">
          <p className="text-devops-textMuted text-lg leading-relaxed">
            Designing <span className="text-devops-secondary font-bold">telemetry pipelines</span> that collect, process, and analyze system-wide logs and metrics. 
            This data-driven approach provides actionable insights into infrastructure health, ensuring high availability and proactive threat detection across all platform layers.
          </p>
        </div>

        {/* Animated Architecture Flow */}
        <div className="bg-devops-card/30 border border-devops-border rounded-3xl p-12 mb-20 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 lg:gap-8">
            <PipelineNode 
              name="Devices" 
              description="Edge, IoT, Server"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
            />
            <FlowArrow />
            
            <PipelineNode 
              name="Log Collection" 
              description="Wazuh, Ingestion"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>}
            />
            <FlowArrow />

            <PipelineNode 
              name="Processing" 
              description="n8n logic, ETL"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
            />
            <FlowArrow />

            <PipelineNode 
              name="Storage" 
              description="Elasticsearch"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 12c0 2 1.5 3 3.5 3s3.5-1 3.5-3" /></svg>}
            />
            <FlowArrow />

            <PipelineNode 
              name="Dashboard" 
              description="Grafana Hub"
              icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.5l5 5V17a2 2 0 01-2 2z" /></svg>}
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pipelineProjects.map((p, i) => (
            <div key={i} className="p-8 bg-devops-card/50 border border-devops-border rounded-2xl hover:border-devops-secondary transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-devops-secondary"></div>
                <h3 className="text-devops-text font-bold text-lg">{p.title}</h3>
              </div>
              <p className="text-devops-textMuted text-sm mb-6 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.badges.map((b, bi) => (
                  <span key={bi} className="px-2 py-0.5 bg-devops-bg text-devops-secondary border border-devops-secondary/30 rounded text-[10px] font-mono">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataPipeline;
