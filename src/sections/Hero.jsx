import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const lines = [
    { text: '$ whoami', isCommand: true },
    { text: 'abdul_rahuman', isCommand: false },
    { text: '$ cat title.txt', isCommand: true },
    { text: 'Cloud & Infrastructure Engineer', isCommand: false },
    { text: '$ systemctl status motivation', isCommand: true },
    { text: '● motivation.service - L1 Technical Support | DevOps Enthusiast', isCommand: false },
    { text: '   Active: active (running) since Boot', isCommand: false },
    { text: '$ docker ps | grep production', isCommand: true },
    { text: '9b3f...  auto_scaler   Up 12 days   0.0.0.0:80->80/tcp', isCommand: false },
    { text: '$ ', isCommand: true }
  ];

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];

    if (currentLine.isCommand) {
      if (currentCharIndex < currentLine.text.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, 50); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setTerminalLines(prev => [...prev, currentLine.text]);
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 200); // Pause after typing
        return () => clearTimeout(timeout);
      }
    } else {
      // Print output immediately
      const timeout = setTimeout(() => {
        setTerminalLines(prev => [...prev, currentLine.text]);
        setCurrentLineIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  return (
    <section id="home" className="min-h-screen pt-20 pb-10 flex items-center bg-devops-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-devops-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-devops-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Details */}
          <div className="text-left space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full border border-devops-border bg-devops-card text-devops-secondary font-mono text-sm shadow-lg mb-4">
              <span className="animate-pulse mr-2 text-devops-primary">●</span> System Online
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-extrabold text-devops-text tracking-tight">
              Abdul <span className="text-transparent bg-clip-text bg-gradient-to-r from-devops-primary to-devops-secondary">Rahuman</span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-devops-textMuted mt-2">
              Cloud & Infrastructure Engineer
            </h2>
            
            <p className="max-w-xl text-lg text-devops-textMuted font-mono border-l-4 border-devops-primary pl-4 mt-6">
               L1 Technical Support | DevOps Enthusiast
            </p>
            
            <div className="pt-8 flex flex-wrap gap-4">
              <a href="#projects" className="px-8 py-3 bg-devops-primary text-devops-bg font-bold rounded hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                View Projects
              </a>
              <a href="#contact" className="px-8 py-3 bg-transparent border border-devops-border text-devops-text rounded hover:border-devops-secondary hover:text-devops-secondary transition-colors font-medium">
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Column - Animated Terminal */}
          <div className="relative group perspective-1000 mt-10 lg:mt-0 shadow-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-devops-primary to-devops-secondary rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0f18] rounded-lg ring-1 ring-devops-border overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 bg-[#1e293b] border-b border-devops-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs text-devops-textMuted font-mono text-center flex-1 pr-6">
                  bash - root@cloud-server:~
                </div>
              </div>
              
              {/* Terminal Body */}
              <div className="p-5 font-mono text-sm sm:text-base text-devops-textMuted h-80 overflow-y-auto">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className={`mb-1 ${line.startsWith('$') ? 'text-devops-secondary' : 'text-devops-text'}`}>
                    {line}
                  </div>
                ))}
                
                {/* Currently typed line */}
                {currentLineIndex < lines.length && lines[currentLineIndex].isCommand && (
                  <div className="mb-1 text-devops-secondary flex items-center">
                    <span>{lines[currentLineIndex].text.substring(0, currentCharIndex)}</span>
                    <span className="w-2 h-5 bg-devops-text animate-pulse ml-1 inline-block"></span>
                  </div>
                )}
                
                {/* Blinking cursor after finished */}
                {currentLineIndex >= lines.length && (
                  <div className="mb-1 text-devops-secondary flex items-center">
                    <span className="w-2 h-5 bg-devops-text animate-pulse ml-1 inline-block"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
