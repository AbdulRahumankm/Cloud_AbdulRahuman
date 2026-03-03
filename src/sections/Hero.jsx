import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const commandList = [
    "ssh infra-admin@cloud-node-01",
    "docker-compose.yml version: '3.8'",
    "kubectl get nodes --show-labels",
    "ansible-playbook configure-sre.yml",
    "terraform apply --auto-approve",
    "grep -r 'CRITICAL' /var/log/syslog"
  ];

  useEffect(() => {
    let charIndex = 0;
    const currentCommand = commandList[currentIndex];
    
    const typingInterval = setInterval(() => {
      if (charIndex < currentCommand.length) {
        setDisplayText(currentCommand.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % commandList.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  return (
    <section id="hero" className="min-h-screen pt-24 flex flex-col items-center justify-center bg-devops-bg relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-devops-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-devops-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devops-card border border-devops-border text-devops-secondary text-xs uppercase tracking-widest font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devops-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-devops-primary"></span>
              </span>
              Infrastructure Status: Healthy
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-devops-text tracking-tight">
              Abdul <span className="text-transparent bg-clip-text bg-gradient-to-r from-devops-primary to-devops-secondary">Rahuman</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold text-devops-primary">
              Cloud & Infrastructure Engineer
            </p>
            
            <p className="text-lg md:text-xl text-devops-textMuted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-mono">
              L1 Technical Support Engineer | Docker | Linux | Cloud Monitoring
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a href="#infra-projects" className="px-8 py-4 bg-devops-primary text-devops-bg font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95">
              View Infrastructure
            </a>
            <a href="/resume.pdf" download className="px-8 py-4 border border-devops-border text-devops-text font-bold rounded-lg transition-all duration-300 hover:bg-devops-card hover:border-devops-secondary hover:text-devops-secondary active:scale-95">
              Download Resume
            </a>
          </div>
        </div>

        {/* Dashboard Visualizer */}
        <div className="flex-1 w-full max-w-xl animate-slide-up">
          <div className="bg-[#0f172a] rounded-xl border border-devops-border shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="bg-[#1e293b] px-4 py-3 flex items-center justify-between border-b border-devops-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="text-devops-textMuted text-[10px] font-mono tracking-widest uppercase">root@sre-dashboard:~</div>
            </div>
            <div className="p-8 font-mono text-xs md:text-sm min-h-[300px] space-y-6">
              <div className="flex gap-2 text-devops-secondary">
                <span>➜</span>
                <span className="text-devops-textMuted">/opt/infra</span>
                <span className="text-devops-text whitespace-pre">{displayText}</span>
                <span className="w-2.5 h-5 bg-devops-primary animate-pulse inline-block align-middle"></span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-4 rounded bg-devops-card/50 border border-devops-border/50">
                  <div className="text-[10px] text-devops-textMuted uppercase mb-1">CPU Load</div>
                  <div className="text-devops-primary text-xl font-bold">12.4%</div>
                  <div className="w-full bg-devops-bg h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-devops-primary w-[12%] h-full"></div>
                  </div>
                </div>
                <div className="p-4 rounded bg-devops-card/50 border border-devops-border/50">
                  <div className="text-[10px] text-devops-textMuted uppercase mb-1">Net Traffic</div>
                  <div className="text-devops-secondary text-xl font-bold">1.2 Gbps</div>
                  <div className="w-full bg-devops-bg h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-devops-secondary w-[45%] h-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 opacity-60">
                <div className="flex justify-between items-center text-[10px] text-devops-textMuted border-b border-devops-border/20 pb-1">
                  <span>LOG STREAM</span>
                  <span>ID</span>
                  <span>TIME</span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-400/80">
                  <span>[INFO] Auth success</span>
                  <span>0x7f32</span>
                  <span>2ms ago</span>
                </div>
                <div className="flex justify-between text-[11px] text-blue-400/80">
                  <span>[DB] Sync complete</span>
                  <span>0xa1c4</span>
                  <span>14ms ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
