import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, ClipboardCheck, Building2 } from 'lucide-react';

const launchpadItems = [
  { title: "Resume & Profile Builder", description: "Craft a standout resume that gets noticed by recruiters.", icon: FileText, color: "sky", link: "#" },
  { title: "Interview Prep Kits", description: "Curated kits with problems and notes for key topics.", icon: ClipboardCheck, color: "emerald", link: "#" },
  { title: "Company-Wise Prep", description: "Target your dream company with tailored preparation guides.", icon: Building2, color: "amber", link: "#" }
];

// IMPORTANT FIX: Tailwind CSS needs full class names, not concatenated strings.
// This map provides the full class names for the JIT compiler to find.
const colorClasses = {
  sky: {
    icon: 'text-sky-400',
    border: 'hover:border-sky-400',
    button: 'bg-sky-500 hover:bg-sky-600'
  },
  emerald: {
    icon: 'text-emerald-400',
    border: 'hover:border-emerald-400',
    button: 'bg-emerald-500 hover:bg-emerald-600'
  },
  amber: {
    icon: 'text-amber-400',
    border: 'hover:border-amber-400',
    button: 'bg-amber-500 hover:bg-amber-600'
  }
};

const CareerLaunchpad = () => {
  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This makes children animate one by one
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="career-launchpad" className="py-20 sm:py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Career Launchpad 🚀</h2>
          <p className="mt-4 text-xl text-gray-400">Strategic resources to bridge the gap and land your dream job.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Triggers animation when component is in view
          viewport={{ once: true, amount: 0.3 }} // Ensures animation runs once
        >
          {launchpadItems.map((item) => {
            const colors = colorClasses[item.color];
            return (
              <motion.div 
                key={item.title} 
                className={`bg-gray-800/50 border border-gray-700 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 ${colors.border}`}
                variants={itemVariants}
              >
                <item.icon size={48} className={`${colors.icon} mb-6`} />
                <h3 className="font-bold text-2xl text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-8 flex-grow">{item.description}</p>
                <a href={item.link} className={`mt-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white rounded-full transition-colors ${colors.button}`}>
                  Explore <ArrowRight size={18} />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CareerLaunchpad;