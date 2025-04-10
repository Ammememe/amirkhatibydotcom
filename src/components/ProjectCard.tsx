import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../constants';

interface ProjectCardProps extends Project {
  index: number;
}

const ProjectCard = ({ title, bulletPoints, tags, spotlightImage, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={spotlightImage}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        
        {/* Display bullet points */}
        <ul className="text-gray-600 mb-4 space-y-2">
          {bulletPoints.map((point, idx) => (
            <li key={idx} className="flex items-start">
              <span className="inline-block w-2 h-2 rounded-full bg-gray-400 mr-2 mt-2 flex-shrink-0"></span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 