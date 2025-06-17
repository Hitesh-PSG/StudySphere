import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 w-[60rem] h-[60rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-emerald-900 via-sky-900 to-indigo-900 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 p-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-emerald-300">
          Unlock Your Potential.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
          Your gateway to a universe of knowledge. Master in-demand skills with interactive courses, expert-led prep, and a vibrant community.
        </p>
        <div className="flex justify-center gap-4">
          <motion.a 
            href="#career-launchpad"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-500 text-white font-semibold px-8 py-3 rounded-full transition-colors hover:bg-emerald-600"
          >
            Start Learning
          </motion.a>
          <motion.a 
            href="#courses"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-700/50 text-gray-200 font-semibold px-8 py-3 rounded-full transition-colors hover:bg-gray-700/80"
          >
            Explore Courses <ArrowRight size={20} className="inline ml-1"/>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;