'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../lib/types';
import Image from 'next/image';

// Types for portfolio data
type Skill = {
  name: string;
  level: number; // 1-5
  icon: string;
};

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
};

// Portfolio data
const portfolioData = {
  name: 'Sameer Patil',
  title: 'Product Designer',
  photo: '/images/profile.jpg', // Replace with actual photo path
  bio: 'Crafting digital experiences with pixel-perfect precision. I transform complex challenges into intuitive designs that users love.',
  skills: [
    { name: 'UI/UX Design', level: 5, icon: '🎨' },
    { name: 'Figma', level: 5, icon: '🔧' },
    { name: 'Prototyping', level: 4, icon: '🖥️' },
    { name: 'User Research', level: 4, icon: '🔍' },
    { name: 'Wireframing', level: 5, icon: '📝' },
    { name: 'Design Systems', level: 4, icon: '🧩' },
    { name: 'Adobe Suite', level: 3, icon: '🖌️' },
    { name: 'Motion Design', level: 3, icon: '🎬' },
  ] as Skill[],
  projects: [
    {
      title: 'Diamond App',
      description: 'A premium e-commerce experience with Minecraft-inspired design system',
      image: '/images/project1.png',
      tags: ['UI/UX', 'E-commerce', 'Mobile'],
      link: '#'
    },
    {
      title: 'Emerald Dashboard',
      description: 'Analytics dashboard for tracking crafting resources and inventory',
      image: '/images/project2.png',
      tags: ['Dashboard', 'Data Viz', 'Web App'],
      link: '#'
    },
    {
      title: 'Redstone Connect',
      description: 'Social platform connecting builders and designers across servers',
      image: '/images/project3.png',
      tags: ['Social', 'Community', 'Responsive'],
      link: '#'
    },
    {
      title: 'Obsidian Portal',
      description: 'Dark-themed portal for showcasing digital artwork and NFTs',
      image: '/images/project4.png',
      tags: ['Gallery', 'Dark UI', 'Web3'],
      link: '#'
    }
  ] as Project[],
  contact: {
    email: 'sameer@patil.design',
    github: 'github.com/sameerpatil',
    linkedin: 'linkedin.com/in/sameerpatil',
    twitter: 'twitter.com/sameerpatil'
  }
};

