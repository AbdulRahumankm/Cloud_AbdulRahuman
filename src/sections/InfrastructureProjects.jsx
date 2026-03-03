import React from 'react';

const infrastructureProjects = [
  {
    title: "Self-hosted Automation Platform",
    problem: "High monthly costs for SaaS automation tools and limited control over data privacy.",
    solution: "Deployed a self-hosted n8n instance on a localized server using Docker, providing full ownership and cost-effective task orchestration.",
    technologies: ["Docker", "n8n", "Linux", "Self-hosted Server"],
    status: "Online",
  },
  {
    title: "Infrastructure Visibility System",
    problem: "Lack of centralized monitoring for distributed home lab components leading to reactive rather than proactive maintenance.",
    solution: "Integrated Wazuh and Grafana to monitor system health, detect security vulnerabilities, and visualize performance metrics in real-time.",
    technologies: ["Wazuh", "Grafana", "Linux", "Monitoring"],
    status: "Running",
  },
  {
    title: "Zero-Trust Remote Access",
    problem: "Exposing internal services to the internet via port forwarding created significant security risks and public IP exposure.",
    solution: "Implemented Cloudflare Tunnel for secure, encrypted ingress to internal services without opening any inbound firewall ports.",
    technologies: ["Cloudflare Tunnel", "Networking", "Zero Trust", "Argo"],
    status: "Active",
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
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div>
                    <h4 className="text-[10px] font-mono text-devops-secondary uppercase tracking-widest mb-1 opacity-70">Problem Context</h4>
                    <p className="text-devops-textMuted text-sm leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-devops-primary uppercase tracking-widest mb-1 opacity-70">SRE Solution</h4>
                    <p className="text-devops-text text-sm leading-relaxed">{project.solution}</p>
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
