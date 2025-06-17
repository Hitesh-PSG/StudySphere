import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDocker, FaAws } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiKubernetes, SiTerraform } from 'react-icons/si';

const roadmaps = [
  { name: "Frontend", icons: [FaHtml5, FaCss3Alt, SiJavascript, FaReact, SiTypescript] },
  { name: "Backend", icons: [FaNodeJs, FaDocker, FaAws] },
  { name: "DevOps", icons: [SiKubernetes, SiTerraform, FaDocker, FaAws] },
];

const RoadmapsSection = () => {
    // Reusing the same animation logic as CareerLaunchpad
    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
    };
    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-20 sm:py-32 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Guided Learning Roadmaps</h2>
                    <p className="mt-4 text-xl text-gray-400">Structured paths to master your chosen field with expert guidance.</p>
                </div>
                <motion.div
                    className="space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {roadmaps.map((roadmap) => (
                        <motion.div
                            key={roadmap.name}
                            className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between"
                            variants={itemVariants}
                        >
                            <h3 className="text-2xl font-bold text-sky-300 mb-4 sm:mb-0">{roadmap.name} Developer</h3>
                            <div className="flex items-center gap-4 text-gray-400">
                                {roadmap.icons.map((Icon, index) => (
                                    <Icon key={index} size={32} className="transition-transform hover:text-white hover:scale-125" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default RoadmapsSection;