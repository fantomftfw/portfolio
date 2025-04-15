'use client'

import React, { useState } from 'react'
import { Section } from '../lib/types'

// Portfolio data
const portfolioData = {
  name: 'Steve Minecrafter',
  title: 'Full Stack Developer',
  about: 'A passionate developer who loves creating blocky experiences. Specializing in React, Three.js, and building immersive digital worlds.',
  projects: [
    {
      id: 1,
      title: 'Block Builder',
      description: 'A web-based voxel building tool inspired by Minecraft.',
      technologies: ['React', 'Three.js', 'WebGL'],
      link: '#'
    },
    {
      id: 2,
      title: 'Crafting API',
      description: 'RESTful API for managing crafting recipes in games.',
      technologies: ['Node.js', 'Express', 'MongoDB'],
      link: '#'
    },
    {
      id: 3,
      title: 'Pixel Pathfinder',
      description: 'A pathfinding visualization tool with a retro aesthetic.',
      technologies: ['TypeScript', 'Canvas API', 'Algorithms'],
      link: '#'
    }
  ],
  skills: [
    'JavaScript', 'TypeScript', 'React', 'Three.js', 'Node.js', 
    'HTML5', 'CSS3', 'WebGL', 'MongoDB', 'Git'
  ],
  contact: {
    email: 'steve@minecraftportfolio.com',
    github: 'github.com/steveminecrafter',
    linkedin: 'linkedin.com/in/steveminecrafter'
  }
}

const UI = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.MAIN);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    window.dispatchEvent(new CustomEvent('navigate-scene', { detail: { section } }));
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <nav className="pointer-events-auto p-4 flex justify-center">
        <ul className="flex space-x-2 bg-minecraft-dirt bg-opacity-80 p-2 rounded-lg">
          <li>
            <button 
              onClick={() => handleNavigate(Section.MAIN)}
              className={`px-4 py-2 rounded ${activeSection === Section.MAIN ? 'bg-minecraft-grass text-white' : 'hover:bg-minecraft-stone'}`}
              tabIndex={0}
              aria-label="Navigate to main section"
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate(Section.MAIN)}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.ABOUT)}
              className={`px-4 py-2 rounded ${activeSection === Section.ABOUT ? 'bg-minecraft-grass text-white' : 'hover:bg-minecraft-stone'}`}
              tabIndex={0}
              aria-label="Navigate to about section"
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate(Section.ABOUT)}
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.PROJECTS)}
              className={`px-4 py-2 rounded ${activeSection === Section.PROJECTS ? 'bg-minecraft-grass text-white' : 'hover:bg-minecraft-stone'}`}
              tabIndex={0}
              aria-label="Navigate to projects section"
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate(Section.PROJECTS)}
            >
              Projects
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.SKILLS)}
              className={`px-4 py-2 rounded ${activeSection === Section.SKILLS ? 'bg-minecraft-grass text-white' : 'hover:bg-minecraft-stone'}`}
              tabIndex={0}
              aria-label="Navigate to skills section"
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate(Section.SKILLS)}
            >
              Skills
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.CONTACT)}
              className={`px-4 py-2 rounded ${activeSection === Section.CONTACT ? 'bg-minecraft-grass text-white' : 'hover:bg-minecraft-stone'}`}
              tabIndex={0}
              aria-label="Navigate to contact section"
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate(Section.CONTACT)}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-3xl pointer-events-auto">
        <div className="bg-minecraft-dirt bg-opacity-90 p-6 rounded-lg m-4 shadow-lg border-2 border-minecraft-stone">
          {activeSection === Section.MAIN && (
            <div className="text-center">
              <h1 className="text-4xl font-minecraft mb-2">{portfolioData.name}</h1>
              <h2 className="text-2xl font-minecraft mb-6">{portfolioData.title}</h2>
              <p className="text-lg">Welcome to my Minecraft-themed portfolio!</p>
              <p className="mt-4">Explore the world by clicking the navigation buttons above.</p>
            </div>
          )}
          
          {activeSection === Section.ABOUT && (
            <div>
              <h2 className="text-2xl font-minecraft mb-4">About Me</h2>
              <p className="mb-4">{portfolioData.about}</p>
              <p>I build digital experiences with the same passion that Minecraft players build their worlds - block by block, with creativity and attention to detail.</p>
            </div>
          )}
          
          {activeSection === Section.PROJECTS && (
            <div>
              <h2 className="text-2xl font-minecraft mb-4">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioData.projects.map(project => (
                  <div key={project.id} className="bg-minecraft-stone bg-opacity-50 p-4 rounded-lg hover:bg-minecraft-wood transition duration-300">
                    <h3 className="text-xl font-minecraft mb-2">{project.title}</h3>
                    <p className="mb-2">{project.description}</p>
                    <div className="flex flex-wrap mb-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-minecraft-grass px-2 py-1 rounded text-sm mr-2 mb-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      className="inline-block bg-minecraft-green hover:bg-minecraft-grass px-4 py-2 rounded"
                      tabIndex={0}
                      aria-label={`View project ${project.title}`}
                      onKeyDown={(e) => e.key === 'Enter' && window.open(project.link, '_blank')}
                    >
                      View Project
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeSection === Section.SKILLS && (
            <div>
              <h2 className="text-2xl font-minecraft mb-4">Skills</h2>
              <div className="flex flex-wrap">
                {portfolioData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-minecraft-stone px-3 py-2 rounded text-white m-1 hover:bg-minecraft-green transition duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {activeSection === Section.CONTACT && (
            <div>
              <h2 className="text-2xl font-minecraft mb-4">Contact</h2>
              <div className="space-y-3">
                <p>
                  <span className="font-bold">Email: </span>
                  <a 
                    href={`mailto:${portfolioData.contact.email}`} 
                    className="underline hover:text-minecraft-green"
                    tabIndex={0}
                    aria-label="Send email"
                    onKeyDown={(e) => e.key === 'Enter' && window.location.href = `mailto:${portfolioData.contact.email}`}
                  >
                    {portfolioData.contact.email}
                  </a>
                </p>
                <p>
                  <span className="font-bold">GitHub: </span>
                  <a 
                    href={`https://${portfolioData.contact.github}`} 
                    className="underline hover:text-minecraft-green" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    tabIndex={0}
                    aria-label="Visit GitHub profile"
                    onKeyDown={(e) => e.key === 'Enter' && window.open(`https://${portfolioData.contact.github}`, '_blank')}
                  >
                    {portfolioData.contact.github}
                  </a>
                </p>
                <p>
                  <span className="font-bold">LinkedIn: </span>
                  <a 
                    href={`https://${portfolioData.contact.linkedin}`} 
                    className="underline hover:text-minecraft-green" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    tabIndex={0}
                    aria-label="Visit LinkedIn profile"
                    onKeyDown={(e) => e.key === 'Enter' && window.open(`https://${portfolioData.contact.linkedin}`, '_blank')}
                  >
                    {portfolioData.contact.linkedin}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UI; 