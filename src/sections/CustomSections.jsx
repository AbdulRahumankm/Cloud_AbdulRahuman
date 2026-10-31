import React from 'react';

const CustomSections = ({ sections }) => sections.map((section) => (
  <section key={section.id} id={section.id} className="py-24 bg-devops-card border-t border-devops-border/20 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text mb-8">{section.heading}</h2>
      <div className="max-w-4xl space-y-5 text-devops-textMuted text-lg leading-relaxed">
        {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </div>
  </section>
));

export default CustomSections;
