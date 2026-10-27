import React from 'react';

const cloudOpsWork = [
  {
    title: 'Resource discovery',
    status: 'In development',
    problem: 'Infrastructure is spread across multiple AWS accounts, Azure and Nutanix, so operators need a consistent view for discovery and reporting.',
    solution: 'I am developing resource discovery and operational reporting across those environments.',
  },
  {
    title: 'Linux health checks',
    status: 'In development',
    problem: 'Recurring health checks and operational reports take time when they are handled manually.',
    solution: 'I am building Python API services and Bash checks, with runbooks to make routine analysis more repeatable.',
  },
  {
    title: 'Workflow orchestration',
    status: 'In development',
    problem: 'Operational tasks span APIs, Docker workloads and multiple automation tools.',
    solution: 'I am connecting Python services and Docker workloads with n8n, Celery and Temporal for coordinated workflows.',
  },
  {
    title: 'Incident analysis',
    status: 'Design stage',
    problem: 'An incident needs useful context before an engineer decides whether to change a system.',
    solution: 'I am designing AWS Bedrock-assisted analysis that presents findings for human review before remediation.',
  },
];

const InfrastructureProjects = () => (
  <section id="infra-projects" className="py-28 bg-devops-card relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          <span className="text-devops-primary font-mono mr-2">03.</span> Featured CloudOps Work
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>

      <div className="bg-devops-bg border border-devops-primary/30 rounded-2xl p-7 md:p-10 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-5 text-xs font-mono uppercase tracking-wider">
          <span className="px-3 py-1 rounded-full bg-devops-primary/10 text-devops-primary border border-devops-primary/30">Work in progress</span>
          <span className="text-devops-textMuted">TVS Supply Chain Solutions · 2026–present</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-devops-text mb-4">
          Enterprise CloudOps Automation Platform
        </h3>
        <p className="text-devops-textMuted leading-relaxed max-w-4xl mb-5">
          This is an internal team project. As an Infrastructure AIOps Engineer,
          my contribution is to develop discovery, health checks and workflow
          integration, and to design incident analysis that keeps engineers in
          control of remediation. The items below describe work in progress,
          not a completed deployment.
        </p>
        <p className="text-devops-secondary text-sm font-mono">
          My role: Infrastructure AIOps Engineer · Contribution: development and operational design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {cloudOpsWork.map((item) => (
          <article key={item.title} className="bg-devops-bg p-7 rounded-xl border border-devops-border">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <h4 className="text-xl font-bold text-devops-text">{item.title}</h4>
              <span className="text-xs font-mono text-devops-secondary">{item.status}</span>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <p className="text-devops-accent uppercase tracking-widest text-xs font-bold mb-1">Problem</p>
                <p className="text-devops-textMuted">{item.problem}</p>
              </div>
              <div>
                <p className="text-devops-primary uppercase tracking-widest text-xs font-bold mb-1">My solution</p>
                <p className="text-devops-textMuted">{item.solution}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="bg-devops-bg border border-devops-border rounded-2xl p-7 md:p-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h3 className="text-2xl font-bold text-devops-text">Self-Hosted Infrastructure Lab</h3>
          <span className="text-xs font-mono text-devops-secondary">Personal project · Built</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
          <div>
            <p className="text-devops-accent uppercase tracking-widest text-xs font-bold mb-2">Problem</p>
            <p className="text-devops-textMuted">
              I wanted a private environment for practising server operations,
              remote access, CI/CD and automation without exposing lab services publicly.
            </p>
          </div>
          <div>
            <p className="text-devops-primary uppercase tracking-widest text-xs font-bold mb-2">My solution</p>
            <p className="text-devops-textMuted">
              I built a Proxmox home server and Samba NAS, connected lab devices
              with Tailscale, and self-hosted Jenkins and n8n for practice.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default InfrastructureProjects;
