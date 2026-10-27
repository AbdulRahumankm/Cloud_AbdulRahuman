import React from 'react';

const projects = [
  {
    title: 'AWS Infrastructure with Terraform',
    type: 'Personal infrastructure code',
    problem: 'A multi-AZ AWS environment needs repeatable network, compute, database, storage and access definitions.',
    contribution: 'I authored reusable Terraform modules for VPC, EKS, RDS, S3, ALB and IAM. The repository defines public, private and database subnets, EKS managed node groups and S3 protection settings.',
    technologies: ['Terraform', 'AWS VPC', 'EKS', 'RDS', 'S3', 'ALB', 'IAM'],
    link: 'https://github.com/AbdulRahumankm/terraform-aws-production',
  },
  {
    title: 'Server Management System',
    type: 'Repository I maintain',
    problem: 'Server inventory, access and audit information need a central place for administrators.',
    contribution: 'I maintain the project repository. Its code covers server inventory, SSH key management, role-based permissions and audit logging through a web interface and API.',
    technologies: ['TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'RBAC'],
    link: 'https://github.com/AbdulRahumankm/Server-Management-System',
  },
  {
    title: 'AI Orchestrator System',
    type: 'Personal AIOps project',
    problem: 'A self-hosted AI assistant needs a way to coordinate services, route requests and observe health.',
    contribution: 'I maintain a repository with service-management scripts, model routing, monitoring and configuration for an OpenClaw-based lab system.',
    technologies: ['Python', 'Docker', 'Service Monitoring', 'Automation'],
    link: 'https://github.com/AbdulRahumankm/AI_Orchestrator_System',
  },
];

const Projects = () => (
  <section id="projects" className="py-28 bg-devops-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-5">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          <span className="text-devops-primary font-mono mr-2">04.</span> GitHub Projects
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>
      <p className="text-devops-textMuted max-w-3xl mb-12 leading-relaxed">
        Selected repositories that show my infrastructure, operations and
        AIOps work. Application-only development projects are available on
        my <a href="https://github.com/AbdulRahumankm" target="_blank" rel="noopener noreferrer" className="text-devops-primary hover:underline">GitHub profile</a>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {projects.map((project) => (
          <article key={project.title} className="bg-devops-card/40 p-7 rounded-2xl border border-devops-border flex flex-col">
            <p className="text-devops-secondary text-xs font-mono uppercase tracking-wider mb-3">{project.type}</p>
            <h3 className="text-xl font-bold text-devops-text mb-6">{project.title}</h3>
            <div className="space-y-5 text-sm leading-relaxed flex-grow">
              <div>
                <p className="text-devops-accent text-xs font-bold uppercase tracking-widest mb-1">Problem</p>
                <p className="text-devops-textMuted">{project.problem}</p>
              </div>
              <div>
                <p className="text-devops-primary text-xs font-bold uppercase tracking-widest mb-1">My work</p>
                <p className="text-devops-textMuted">{project.contribution}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 mt-7 mb-7">
              {project.technologies.map((technology) => (
                <li key={technology} className="text-xs font-mono text-devops-secondary border border-devops-border rounded px-2 py-1">
                  {technology}
                </li>
              ))}
            </ul>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-devops-primary font-bold hover:underline">
              View repository →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
