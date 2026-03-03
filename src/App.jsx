import React from 'react';
import MainLayout from './layouts/MainLayout';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import InfrastructureProjects from './sections/InfrastructureProjects';
import ServerStatusDashboard from './sections/ServerStatusDashboard';
import CloudArchitecture from './sections/CloudArchitecture';
import ContactSection from './sections/ContactSection';
import Contact from './sections/Contact';
import './App.css'; 

function App() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <InfrastructureProjects />
      <ServerStatusDashboard />
      <CloudArchitecture />
      <ContactSection />
      <Contact />
    </MainLayout>
  );
}

export default App;
