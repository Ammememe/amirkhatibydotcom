import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

type SectionKey = 'about' | 'experience' | 'projects' | 'education' | 'contact';

interface NavbarProps {
  activeSection: SectionKey;
  setActiveSection: (section: SectionKey) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const { theme } = useTheme();
  
  // Define section titles based on theme
  const sectionTitles = {
    about: theme === 'light' ? 'Om mig' : 'About',
    experience: theme === 'light' ? 'Erfarenhet' : 'Experience',
    education: theme === 'light' ? 'Utbildning' : 'Education',
    projects: theme === 'light' ? 'Projekt' : 'Projects',
    contact: theme === 'light' ? 'Kontakt' : 'Contact'
  };
  
  // Reordered sections: about, experience, education, projects, contact
  const sections: SectionKey[] = ['about', 'experience', 'education', 'projects', 'contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 ${theme === 'light' ? 'bg-white/80' : 'bg-gray-900/80'} backdrop-blur-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`relative font-['Rubik'] ${
                activeSection === section
                  ? theme === 'light'
                    ? 'text-orange-500'
                    : 'text-blue-400'
                  : theme === 'light'
                  ? 'text-gray-600 hover:text-orange-500'
                  : 'text-gray-400 hover:text-blue-400'
              } transition-colors duration-300`}
            >
              {sectionTitles[section]}
              {activeSection === section && (
                <motion.div
                  layoutId="underline"
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                    theme === 'light' ? 'bg-orange-500' : 'bg-blue-400'
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;