import React from 'react';

const skillCategories = [
  {
    title: "Cloud Providers",
    skills: ["AWS", "GCP", "Azure", "DigitalOcean"]
  },
  {
    title: "Containers & Orchestration",
    skills: ["Docker", "Kubernetes", "Helm", "EKS / GKE"]
  },
  {
    title: "Infrastructure as Code",
    skills: ["Terraform", "AWS CDK", "Ansible", "Pulumi"]
  },
  {
    title: "CI/CD & Automation",
    skills: ["Jenkins", "GitHub Actions", "GitLab CI", "ArgoCD"]
  },
  {
    title: "Observability",
    skills: ["Prometheus", "Grafana", "ELK Stack", "Datadog"]
  },
  {
    title: "Scripting & Languages",
    skills: ["Python", "Bash", "Go", "JavaScript / Node.js"]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-devops-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
              <h2 className="text-3xl font-bold text-devops-text">
                <span className="text-devops-secondary font-mono">02.</span> Technical Arsenal
              </h2>
              <div className="h-px bg-devops-border flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-devops-card p-6 rounded-lg border border-devops-border hover:border-devops-secondary transition-colors group">
              <h3 className="text-xl font-semibold text-devops-text mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-devops-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIndex) => (
                  <li key={sIndex} className="px-3 py-1 bg-devops-bg border border-devops-border text-devops-textMuted text-sm font-mono rounded group-hover:text-devops-text transition-colors">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
