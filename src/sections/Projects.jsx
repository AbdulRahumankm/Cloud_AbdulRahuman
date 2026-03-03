import React from 'react';

const projects = [
  {
    title: "E-Commerce Kubernetes Cluster",
    description: "Designed and deployed a highly available Kubernetes cluster on AWS EKS for a high-traffic e-commerce platform. Implemented auto-scaling, ingress controllers, and a robust CI/CD pipeline.",
    tech: ["AWS EKS", "Terraform", "Helm", "ArgoCD"],
    link: "#"
  },
  {
    title: "Serverless Data Pipeline",
    description: "Built a serverless data ingestion pipeline handling 10M+ events per day using AWS Lambda, Kinesis, and DynamoDB. Reduced infrastructure costs by 40%.",
    tech: ["AWS Lambda", "Python", "Kinesis", "DynamoDB"],
    link: "#"
  },
  {
    title: "Automated Security Auditing",
    description: "Developed a custom tool using Python and cloud provider SDKs to automatically audit cloud resources against CIS benchmarks, integrating reports directly into Slack and Jira.",
    tech: ["Python", "AWS SDK", "Slack API", "Docker"],
    link: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-devops-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold text-devops-text">
              <span className="text-devops-accent font-mono">03.</span> Infrastructure Projects
            </h2>
            <div className="h-px bg-devops-border flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-devops-bg p-8 rounded-lg border border-devops-border hover:-translate-y-2 hover:shadow-[0_10px_30px_-15px_rgba(59,130,246,0.3)] transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="text-devops-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-6-6H4a2 2 0 0 0-2 2v16Z"></path>
                    <path d="M14 2v6h6"></path>
                    <path d="m10 13-2 2 2 2"></path>
                    <path d="m14 17 2-2-2-2"></path>
                  </svg>
                </div>
                <a href={project.link} className="text-devops-textMuted hover:text-devops-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              <h3 className="text-xl font-bold text-devops-text mb-3">
                {project.title}
              </h3>
              <p className="text-devops-textMuted text-sm mb-6 flex-grow">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-3 font-mono text-xs text-devops-secondary">
                {project.tech.map((tech, tIndex) => (
                  <li key={tIndex}>{tech}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
