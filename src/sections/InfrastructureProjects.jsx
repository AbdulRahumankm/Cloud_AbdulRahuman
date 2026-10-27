import React from 'react';

const InfrastructureProjects = ({ content }) => (
  <section id="infra-projects" className="py-28 bg-devops-card relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          <span className="text-devops-primary font-mono mr-2">{content.sectionNumber}</span> {content.heading}
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>

      <div className="bg-devops-bg border border-devops-primary/30 rounded-2xl p-7 md:p-10 mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-5 text-xs font-mono uppercase tracking-wider">
          <span className="px-3 py-1 rounded-full bg-devops-primary/10 text-devops-primary border border-devops-primary/30">{content.status}</span>
          <span className="text-devops-textMuted">{content.organization} · {content.period}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-devops-text mb-4">
          {content.title}
        </h3>
        <p className="text-devops-textMuted leading-relaxed max-w-4xl mb-5">
          {content.intro}
        </p>
        <p className="text-devops-secondary text-sm font-mono">
          {content.role}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {content.work.map((item, index) => (
          <article key={index} className="bg-devops-bg p-7 rounded-xl border border-devops-border">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <h4 className="text-xl font-bold text-devops-text">{item.title}</h4>
              <span className="text-xs font-mono text-devops-secondary">{item.status}</span>
            </div>
            <div className="space-y-4 text-sm leading-relaxed">
              <div>
                <p className="text-devops-accent uppercase tracking-widest text-xs font-bold mb-1">{content.problemLabel}</p>
                <p className="text-devops-textMuted">{item.problem}</p>
              </div>
              <div>
                <p className="text-devops-primary uppercase tracking-widest text-xs font-bold mb-1">{content.solutionLabel}</p>
                <p className="text-devops-textMuted">{item.solution}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="space-y-6">
        {content.personalProjects.map((project, index) => (
          <div key={index} className="bg-devops-bg border border-devops-border rounded-2xl p-7 md:p-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="text-2xl font-bold text-devops-text">{project.title}</h3>
              <span className="text-xs font-mono text-devops-secondary">{project.status}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed">
              <div>
                <p className="text-devops-accent uppercase tracking-widest text-xs font-bold mb-2">{content.problemLabel}</p>
                <p className="text-devops-textMuted">{project.problem}</p>
              </div>
              <div>
                <p className="text-devops-primary uppercase tracking-widest text-xs font-bold mb-2">{content.solutionLabel}</p>
                <p className="text-devops-textMuted">{project.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default InfrastructureProjects;
