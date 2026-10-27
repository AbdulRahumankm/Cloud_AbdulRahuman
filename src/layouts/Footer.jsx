import React from 'react';

const Footer = ({ site }) => {
  return (
    <footer className="py-6 bg-devops-card border-t border-devops-border text-center">
      <p className="text-devops-textMuted font-mono text-xs uppercase tracking-widest">
        {site.footer}
        <span className="mx-3 opacity-40">·</span>
        <a href="/admin" className="hover:text-devops-primary">Admin</a>
      </p>
    </footer>
  );
};

export default Footer;
