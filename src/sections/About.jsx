import React from 'react';

const experienceAreas = [
  {
    title: 'Cloud operations',
    description: 'AWS EC2, EKS and VPC administration across multiple accounts, with production EKS workload support.',
  },
  {
    title: 'Linux & virtualization',
    description: 'Linux server support in cloud and on-premise environments, Nutanix operations and a personal Proxmox lab.',
  },
  {
    title: 'Automation & delivery',
    description: 'Terraform infrastructure code, Azure DevOps CI/CD, Python APIs and Bash scripts for operational work.',
  },
  {
    title: 'Technical support',
    description: 'Windows endpoints, account access, VPN, LAN/Wi-Fi and server connectivity troubleshooting.',
  },
];

const About = () => (
  <section id="about" className="py-24 bg-devops-card">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          <span className="text-devops-primary font-mono mr-2">01.</span> About Me
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>

      <div className="max-w-4xl space-y-5 text-devops-textMuted text-lg leading-relaxed mb-12">
        <p>
          I am an Infrastructure AIOps Engineer at TVS Supply Chain Solutions.
          I started there in L1 technical support, troubleshooting endpoints,
          access and connectivity, and moved into cloud and infrastructure operations.
        </p>
        <p>
          Today I support AWS and Linux environments, work with Terraform and
          Azure DevOps, and develop Python and Bash tools for health checks,
          incident analysis and reporting. Operational changes still go through
          human review. Outside work, I build a self-hosted lab with Proxmox,
          Samba NAS, Tailscale, Jenkins and n8n.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experienceAreas.map((area) => (
          <div key={area.title} className="bg-devops-bg p-7 rounded-xl border border-devops-border">
            <h3 className="text-devops-primary text-xl font-bold mb-3">{area.title}</h3>
            <p className="text-devops-textMuted text-sm leading-relaxed">{area.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
