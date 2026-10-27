import React from 'react';

const focusAreas = [
  {
    title: 'AWS & Kubernetes operations',
    detail: 'EC2, EKS and VPC support across multiple accounts, including production container workloads.',
  },
  {
    title: 'Infrastructure automation',
    detail: 'Terraform infrastructure code, Python APIs, Bash health checks and Azure DevOps CI/CD.',
  },
  {
    title: 'Systems & support',
    detail: 'Linux servers, Nutanix, VPN connectivity and approved server access.',
  },
];

const Hero = () => (
  <section id="hero" className="min-h-screen pt-24 flex items-center bg-devops-bg relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-devops-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-devops-secondary/10 rounded-full blur-[120px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid lg:grid-cols-2 gap-14 items-center py-16">
      <div className="space-y-8">
        <div className="inline-flex px-3 py-1 rounded-full bg-devops-card border border-devops-border text-devops-secondary text-xs uppercase tracking-widest font-mono">
          Infrastructure · Cloud · Automation
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-devops-text tracking-tight">
            Abdul <span className="text-devops-primary">Rahuman</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-mono text-devops-secondary font-bold tracking-tight">
            Infrastructure, Cloud, DevOps & AIOps Engineer
          </h2>
        </div>
        <p className="max-w-2xl text-devops-textMuted text-lg md:text-xl leading-relaxed">
          I support cloud and on-premise infrastructure at TVS Supply Chain Solutions.
          My work spans AWS operations, Linux systems, Terraform, CI/CD and practical
          automation for health checks and incident analysis. Remediation stays under
          human review.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#infra-projects" className="px-8 py-4 bg-devops-primary text-devops-bg font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            Explore CloudOps Work
          </a>
          <a href="/AbdulRahuman_ITEngineer(1).pdf" download className="px-8 py-4 border border-devops-border text-devops-text font-bold rounded-lg transition-all duration-300 hover:bg-devops-card hover:border-devops-secondary">
            Download Resume
          </a>
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-2xl border border-devops-border shadow-[0_0_50px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="bg-[#1e293b] px-6 py-4 border-b border-devops-border">
          <p className="text-devops-secondary text-xs font-mono uppercase tracking-widest">What I work on</p>
        </div>
        <div className="p-6 md:p-8 space-y-4">
          {focusAreas.map((area) => (
            <div key={area.title} className="p-5 rounded-xl bg-devops-card/50 border border-devops-border/60">
              <h3 className="text-devops-primary font-bold mb-2">{area.title}</h3>
              <p className="text-devops-textMuted text-sm leading-relaxed">{area.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
