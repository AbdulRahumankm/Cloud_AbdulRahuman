import React, { useState } from 'react';

const NavLink = ({ item, onClick, mobile = false }) => (
  <a
    href={item.href}
    target={item.href.startsWith('https://') ? '_blank' : undefined}
    rel={item.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
    onClick={onClick}
    className={mobile
      ? 'block rounded-lg px-4 py-3 text-devops-textMuted hover:bg-devops-card hover:text-devops-primary'
      : 'shrink-0 rounded-md px-3 py-2 text-sm font-medium text-devops-textMuted transition-colors hover:text-devops-primary'}
  >
    {item.label}
  </a>
);

const Navbar = ({ site, navigation }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-devops-bg/95 backdrop-blur-sm border-b border-devops-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">
          <span className="shrink-0 text-devops-primary font-mono text-xl font-bold mr-auto lg:mr-2">{site.brand}</span>
          <div className="hidden lg:flex min-w-0 flex-1 items-center justify-end overflow-x-auto whitespace-nowrap">
            {navigation.items.map((item, index) => <NavLink key={`${item.href}-${index}`} item={item} />)}
          </div>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="lg:hidden rounded-lg border border-devops-border px-3 py-2 text-sm text-devops-text"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <a href="/admin" aria-label="Open portfolio admin editor" className="shrink-0 rounded-lg border border-devops-primary px-4 py-2 text-sm font-bold text-devops-primary transition-colors hover:bg-devops-primary hover:text-devops-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-devops-primary">
            {navigation.admin}
          </a>
        </div>
        {menuOpen && (
          <div id="mobile-navigation" className="lg:hidden max-h-[70vh] overflow-y-auto border-t border-devops-border py-2">
            {navigation.items.map((item, index) => (
              <NavLink key={`${item.href}-${index}`} item={item} mobile onClick={() => setMenuOpen(false)} />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
