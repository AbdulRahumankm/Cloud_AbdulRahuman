import React from 'react';

const infrastructureProjects = [
  {
    title: "Self-hosted n8n Automation Server using Docker",
    description: "Self-hosted automation platform deployed using Docker containers with remote workflow execution and service monitoring.",
    technologies: ["Docker", "n8n", "Linux", "Self-hosted Server"],
    status: "Online",
  },
  {
    title: "Home Network Monitoring using Wazuh",
    description: "Centralized monitoring system to analyze logs, detect threats, and monitor devices across a home network infrastructure.",
    technologies: ["Wazuh", "Linux", "Networking", "Security Monitoring"],
    status: "Running",
  },
  {
    title: "Secure Remote Access using Cloudflare Tunnel",
    description: "Secure remote access setup allowing external connection to internal services without exposing public IP addresses.",
    technologies: ["Cloudflare Tunnel", "Networking", "Zero Trust", "Reverse Proxy"],
    status: "Active",
  },
];

const InfrastructureProjects = () => {
  return (
    <section id="infra-projects" className="py-24 bg-devops-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight">
            <span className="text-devops-primary font-mono mr-2">04.</span> Infrastructure Projects
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {infrastructureProjects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-devops-card/40 backdrop-blur-md rounded-2xl border border-devops-border overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-devops-border">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devops-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-devops-primary"></span>
                    </span>
                    <span className="text-[10px] font-mono text-devops-text uppercase tracking-wider">
                      {project.status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-devops-text mb-4 group-hover:text-devops-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-devops-textMuted text-sm mb-8 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
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

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-devops-primary/20 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureProjects;
