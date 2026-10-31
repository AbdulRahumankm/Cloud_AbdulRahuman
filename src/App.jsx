import React from 'react';
import MainLayout from './layouts/MainLayout';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import InfrastructureProjects from './sections/InfrastructureProjects';
import ContactSection from './sections/ContactSection';
import Contact from './sections/Contact';
import CustomSections from './sections/CustomSections';
import portfolioContent from '../content/portfolio.json';
import './App.css'; 

function App({ content = portfolioContent }) {
  return (
    <MainLayout site={content.site} navigation={content.navigation}>
      <Hero content={content.hero} />
      <div className="section-divider"></div>
      <About content={content.about} />
      <div className="section-divider"></div>
      <Skills content={content.skills} />
      <div className="section-divider"></div>
      <InfrastructureProjects content={content.cloudOps} />
      <div className="section-divider"></div>
      <Projects content={content.projects} />
      <div className="section-divider"></div>
      <CustomSections sections={content.customSections} />
      <ContactSection content={content.contact} />
      <Contact content={content.contact} />
    </MainLayout>
  );
}

export default App;
