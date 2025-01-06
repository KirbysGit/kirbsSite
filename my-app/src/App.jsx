import React from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import GlobalStyle from './theme/GlobalStyle';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';

// Import data
import education from './data/education';
import projects from './data/projects';
import experience from './data/experience';
import skills from './data/skills';

// Import CSS
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <ThemeToggle />
      <NavBar />
      <Hero />
      <Section id="education" title="Education 🎓" content={education} />
      <Section id="projects" title="Projects 💻" content={projects} />
      <Section id="experience" title="Experience 📋" content={experience} />
      <Section id="skills" title="Skills 📚" content={skills} />
      <Footer />
    </ThemeProvider>
  );
}

export default App; 