import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-devops-bg/90 backdrop-blur-sm border-b border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-devops-primary font-mono text-xl font-bold">&gt;_ sys_admin</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-devops-text hover:text-devops-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
              <a href="#about" className="text-devops-textMuted hover:text-devops-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
              <a href="#skills" className="text-devops-textMuted hover:text-devops-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Skills</a>
              <a href="#projects" className="text-devops-textMuted hover:text-devops-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Projects</a>
              <a href="#contact" className="text-devops-textMuted hover:text-devops-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
