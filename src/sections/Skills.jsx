import React from 'react';

const skillCategories = [
  {
    title: "Cloud & Infrastructure",
    skills: ["Linux (Ubuntu/Debian)", "Docker Swarm", "Proxmox VE", "Cloudflare Argo", "NGINX Reverse Proxy", "Networking (VLAN/VPN)"]
  },
  {
    title: "DevOps & Automation",
    skills: ["GitHub Actions", "CI/CD Workflows", "n8n Automation", "Python (Scripting)", "Bash Scripting", "Systemd Services"]
  },
  {
    title: "Monitoring & Observability",
    skills: ["Wazuh SIEM", "Prometheus", "Grafana", "Uptime Kuma", "Log Management", "Status Dashboards"]
  },
  {
    title: "Data & Pipelines",
    skills: ["Log Aggregation", "ELK Stack", "Data Transformation", "API Integrations", "Database Management", "Telemetry Collection"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-32 bg-devops-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight uppercase">
            Technical <span className="text-devops-secondary">Arsenal</span>
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-devops-card/40 backdrop-blur-md p-8 rounded-2xl border border-devops-border hover:border-devops-secondary transition-all duration-300 group">
              <h3 className="text-lg font-bold text-devops-text mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-devops-secondary rounded-full"></div>
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <li key={sIndex} className="px-2.5 py-1 bg-devops-bg/50 border border-devops-border text-devops-textMuted text-[11px] font-mono rounded group-hover:text-devops-text transition-colors uppercase tracking-tight">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
