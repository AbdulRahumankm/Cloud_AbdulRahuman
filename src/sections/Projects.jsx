import React from 'react';

const Projects = ({ content }) => (
  <section id="projects" className="py-28 bg-devops-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-5">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          <span className="text-devops-primary font-mono mr-2">{content.sectionNumber}</span> {content.heading}
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>
      <p className="text-devops-textMuted max-w-3xl mb-12 leading-relaxed">
        {content.intro}{' '}
        <a href={content.profileUrl} target="_blank" rel="noopener noreferrer" className="text-devops-primary hover:underline">{content.profileLabel}</a>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {content.items.map((project, index) => (
          <article key={index} className="bg-devops-card/40 p-7 rounded-2xl border border-devops-border flex flex-col">
            <p className="text-devops-secondary text-xs font-mono uppercase tracking-wider mb-3">{project.type}</p>
            <h3 className="text-xl font-bold text-devops-text mb-6">{project.title}</h3>
            <div className="space-y-5 text-sm leading-relaxed flex-grow">
              <div>
                <p className="text-devops-accent text-xs font-bold uppercase tracking-widest mb-1">{content.problemLabel}</p>
                <p className="text-devops-textMuted">{project.problem}</p>
              </div>
              <div>
                <p className="text-devops-primary text-xs font-bold uppercase tracking-widest mb-1">{content.workLabel}</p>
                <p className="text-devops-textMuted">{project.contribution}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 mt-7 mb-7">
              {project.technologies.map((technology, technologyIndex) => (
                <li key={technologyIndex} className="text-xs font-mono text-devops-secondary border border-devops-border rounded px-2 py-1">
                  {technology}
                </li>
              ))}
            </ul>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-devops-primary font-bold hover:underline">
              {content.repositoryLinkLabel}
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
