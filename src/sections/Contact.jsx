import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-devops-bg relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-devops-primary font-mono mb-4">
          05. What's Next?
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-devops-text mb-6">
          Get In Touch
        </h2>
        <p className="text-devops-textMuted text-lg mb-10">
          Have a question or want to discuss an opportunity? Send me an email and I'll get back to you. Let's talk infrastructure, automation, or your next project.
        </p>
        <a 
          href="mailto:abdulrahuman1204@gmail.com"
          className="inline-block px-8 py-4 border-2 border-devops-primary text-devops-primary bg-transparent rounded font-mono font-bold hover:bg-devops-primary/10 transition-colors"
        >
           Initiate Handshake
        </a>
        <p className="text-devops-textMuted text-sm mt-4">
          Or email <a className="text-devops-primary underline" href="mailto:abdulrahuman1204@gmail.com">abdulrahuman1204@gmail.com</a>
        </p>
      </div>
    </section>
  );
};

export default Contact;
