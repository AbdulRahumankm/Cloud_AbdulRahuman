import React from 'react';

const skillCategories = [
  {
    title: 'Cloud & containers',
    skills: ['AWS EC2', 'AWS EKS', 'AWS VPC', 'Azure', 'Docker', 'Kubernetes', 'Nutanix', 'Proxmox'],
  },
  {
    title: 'Infrastructure & delivery',
    skills: ['Terraform', 'Ansible', 'Azure DevOps CI/CD', 'Jenkins', 'Git', 'n8n', 'Python', 'Bash'],
  },
  {
    title: 'Systems & support',
    skills: ['Linux / Ubuntu', 'Windows Server', 'Active Directory', 'VPN & Tailscale', 'LAN / Wi-Fi', 'Nginx', 'ServiceNow', 'SFTP'],
  },
  {
    title: 'Monitoring & security',
    skills: ['Wazuh', 'Prometheus', 'Grafana', 'Datadog', 'Veeam Backup', 'N2WS', 'Endpoint Protection'],
  },
];

const Skills = () => (
  <section id="skills" className="py-24 bg-devops-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          <span className="text-devops-primary font-mono mr-2">02.</span> Technical Skills
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category) => (
          <div key={category.title} className="bg-devops-card/40 p-7 rounded-2xl border border-devops-border">
            <h3 className="text-lg font-bold text-devops-text mb-6">{category.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li key={skill} className="px-2.5 py-1 bg-devops-bg/50 border border-devops-border text-devops-textMuted text-xs font-mono rounded">
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

export default Skills;
