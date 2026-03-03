import React from 'react';
import MainLayout from './layouts/MainLayout';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import InfrastructureProjects from './sections/InfrastructureProjects';
import ServerStatusDashboard from './sections/ServerStatusDashboard';
import CloudArchitecture from './sections/CloudArchitecture';
import DataPipeline from './sections/DataPipeline';
import CicdPipeline from './sections/CicdPipeline';
import AutomationPipelines from './sections/AutomationPipelines';
import ContactSection from './sections/ContactSection';
import Contact from './sections/Contact';
import './App.css'; 

function App() {
  return (
    <MainLayout>
      <Hero />
      <div className="section-divider"></div>
      <About />
      <div className="section-divider"></div>
      <Skills />
      <div className="section-divider"></div>
      <ServerStatusDashboard />
      <div className="section-divider"></div>
      <InfrastructureProjects />
      <div className="section-divider"></div>
      <CloudArchitecture />
      <div className="section-divider"></div>
      <DataPipeline />
      <div className="section-divider"></div>
      <CicdPipeline />
      <div className="section-divider"></div>
      <AutomationPipelines />
      <div className="section-divider"></div>
      <ContactSection />
      <Contact />
    </MainLayout>
  );
}

export default App;
