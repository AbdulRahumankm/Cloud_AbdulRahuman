import React from 'react';

const Contact = ({ content }) => {
  return (
    <section id="contact" className="py-32 bg-devops-bg relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-devops-primary font-mono mb-4">
          {content.closingEyebrow}
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-devops-text mb-6">
          {content.closingHeading}
        </h2>
        <p className="text-devops-textMuted text-lg mb-10">
          {content.closingText}
        </p>
        <a 
          href={`mailto:${content.email}`}
          className="inline-block px-8 py-4 border-2 border-devops-primary text-devops-primary bg-transparent rounded font-mono font-bold hover:bg-devops-primary/10 transition-colors"
        >
           {content.closingButton}
        </a>
        <p className="text-devops-textMuted text-sm mt-4">
          {content.fallbackText} <a className="text-devops-primary underline" href={`mailto:${content.email}`}>{content.email}</a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
