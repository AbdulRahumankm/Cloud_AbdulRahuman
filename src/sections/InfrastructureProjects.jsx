import React from 'react';

const infrastructureProjects = [
  {
    title: "Enterprise-Grade Automation Cluster",
    problem: "High operational costs and vendor lock-in associated with proprietary SaaS integration platforms.",
    solution: "Architected a highly available n8n automation cluster using Docker Swarm, enabling secure, local-first task orchestration.",
    outcome: "Reduced monthly SaaS spend by 100% while increasing data sovereignty and workflow execution speed by 40%.",
    technologies: ["Docker Swarm", "n8n", "PostgreSQL", "Linux"],
    status: "Production",
  },
  {
    title: "Centralized Telemetry & Security Hub",
    problem: "Fragmented infrastructure visibility across distributed nodes, leading to increased Mean Time to Recovery (MTTR).",
    solution: "Integrated Wazuh SIEM with Prometheus and Grafana to establish a centralized observability platform for real-time auditing.",
    outcome: "Achieved 100% visibility across edge nodes and reduced security incident response time from hours to minutes.",
    technologies: ["Wazuh SIEM", "Prometheus", "Grafana", "ELK Stack"],
    status: "Operational",
  },
  {
    title: "Zero-Trust Connectivity Mesh",
    problem: "Inherent vulnerabilities in traditional port-forwarding methods, exposing internal services to brute-force attacks.",
    solution: "Deployed Cloudflare Tunnel (Argo) to establish an outbound-only secure mesh for internal services.",
    outcome: "Eliminated 100% of inbound firewall risks and established identity-aware access for all private cloud assets.",
    technologies: ["Cloudflare Tunnel", "Identity Management", "Secure Tunnels", "Argo"],
    status: "Secure",
  },
];

const InfrastructureProjects = () => {
  return (
    <section id="infra-projects" className="py-32 bg-devops-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight">
            <span className="text-devops-primary font-mono mr-2">04.</span> Core Infrastructure
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {infrastructureProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-devops-card/40 backdrop-blur-md rounded-2xl border border-devops-border overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-devops-border text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devops-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-devops-primary"></span>
                    </span>
                    <span className="font-mono text-devops-text tracking-widest uppercase">
                      {project.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-devops-text mb-6 group-hover:text-devops-primary transition-colors">
                  {project.title}
                </h3>
                
                <div className="space-y-4 mb-8 flex-grow text-[14px]">
                  <div>
                    <h4 className="text-[10px] font-mono text-devops-secondary uppercase tracking-widest mb-1 opacity-70">Problem Context</h4>
                    <p className="text-devops-textMuted leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-devops-primary uppercase tracking-widest mb-1 opacity-70">SRE Solution</h4>
                    <p className="text-devops-text leading-relaxed">{project.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-devops-accent uppercase tracking-widest mb-1 opacity-70">Impact & Outcome</h4>
                    <p className="text-devops-textMuted italic leading-relaxed">{project.outcome}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-devops-border/30">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-[10px] font-mono bg-devops-bg/50 text-devops-secondary border border-devops-secondary/30 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureProjects;
