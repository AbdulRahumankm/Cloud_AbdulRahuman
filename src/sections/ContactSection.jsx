import React from 'react';

const ContactCard = ({ icon, label, link, subtext }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative bg-devops-card/40 backdrop-blur-xl border border-devops-border p-8 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden"
  >
    {/* Inner Glow */}
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-devops-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="text-devops-secondary mb-4 p-4 bg-devops-bg/50 rounded-full border border-devops-secondary/20 group-hover:border-devops-secondary/50 transition-colors duration-500 group-hover:rotate-12">
      {icon}
    </div>
    
    <h3 className="text-devops-text font-bold text-lg tracking-wide group-hover:text-devops-primary transition-colors">{label}</h3>
    <p className="text-devops-textMuted text-xs font-mono mt-2 opacity-60 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">{subtext}</p>
  </a>
);

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-32 bg-devops-bg relative overflow-hidden border-t border-devops-border/20"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-devops-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight uppercase">
            Contact <span className="text-devops-primary">Node</span>
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        <div className="mb-20 max-w-3xl">
          <p className="text-devops-textMuted text-lg leading-relaxed font-medium">
            Available for{" "}
            <span className="text-devops-primary font-bold">
              Cloud, DevOps, and Infrastructure Engineering
            </span>{" "}
            opportunities. Connect via my terminal interfaces below to discuss
            infrastructure architecting and platform reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ContactCard
            label="GitHub"
            subtext="Source Repositories"
            link="https://github.com/AbdulRahumankm"
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            }
          />
          <ContactCard
            label="LinkedIn"
            subtext="Professional Network"
            link="https://www.linkedin.com/in/abdulrahuman1204/"
            icon={
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.764z" />
              </svg>
            }
          />
          <ContactCard
            label="Email"
            subtext="Direct Encryption"
            link="mailto:abdulrahuman1204@gmail.com"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
          />

          <div className="bg-devops-card/40 backdrop-blur-xl border border-devops-border p-8 rounded-2xl flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] overflow-hidden group">
            <h3 className="text-devops-text font-bold text-lg mb-6">Résumé</h3>
            <a
              href="/AbdulRahuman_Cloud.pdf"
              download
              className="px-8 py-4 bg-gradient-to-r from-devops-primary to-devops-secondary text-devops-bg font-extrabold rounded-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] active:scale-95 text-sm uppercase tracking-widest shadow-lg"
            >
              Download PDF
            </a>
            <p className="text-[10px] font-mono text-devops-textMuted mt-6 uppercase tracking-widest opacity-60">
              System Architect Bio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
