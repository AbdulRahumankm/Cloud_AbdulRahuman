import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-devops-bg relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-devops-primary font-mono mb-4">
          04. What's Next?
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-devops-text mb-6">
          Get In Touch
        </h2>
        <p className="text-devops-textMuted text-lg mb-10">
          Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you! Let's talk infrastructure, automation, or your next big project.
        </p>
        <a 
          href="abdulrahuam1204@gmail.com" 
          className="inline-block px-8 py-4 border-2 border-devops-primary text-devops-primary bg-transparent rounded font-mono font-bold hover:bg-devops-primary/10 transition-colors"
        >
           Initiate Handshake
        </a>
      </div>
    </section>
  );
};

export default Contact;
