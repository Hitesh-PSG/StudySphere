import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Code, Layers, Shield, ArrowRight, Github, Linkedin, Briefcase, Brain, Star, Search, MessageSquare, Bot, ArrowDown } from "lucide-react";
import { useAuth } from '../Login/AuthContext';

// The CareerCard component remains unchanged.
const CareerCard = ({ icon: Icon, title, description, buttonText, color, animationDelay, to }) => {
  const cardRef = useRef(null);
  const [glowStyle, setGlowStyle] = useState({});

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setGlowStyle({ '--glow-x': `${x}px`, '--glow-y': `${y}px`, '--glow-opacity': '1' });
    };
    const handleMouseLeave = () => { setGlowStyle({ '--glow-opacity': '0' }); };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const colorClasses = {
    violet: { glow: 'from-violet-500/50', text: 'text-violet-400', button: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500', shadow: 'shadow-violet-500/30' },
    cyan: { glow: 'from-cyan-400/50', text: 'text-cyan-400', button: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400', shadow: 'shadow-cyan-500/30' },
    pink: { glow: 'from-pink-500/50', text: 'text-pink-400', button: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400', shadow: 'shadow-pink-500/30' }
  };
  
  const currentTheme = colorClasses[color];
  const isExternal = to && to.startsWith('http');

  return (
    <div ref={cardRef} style={{ animationDelay }} className="animate-fade-in-up group relative p-px rounded-2xl bg-slate-900/80 hover:bg-slate-900 transition-colors duration-300 h-full">
        <div className="absolute inset-0 rounded-2xl transition-opacity duration-500" style={{ opacity: 'var(--glow-opacity, 0)', background: `radial-gradient(400px circle at var(--glow-x) var(--glow-y), ${currentTheme.glow}, transparent 70%)` }} />
        <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl h-full p-6 md:p-8 flex flex-col transition-all duration-300 group-hover:border-slate-600">
            <div className={`absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 ${currentTheme.text} opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-tl-xl`}></div>
            <div className={`absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 ${currentTheme.text} opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-br-xl`}></div>
            <div className="flex-grow flex flex-col items-center text-center">
                <div className={`mb-6 ${currentTheme.text} transition-transform duration-300 group-hover:scale-110`}><Icon className="w-10 h-10 md:w-12 md:h-12" /></div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm md:text-base mb-8 flex-grow">{description}</p>
            </div>
            <Button asChild className={`w-full font-semibold text-white text-base h-12 ${currentTheme.button} ${currentTheme.shadow} shadow-lg transition-all duration-300 transform group-hover:-translate-y-1`}>
                {isExternal ? (
                    <a href={to} target="_blank" rel="noopener noreferrer">{buttonText}</a>
                ) : (
                    <Link to={to}>{buttonText}</Link>
                )}
            </Button>
        </div>
    </div>
  );
};


const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // --- FIX: Re-added the missing variable declaration ---
  const interactiveCardClass = "bg-slate-800/60 backdrop-blur-md border border-slate-700/80 rounded-2xl transition-all duration-300 hover:border-violet-500/80 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1";
  
  const quickActionCardClass = `group relative overflow-hidden text-center flex flex-col items-center justify-center p-8 
                                 bg-slate-800/60 backdrop-blur-md border border-slate-700/80 rounded-2xl 
                                 transition-all duration-300 
                                 hover:border-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-500/10 hover:-translate-y-1`;

  return (
    <>
        <section className="min-h-screen flex flex-col items-center justify-center text-center relative px-4">
          
            <div className="animate-fade-in w-full">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  Study Hub
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mx-auto max-w-2xl animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                  Welcome, Learner <span className="font-semibold text-white">{currentUser?.displayName || 'Explorer'}</span>. Your learning journey begins now.
              </p>
              
              <div className="max-w-4xl mx-auto mt-12 md:mt-16">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <Link to="/discover" className={`${quickActionCardClass} animate-fade-in-up`} style={{ animationDelay: '400ms' }}>
                        <Search className="w-8 h-8 mb-3 text-slate-300 group-hover:text-yellow-400 transition-colors" />
                        <h3 className="text-xl font-bold text-white">Discover</h3>
                        <p className="text-slate-400">Explore content</p>
                        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"></div>
                      </Link>
                      <Link to="/projects" className={`${quickActionCardClass} animate-fade-in-up`} style={{ animationDelay: '550ms' }}>
                        <Star className="w-8 h-8 mb-3 text-slate-300 group-hover:text-yellow-400 transition-colors" />
                        <h3 className="text-xl font-bold text-white">Projects</h3>
                        <p className="text-slate-400">Showcase work</p>
                        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"></div>
                      </Link>
                      <Link to="/discussions" className={`${quickActionCardClass} animate-fade-in-up`} style={{ animationDelay: '700ms' }}>
                        <MessageSquare className="w-8 h-8 mb-3 text-slate-300 group-hover:text-yellow-400 transition-colors" />
                        <h3 className="text-xl font-bold text-white">Community</h3>
                        <p className="text-slate-400">Join discussion</p>
                        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl"></div>
                      </Link>
                  </div>
              </div>
            </div>

            <div className="absolute bottom-10 animate-bounce">
                <ArrowDown className="w-6 h-6 text-slate-500" />
            </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 space-y-16 md:space-y-20 py-16 sm:py-24">
            <section>
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Your Career Launchpad</h2>
                    <p className="text-slate-400 mb-12 max-w-2xl mx-auto">Your gateway to the tech industry. Master interviews, build your resume, and land your dream job.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <CareerCard to="https://resumeegeneratorr.netlify.app/" icon={Briefcase} title="Resume Architect" description="Craft a professional, ATS-friendly resume that highlights your unique skills and projects." buttonText="Forge Your Resume" color="violet" animationDelay="300ms"/>
                    <CareerCard to="https://takeuforward.org/interview/" icon={Layers} title="Interview Experience" description="“Interviews aren’t just about questions — they’re about patterns.” By reading detailed experiences, you can anticipate common formats, practice targeted topics, and mentally prepare for different rounds." buttonText="Start Prep" color="cyan" animationDelay="500ms"/>
                    <CareerCard to="https://www.youtube.com/watch?v=k1oS6NUZkMk" icon={Brain} title="Behavioral Mastery" description="Learn to articulate your experiences and ace the behavioral interview using proven methods like STAR." buttonText="Master the Method" color="pink" animationDelay="700ms"/>
                </div>
            </section>

            <section>
                <div>
                    <h2 className="text-3xl font-bold text-center mb-12">Guided Roadmaps</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {/* --- FIX: Using the now-defined interactiveCardClass --- */}
                      <Card className={`${interactiveCardClass} h-full flex flex-col`}>
                            <CardHeader><div className="flex items-center gap-4"><Code className="w-8 h-8 text-violet-400" /><CardTitle className="text-xl md:text-2xl text-white">Frontend</CardTitle></div></CardHeader>
                            <CardContent className="flex flex-col flex-grow"><div className="flex-grow"><p className="text-slate-300">Build beautiful, modern, and interactive user interfaces.</p><div className="flex flex-wrap gap-2 mt-4">{['HTML/CSS', 'JavaScript', 'React', 'Vite', 'Tailwind'].map(tech => <span key={tech} className="px-2 py-1 text-xs font-medium bg-violet-500/10 text-violet-300 rounded-full">{tech}</span>)}</div></div><Button asChild className="w-full font-semibold bg-violet-600/20 hover:bg-violet-600/40 text-violet-200 border border-violet-500 mt-6"><Link to="https://roadmap.sh/frontend" target='_blank'>View Full Roadmap <ArrowRight className="w-4 h-4 ml-2" /></Link></Button></CardContent>
                        </Card>
                        <Card className={`${interactiveCardClass} h-full flex flex-col`}>
                            <CardHeader><div className="flex items-center gap-4"><Layers className="w-8 h-8 text-cyan-400" /><CardTitle className="text-xl md:text-2xl text-white">Backend</CardTitle></div></CardHeader>
                            <CardContent className="flex flex-col flex-grow"><div className="flex-grow"><p className="text-slate-300">Master the server-side logic and database management.</p><div className="flex flex-wrap gap-2 mt-4">{['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Auth'].map(tech => <span key={tech} className="px-2 py-1 text-xs font-medium bg-cyan-500/10 text-cyan-300 rounded-full">{tech}</span>)}</div></div><Button asChild className="w-full font-semibold bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-200 border border-cyan-500 mt-6"><Link to="https://roadmap.sh/backend" target='_blank'>View Full Roadmap <ArrowRight className="w-4 h-4 ml-2" /></Link></Button></CardContent>
                        </Card>
                        <Card className={`${interactiveCardClass} h-full flex flex-col`}>
                            <CardHeader><div className="flex items-center gap-4"><Bot className="w-8 h-8 text-orange-400" /><CardTitle className="text-xl md:text-2xl text-white">AI & Data Science</CardTitle></div></CardHeader>
                            <CardContent className="flex flex-col flex-grow"><div className="flex-grow"><p className="text-slate-300">Dive into machine learning, deep learning, and data analysis to build intelligent systems.</p><div className="flex flex-wrap gap-2 mt-4">{['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch'].map(tech => <span key={tech} className="px-2 py-1 text-xs font-medium bg-orange-500/10 text-orange-300 rounded-full">{tech}</span>)}</div></div><Button asChild className="w-full font-semibold bg-orange-600/20 hover:bg-orange-600/40 text-orange-200 border border-orange-500 mt-6"><Link to="https://roadmap.sh/ai-data-scientist" target='_blank'>View Full Roadmap <ArrowRight className="w-4 h-4 ml-2" /></Link></Button></CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="text-center">
                <div>
                    <h3 className="text-lg text-slate-400 mb-4">A Passion Project by</h3>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400">Hitesh P</p>
                    <div className="flex justify-center gap-6 mt-4"><a href="https://github.com/Hitesh-PSG" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github /></a><a href="https://www.linkedin.com/in/hitesh-p24/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin /></a></div>
                </div>
            </section>
        </div>
    </>
  );
};

export default Dashboard;