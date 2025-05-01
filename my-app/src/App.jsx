// Imports.
import React from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import GlobalStyle from './theme/GlobalStyle';

// Component Imports.
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import ConnectButton from './components/ConnectButton';

// Data Imports.
import education from './data/education';
import projects from './data/projects';
import experience from './data/experience';
import skills from './data/skills';

// CSS Imports.
import './App.css'

// App Component.
function App() {
  return (
    <ThemeProvider> {/* Theme Provider. */}
      <GlobalStyle /> {/* Global Style. */}
      <ThemeToggle /> {/* Theme Toggle. */}
      <NavBar /> {/* Nav Bar. */}
      <ScrollProgress />
      <Hero /> {/* Hero. */}
      <Section id="experience" content={experience} /> {/* Experience. */}
      <Section id="education" content={education} /> {/* Education. */}
      <Section id="projects" content={projects} /> {/* Projects. */}
      <Section id="skills" content={skills} /> {/* Skills. */}
      <Footer /> {/* Footer. */}
    </ThemeProvider>
  );
}

// Export.
export default App; 