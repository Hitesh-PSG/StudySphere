import React, { useState } from 'react';
import { Github, ExternalLink, Code, Youtube, ArrowRight, Brain, Server, Palette, FileText, ClipboardCheck, Building2, BookCheck } from 'lucide-react';
import EducatorProfileModal from './EducatorProfileModal.jsx';
import { educators } from './educators.js';
import { projects } from './projects.js';

// --- DATA ---
const roadmaps = [ { title: "Frontend Developer", icon: Palette, color: "blue", link: "https://roadmap.sh/frontend", keyTopics: ["HTML", "CSS", "JavaScript", "React", "TypeScript"] }, { title: "Backend Developer", icon: Server, color: "green", link: "https://roadmap.sh/backend", keyTopics: ["Node.js", "Databases", "APIs", "Authentication", "Docker"] }, { title: "DevOps Engineer", icon: Code, color: "orange", link: "https://roadmap.sh/devops", keyTopics: ["Linux", "CI/CD", "Kubernetes", "Terraform", "AWS"] }, { title: "Data Structures & Algos", icon: Brain, color: "purple", link: "https://roadmap.sh/computer-science", keyTopics: ["Arrays", "Graphs", "DP", "Trees", "Sorting"] } ];
const launchpadItems = [ { title: "Resume & Profile Builder", description: "Craft a standout resume that gets noticed by recruiters.", icon: FileText, color: "sky", link: "#" }, { title: "Interview Prep Kits", description: "Curated kits with problems and notes for key topics.", icon: ClipboardCheck, color: "emerald", link: "#" }, { title: "Company-Wise Prep", description: "Target your dream company with tailored preparation guides.", icon: Building2, color: "amber", link: "#" } ];

const Dashboard = () => {
  const [selectedEducator, setSelectedEducator] = useState(null);

  // --- FIX IS HERE ---
  // The strings must be wrapped in backticks (`) to be valid JavaScript template literals.
  const launchpadColorClasses = (color) => ({
    icon: `text-${color}-400`,
    border: `hover:border-${color}-500`,
    button: `bg-${color}-500 hover:bg-${color}-600`
  });
  const roadmapColorClasses = (color) => ({
    icon: `text-${color}-400`,
    border: `hover:border-${color}-500`,
    button: `bg-${color}-500 hover:bg-${color}-600`,
    tag: `bg-${color}-400/10 text-${color}-300 ring-1 ring-inset ring-${color}-400/20`
  });
  // --- END OF FIX ---

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Your Blueprint for Success 🚀</h1>
        <p className="text-slate-400 mt-2 text-lg">Strategic resources to help you bridge the gap and land your dream job.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">Career Launchpad</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {launchpadItems.map((item) => {
                const colors = launchpadColorClasses(item.color);
                return (
                  <div key={item.title} className={`bg-slate-800/70 p-6 rounded-lg border border-slate-700 transition-all duration-300 shadow-lg flex flex-col ${colors.border}`}>
                    <item.icon size={32} className={`${colors.icon} mb-3`} />
                    <h3 className="font-bold text-lg text-slate-100">{item.title}</h3>
                    <p className="text-slate-400 text-sm mt-1 mb-4 flex-grow">{item.description}</p>
                    <a href={item.link} className={`mt-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-md transition-colors ${colors.button}`}>
                      Explore <ArrowRight size={16} />
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">Guided Learning Roadmaps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {roadmaps.map((roadmap) => {
                const colors = roadmapColorClasses(roadmap.color);
                return (
                  <div key={roadmap.title} className={`bg-slate-800/70 p-5 rounded-lg border border-slate-700 transition-all duration-300 ${colors.border} flex flex-col`}>
                    <div className="flex items-center gap-3 mb-3">
                      <roadmap.icon size={24} className={colors.icon} />
                      <h3 className="font-bold text-lg text-slate-100">{roadmap.title}</h3>
                    </div>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {roadmap.keyTopics.map(topic => (
                        <span key={topic} className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${colors.tag}`}>
                          {topic}
                        </span>
                      ))}
                    </div>
                    <a href={roadmap.link} target="_blank" rel="noopener noreferrer" className={`mt-auto flex items-center justify-center gap-2 w-full py-2 text-sm font-semibold text-white rounded-md transition-colors ${colors.button}`}>
                      <BookCheck size={16} /> View Full Roadmap
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div id="featured-educators">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">Featured Educators</h2>
            <div className="space-y-3">
              {educators.map((educator) => (
                <div key={educator.id} onClick={() => setSelectedEducator(educator)} className="bg-slate-800/70 p-3 rounded-lg border border-slate-700 flex items-center gap-3 hover:bg-slate-700/50 transition-all duration-200 cursor-pointer hover:border-red-500">
                  <img src={educator.avatarUrl} alt={educator.name} className="w-12 h-12 rounded-full border-2 border-slate-600" />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-100 text-md">{educator.name}</h3>
                    <p className="text-slate-400 text-xs">{educator.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="build-and-showcase">
            <h2 className="text-2xl font-semibold text-slate-200 mb-4">Build & Showcase</h2>
            <div className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-slate-800/70 p-4 rounded-lg border border-slate-700 hover:border-yellow-500 transition-all duration-300">
                  <h3 className="font-bold text-md text-slate-100">{project.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full text-xs font-medium">{tech}</span>))}
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-700/80 rounded-md hover:bg-slate-700 transition-colors"><Github size={14} />GitHub</a>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-yellow-400 rounded-md hover:bg-yellow-300 transition-colors"><ExternalLink size={14} />Demo</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EducatorProfileModal educator={selectedEducator} onClose={() => setSelectedEducator(null)} />
    </div>
  );
};

export default Dashboard;