import React from 'react';

const competencies = [
  {
    title: "Linux Administration",
    description: "Proficient in managing, configuring, and maintaining core Linux system operations, filesystems, and permissions.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    )
  },
  {
    title: "Networking Fundamentals",
    description: "Strong understanding of TCP/IP, DNS, VPNs, routing, and diagnosing complex network connectivity issues.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
    )
  },
  {
    title: "Server Troubleshooting",
    description: "Expertise in isolating and resolving application, system, and hardware-level incidents efficiently.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    )
  },
  {
    title: "Docker Usage",
    description: "Experience with containerizing processes, building robust images, and managing container lifecycles.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
    )
  },
  {
    title: "Cloud Learning",
    description: "Actively expanding knowledge in AWS cloud primitives (EC2, S3, IAM, VPC) and modern cloud architectures.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
    )
  },
  {
    title: "Automation Interest",
    description: "Enthusiastic about eliminating manual toil through Bash, Python scripting, and exploring CI/CD pipelines.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    )
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-devops-card relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-devops-text tracking-tight">
            <span className="text-devops-primary font-mono mr-2">01.</span> Who Am I?
          </h2>
          <div className="h-px bg-devops-border flex-1 w-full md:w-auto mt-4 md:mt-0"></div>
        </div>

        {/* Narrative */}
        <div className="mb-16 max-w-3xl text-lg text-devops-textMuted leading-relaxed space-y-4">
          <p>
            I am a dedicated Cloud and Infrastructure Engineer transitioning from a strong foundation in L1 Technical Support. 
            My passion lies at the intersection of systems engineering, problem solving, and designing automated solutions 
            that make infrastructure resilient.
          </p>
          <p>
            I thrive in debugging complex environments and strongly believe that every recurring issue is simply a task 
            waiting to be automated. Here is what I do best:
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {competencies.map((item, index) => (
            <div key={index} className="group relative">
              {/* Subtle hover glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-devops-primary to-devops-secondary rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              
              {/* Card surface */}
              <div className="relative h-full bg-devops-bg p-8 rounded-lg border border-devops-border flex flex-col hover:-translate-y-1 transition-transform duration-300">
                <div className="text-devops-primary mb-5 p-3 bg-devops-card rounded-lg inline-flex w-fit shadow-md border border-devops-border/50 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-devops-text mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-devops-textMuted text-sm font-light leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
