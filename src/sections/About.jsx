import React from 'react';

const About = ({ content }) => (
  <section id="about" className="py-24 bg-devops-card">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          <span className="text-devops-primary font-mono mr-2">{content.sectionNumber}</span> {content.heading}
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>

      <div className="max-w-4xl space-y-5 text-devops-textMuted text-lg leading-relaxed mb-12">
        {content.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.areas.map((area, index) => (
          <div key={index} className="bg-devops-bg p-7 rounded-xl border border-devops-border">
            <h3 className="text-devops-primary text-xl font-bold mb-3">{area.title}</h3>
            <p className="text-devops-textMuted text-sm leading-relaxed">{area.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
