import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children, site, navigation }) => {
  return (
    <div className="bg-devops-bg min-h-screen font-sans antialiased text-devops-text scroll-smooth">
      <Navbar site={site} navigation={navigation} />
      <main>
        {children}
      </main>
      <Footer site={site} navigation={navigation} />
    </div>
  );
};

export default MainLayout;
