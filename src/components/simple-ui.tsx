'use client';

import React, { useState } from 'react';
import { Section } from '../lib/types';

const portfolioData = {
  name: 'Steve Minecrafter',
  title: 'Full Stack Developer',
  about: 'A passionate developer who loves creating blocky experiences.',
  projects: [
    { id: 1, title: 'Block Builder', description: 'A web-based voxel building tool.' },
    { id: 2, title: 'Crafting API', description: 'RESTful API for managing game recipes.' }
  ],
  skills: ['JavaScript', 'React', 'Three.js', 'WebGL', 'Node.js'],
  contact: {
    email: 'steve@minecraftportfolio.com',
    github: 'github.com/steveminecrafter'
  }
};

function SimpleUI() {
  const [activeSection, setActiveSection] = useState<Section>(Section.MAIN);

  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    window.dispatchEvent(new CustomEvent('navigate-scene', { detail: { section } }));
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <nav className="pointer-events-auto p-4 flex justify-center">
        <ul className="flex space-x-2 bg-gray-800 p-2 rounded-lg">
          <li>
            <button onClick={() => handleNavigate(Section.MAIN)} className="px-4 py-2 rounded bg-green-600">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigate(Section.ABOUT)} className="px-4 py-2 rounded">
              About
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-3xl pointer-events-auto">
        <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg m-4">
          {activeSection === Section.MAIN ? (
            <div className="text-center">
              <h1 className="text-4xl mb-2">{portfolioData.name}</h1>
              <h2 className="text-2xl mb-6">{portfolioData.title}</h2>
              <p>Welcome to my Minecraft-themed portfolio!</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl mb-4">About Me</h2>
              <p>{portfolioData.about}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SimpleUI; 