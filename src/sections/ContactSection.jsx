import React from 'react';

const iconText = { github: 'GH', linkedin: 'in', email: '@' };

const ContactCard = ({ icon, label, link, subtext }) => (
  <a
    href={link}
    target={link.startsWith('https://') ? '_blank' : undefined}
    rel={link.startsWith('https://') ? 'noopener noreferrer' : undefined}
    className="group bg-devops-card/40 border border-devops-border p-8 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:border-devops-primary hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
  >
    <span className="text-devops-secondary mb-4 p-4 bg-devops-bg/50 rounded-full border border-devops-secondary/20 font-mono font-bold text-xl min-w-16 text-center">
      {iconText[icon] || '↗'}
    </span>
    <h3 className="text-devops-text font-bold text-lg group-hover:text-devops-primary">{label}</h3>
    <p className="text-devops-textMuted text-xs font-mono mt-2 uppercase">{subtext}</p>
  </a>
);

const ContactSection = ({ content }) => (
  <section id="contact-links" className="py-28 bg-devops-bg border-t border-devops-border/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-baseline gap-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text">
          {content.heading}
        </h2>
        <div className="h-px bg-devops-border flex-1 w-full md:w-auto"></div>
      </div>
      <p className="text-devops-textMuted text-lg leading-relaxed max-w-3xl mb-14">{content.intro}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {content.links.map((link, index) => (
          <ContactCard key={index} icon={link.icon} label={link.label} subtext={link.subtext} link={link.url} />
        ))}
        <ContactCard icon="email" label={content.emailLinkLabel} subtext={content.emailLinkSubtext} link={`mailto:${content.email}`} />
        <div className="bg-devops-card/40 border border-devops-border p-8 rounded-2xl flex flex-col items-center justify-center">
          <h3 className="text-devops-text font-bold text-lg mb-6">{content.resumeHeading}</h3>
          <a href="/AbdulRahuman_ITEngineer(1).pdf" download className="px-8 py-4 bg-gradient-to-r from-devops-primary to-devops-secondary text-devops-bg font-extrabold rounded-lg hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] text-sm uppercase tracking-widest">
            {content.resumeButton}
          </a>
          <p className="text-xs font-mono text-devops-textMuted mt-6 uppercase">{content.resumeSubtext}</p>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