// Hero Section with Minecraft styling
const HeroSection = ({ id }: { id: string }) => (
  <section id={id} className="min-h-screen flex items-center py-20">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 w-full">
      <div className="flex-1">
        <h1 className="text-5xl font-minecraft mb-4 text-minecraft-diamond">
          {portfolioData.name}
        </h1>
        <h2 className="text-3xl mb-6 text-minecraft-emerald">{portfolioData.title}</h2>
        <p className="text-xl text-gray-400 mb-8">{portfolioData.bio}</p>
        <div className="flex gap-4">
          <a href="#projects" className="minecraft-btn bg-minecraft-grass text-white hover:bg-opacity-90 pixel-corners">
            View Projects
          </a>
          <a href="#contact" className="minecraft-btn bg-minecraft-obsidian text-white border border-minecraft-diamond pixel-corners">
            Contact Me
          </a>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="relative w-64 h-64 border-4 border-minecraft-diamond p-2 bg-minecraft-obsidian pixel-corners">
          <div className="w-full h-full relative pixel-corners overflow-hidden">
            {/* Minecraft-style pixel portrait placeholder */}
            <div className="absolute inset-0 bg-minecraft-deepnight flex items-center justify-center">
              <span className="text-6xl">👤</span>
            </div>
            {/* Uncomment when you have a real image */}
            {/* <Image 
              src={portfolioData.photo}
              alt={portfolioData.name}
              fill
              className="object-cover"
            /> */}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// About Section
const AboutSection = ({ id }: { id: string }) => (
  <section id={id} className="min-h-screen flex items-center py-20">
    <div className="w-full">
      <h2 className="text-3xl font-minecraft mb-8 text-minecraft-diamond text-center">About Me</h2>
      <div className="minecraft-panel bg-minecraft-deepnight">
        <p className="text-gray-300 mb-4">
          I'm a passionate Product Designer with a love for creating intuitive and visually appealing user experiences. With a background in both design and front-end development, I bridge the gap between aesthetics and functionality.
        </p>
        <p className="text-gray-300 mb-4">
          My journey began in digital art, which evolved into UI/UX design as I discovered my passion for creating systems that not only look good but work seamlessly for users. I believe in design that serves a purpose and solves real problems.
        </p>
        <p className="text-gray-300">
          When I'm not designing, you can find me exploring Minecraft worlds, creating pixel art, or experimenting with new design tools and techniques to expand my creative toolkit.
        </p>
      </div>
    </div>
  </section>
);

// Skills Section with Minecraft Badge styling
const SkillsSection = ({ id }: { id: string }) => (
  <section id={id} className="min-h-screen flex items-center py-20">
    <div className="w-full">
      <h2 className="text-3xl font-minecraft mb-8 text-minecraft-diamond text-center">Skills & Abilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolioData.skills.map((skill, index) => (
          <div 
            key={index} 
            className="minecraft-panel bg-minecraft-deepnight p-4 pixel-corners hover:animate-hover-bounce transition-all duration-300"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3 bg-minecraft-obsidian p-2 rounded">{skill.icon}</span>
              <h3 className="text-xl text-minecraft-grass font-minecraft">{skill.name}</h3>
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-6 h-6 ${i < skill.level 
                    ? 'bg-minecraft-diamond' 
                    : 'bg-minecraft-obsidian'} border border-gray-700`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Projects Section with Minecraft Block styling
const ProjectsSection = ({ id }: { id: string }) => (
  <section id={id} className="min-h-screen flex items-center py-20">
    <div className="w-full">
      <h2 className="text-3xl font-minecraft mb-8 text-minecraft-diamond text-center">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, index) => (
          <div 
            key={index} 
            className="minecraft-panel bg-minecraft-deepnight overflow-hidden transition-all hover:animate-hover-bounce"
          >
            <div className="h-48 bg-minecraft-obsidian relative pixel-corners">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg">
                {/* Minecraft-themed project image placeholder */}
                <div className="text-4xl">🧱</div>
              </div>
              {/* Uncomment when you have real images */}
              {/* <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              /> */}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-minecraft text-minecraft-gold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-minecraft-obsidian text-gray-300 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <a 
                  href={project.link} 
                  className="inline-block minecraft-btn bg-minecraft-emerald hover:bg-opacity-90 text-white text-sm"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Contact Section with Minecraft Sign styling
const ContactSection = ({ id }: { id: string }) => (
  <section id={id} className="min-h-screen flex items-center py-20">
    <div className="w-full">
      <h2 className="text-3xl font-minecraft mb-8 text-minecraft-diamond text-center">Contact Me</h2>
      <div className="minecraft-panel bg-minecraft-deepnight max-w-lg mx-auto relative">
        {/* Wooden sign top decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-minecraft-wood rotate-45"></div>
        
        <div className="mb-6 px-4">
          <p className="text-gray-300 mb-4 text-center font-minecraft">Ready to craft something amazing together?</p>
          <div className="flex items-center justify-center mb-3 text-gray-300">
            <span className="mr-3 text-minecraft-redstone">✉️</span>
            <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-minecraft-diamond transition">
              {portfolioData.contact.email}
            </a>
          </div>
        </div>
        
        <div className="flex justify-center gap-6 p-4 border-t border-minecraft-obsidian">
          <a href={`https://${portfolioData.contact.github}`} className="text-gray-300 hover:text-minecraft-diamond transition" target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">📂</span>
              <span>GitHub</span>
            </div>
          </a>
          <a href={`https://${portfolioData.contact.linkedin}`} className="text-gray-300 hover:text-minecraft-diamond transition" target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">💼</span>
              <span>LinkedIn</span>
            </div>
          </a>
          <a href={`https://${portfolioData.contact.twitter}`} className="text-gray-300 hover:text-minecraft-diamond transition" target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">🐦</span>
              <span>Twitter</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default function PortfolioContent() {
  const [activeSection, setActiveSection] = useState<Section>(Section.MAIN);
  
  // References to each section
  const mainRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Function to navigate to a section
  const handleNavigate = (section: Section) => {
    setActiveSection(section);
    window.dispatchEvent(new CustomEvent('navigate-scene', { detail: { section } }));
    
    // Scroll to the section
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Observer for detecting which section is visible
  useEffect(() => {
    const sectionIds = [
      { id: 'main', section: Section.MAIN },
      { id: 'about', section: Section.ABOUT },
      { id: 'projects', section: Section.PROJECTS },
      { id: 'skills', section: Section.SKILLS },
      { id: 'contact', section: Section.CONTACT }
    ];
    
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.6 // 60% of the section needs to be visible
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = sectionIds.find(s => s.id === entry.target.id)?.section;
          if (section && section !== activeSection) {
            setActiveSection(section);
            window.dispatchEvent(new CustomEvent('navigate-scene', { detail: { section } }));
          }
        }
      });
    }, observerOptions);
    
    // Observe each section
    sectionIds.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => {
      sectionIds.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [activeSection]);
  
  return (
    <div className="w-[65%] h-full absolute top-0 right-0 flex flex-col overflow-y-auto bg-minecraft-night text-white">
      {/* Minecraft-style Navigation */}
      <nav className="p-4 sticky top-0 z-50 bg-minecraft-deepnight bg-opacity-95 backdrop-blur-sm">
        <ul className="flex justify-center space-x-2">
          <li>
            <button 
              onClick={() => handleNavigate(Section.MAIN)}
              className={`px-4 py-2 font-minecraft text-sm rounded ${
                activeSection === Section.MAIN 
                  ? 'bg-minecraft-grass text-white' 
                  : 'bg-minecraft-obsidian hover:bg-gray-800'
              }`}
              tabIndex={0}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.ABOUT)}
              className={`px-4 py-2 font-minecraft text-sm rounded ${
                activeSection === Section.ABOUT 
                  ? 'bg-minecraft-grass text-white' 
                  : 'bg-minecraft-obsidian hover:bg-gray-800'
              }`}
              tabIndex={0}
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.PROJECTS)}
              className={`px-4 py-2 font-minecraft text-sm rounded ${
                activeSection === Section.PROJECTS 
                  ? 'bg-minecraft-grass text-white' 
                  : 'bg-minecraft-obsidian hover:bg-gray-800'
              }`}
              tabIndex={0}
            >
              Projects
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.SKILLS)}
              className={`px-4 py-2 font-minecraft text-sm rounded ${
                activeSection === Section.SKILLS 
                  ? 'bg-minecraft-grass text-white' 
                  : 'bg-minecraft-obsidian hover:bg-gray-800'
              }`}
              tabIndex={0}
            >
              Skills
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate(Section.CONTACT)}
              className={`px-4 py-2 font-minecraft text-sm rounded ${
                activeSection === Section.CONTACT 
                  ? 'bg-minecraft-grass text-white' 
                  : 'bg-minecraft-obsidian hover:bg-gray-800'
              }`}
              tabIndex={0}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      {/* Content with all sections stacked */}
      <div className="flex-1 px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <HeroSection id="main" />
          <AboutSection id="about" />
          <ProjectsSection id="projects" />
          <SkillsSection id="skills" />
          <ContactSection id="contact" />
        </div>
      </div>
      
      {/* Minecraft-style Footer */}
      <footer className="bg-minecraft-deepnight p-4 text-center text-gray-400 text-sm border-t border-minecraft-obsidian">
        <p className="font-minecraft">© 2023 {portfolioData.name} | Product Designer</p>
        <p className="mt-1">Made with 🧱 (and React)</p>
      </footer>
    </div>
  );
} 