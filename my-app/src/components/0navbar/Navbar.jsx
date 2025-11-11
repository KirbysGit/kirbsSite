import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from '../../utils/scrollToSection';
import { navItems } from './NavbarConfig';
import fullLogo from '@/images/0navbar/navLogo.png';
import cloud1Img from '@/images/3experience/clouds/cloud1.png';
import cloud2Img from '@/images/3experience/clouds/cloud2.png';
import cloud3Img from '@/images/3experience/clouds/cloud3.png';

// Subtle star twinkle animation for space theme
const starTwinkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

// Cloud drift animation (from Hero)
const cloudDrift = keyframes`
  0%, 100% { 
    background-position: 15% 20%, 70% 60%;
    opacity: 0.25;
  }
  50% { 
    background-position: 10% 25%, 65% 65%;
    opacity: 0.3;
  }
`;

// Star twinkle animation (from Hero)
const starTwinkleHero = keyframes`
  0%, 100% { 
    opacity: 0.6; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2); 
  }
`;

// Star field animation (from Hero)
const starField = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

// Wave animation for About section
const waveFlow = keyframes`
  0%, 100% { 
    background-position: 0% 50%, 100% 50%;
    opacity: 0.4;
  }
  50% { 
    background-position: 100% 50%, 0% 50%;
    opacity: 0.5;
  }
`;

// Floating bubbles animation (from About.jsx)
const floatParticles = keyframes`
  0%, 100% { 
    opacity: 0.5; 
    transform: translateY(0) translateZ(0); 
  }
  50% { 
    opacity: 0.8; 
    transform: translateY(-8px) translateZ(0); 
  }
`;

// Generate wave path for pill-sized sinusoidal wave
function generatePillWavePath(width = 200, height = 30, amplitude = 8, frequency = 3, phase = 0, thickness = 6) {
  const step = width / (frequency * 20);
  const top = [];
  const bottom = [];
  
  // Generate top wave (sine curve)
  for (let x = 0; x <= width; x += step) {
    const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude;
    top.push({ x, y });
  }
  
  // Generate bottom wave (offset by thickness)
  for (let x = width; x >= 0; x -= step) {
    const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude + thickness;
    bottom.push({ x, y });
  }
  
  // Build path
  let d = `M${top[0].x},${top[0].y}`;
  for (let i = 1; i < top.length; i++) d += ` L${top[i].x},${top[i].y}`;
  for (let i = 0; i < bottom.length; i++) d += ` L${bottom[i].x},${bottom[i].y}`;
  return d + ' Z';
}

// Aurora wave drift animation
const auroraWaveDrift = keyframes`
  0%, 100% { 
    transform: translateX(0);
  }
  50% { 
    transform: translateX(-10px);
  }
`;

// Aurora wave morph animation - creates gentle wave movement
const auroraWaveMorph = keyframes`
  0%, 100% { 
    opacity: 0.85;
    transform: translateX(0) scaleY(1);
  }
  25% { 
    opacity: 0.9;
    transform: translateX(-5px) scaleY(1.05);
  }
  50% { 
    opacity: 0.88;
    transform: translateX(0) scaleY(1);
  }
  75% { 
    opacity: 0.9;
    transform: translateX(5px) scaleY(1.05);
  }
`;

// Sun glow animation for Projects
const sunGlow = keyframes`
  0%, 100% { 
    opacity: 0.6;
    transform: scale(1);
  }
  50% { 
    opacity: 0.9;
    transform: scale(1.1);
  }
`;

const Navbar = ({ loadingCompleteTime = null }) => {
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isTopNavbarVisible, setIsTopNavbarVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMounted, setIsMounted] = useState(false);
  const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);

  // Mount navbar after Hero animations complete - timing relative to loading completion
  // Hero animations: 6.0s delay + 1.0s arrow animation = 7.0s total after loading
  useEffect(() => {
    if (!loadingCompleteTime) return; // Wait for loading to complete
    
    const heroAnimationDuration = 7000; // 6s delay + 1s arrow animation
    const mountTime = loadingCompleteTime + heroAnimationDuration;
    const now = performance.now();
    const delay = Math.max(0, mountTime - now);
    
    console.log(`[Navbar] Loading completed at ${loadingCompleteTime.toFixed(2)}ms`);
    console.log(`[Navbar] Will mount at ${mountTime.toFixed(2)}ms (in ${delay.toFixed(2)}ms)`);
    
    const timer = setTimeout(() => {
      setIsMounted(true);
      console.log(`[Navbar] Mounted at ${performance.now().toFixed(2)}ms`);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [loadingCompleteTime]);

  // Detect scroll direction and Hero visibility
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroElement = document.getElementById('hero');
      
      if (!heroElement) return;

      const heroRect = heroElement.getBoundingClientRect();
      const heroTop = heroRect.top;
      const heroBottom = heroRect.bottom;
      
      // Hide navbar threshold - hide when Hero top is within this distance from viewport top
      // This makes navbar hide earlier, before Hero actually leaves viewport
      const HIDE_THRESHOLD = 150; // Hide navbar 150px before Hero top reaches viewport top
      
      // Hero is fully in view if:
      // - Hero top is at or above the hide threshold (Hero is well within viewport, like when centered)
      //   OR we're at the top of the page (currentScrollY is small, meaning Hero is at initial position)
      // - AND Hero bottom is still visible (Hero hasn't completely scrolled past)
      // This means navbar shows when Hero is centered OR at top of page, hides when Hero top approaches threshold
      const isAtTopOfPage = currentScrollY < 50; // Small scroll threshold to detect "at top"
      const heroFullyInView = (heroTop >= HIDE_THRESHOLD || isAtTopOfPage) && heroBottom > 0;
      // Show side navbar as soon as top navbar should hide (when Hero approaches leaving)
      const shouldShowSideNav = !heroFullyInView;

      setIsScrolledPastHero(shouldShowSideNav);

      // Navbar visibility logic:
      // - Visible only when Hero is fully in view (Hero top at/above viewport top)
      // - Hide immediately when Hero starts leaving viewport (when scrolling down past Hero top)
      // - Side navbar appears as soon as top navbar is hidden
      if (heroFullyInView) {
        // Hero is fully in view - show navbar
        setIsTopNavbarVisible(true);
      } else {
        // Hero is leaving or has left viewport - hide navbar immediately
        setIsTopNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);

      // Detect active section based on scroll position
      const sections = ['hero', 'who-i-am', 'experience', 'projects', 'skills', 'about'];
      const scrollPosition = currentScrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    // Throttle scroll listener for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [lastScrollY, isMounted]);

  // Handle navigation click
  const handleNavClick = useCallback((sectionId, desktopOffset, mobileOffset) => {
    scrollToSection(sectionId, desktopOffset, mobileOffset);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Top navbar animation config
  const topNavbarConfig = useMemo(() => ({
    initial: { y: '-100%', opacity: 0 },
    animate: { 
      y: isTopNavbarVisible ? '0%' : '-100%',
      opacity: isTopNavbarVisible ? 1 : 0
    },
    transition: { duration: 0.4, ease: 'easeInOut' }
  }), [isTopNavbarVisible]);

  // Side pill navbar animation config
  const sideNavbarConfig = useMemo(() => ({
    initial: { x: '-100%', opacity: 0 },
    animate: { 
      x: isScrolledPastHero ? '0%' : '-100%',
      opacity: isScrolledPastHero ? 1 : 0
    },
    transition: { duration: 0.5, ease: 'easeOut' }
  }), [isScrolledPastHero]);

  if (!isMounted) return null;

  return (
    <>
      {/* Top Navbar */}
      <TopNavbarContainer
        {...topNavbarConfig}
        style={{ 
          pointerEvents: isTopNavbarVisible ? 'auto' : 'none',
          visibility: isTopNavbarVisible ? 'visible' : 'hidden'
        }}
      >
        <TopNavbarContent>
          {/* Logo */}
          <LogoContainer onClick={handleScrollToTop}>
            <LogoImage src={fullLogo} alt="Colin Kirby" />
          </LogoContainer>

          {/* Navigation Buttons */}
          <NavButtonsContainer>
            {navItems.map((item) => {
              const NavButtonVariant = getNavButtonVariant(item.id);
              const NavButtonBackground = getNavButtonBackground(item.id);
              return (
                <NavButtonVariant
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.desktopOffset, item.mobileOffset)}
                  $isActive={activeSection === item.id}
                >
                  {NavButtonBackground && <NavButtonBackground />}
                  <NavButtonIcon>{item.icon}</NavButtonIcon>
                  <NavButtonText>{item.label}</NavButtonText>
                </NavButtonVariant>
              );
            })}
          </NavButtonsContainer>

          {/* Social Links */}
          <SocialLinksContainer>
            <SocialLink
              href="https://www.linkedin.com/in/colinwkirby/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <SocialIcon viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </SocialIcon>
            </SocialLink>
            
            <SocialLink
              href="https://github.com/KirbysGit"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <SocialIcon viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </SocialIcon>
            </SocialLink>
            
            <SocialLink
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume"
            >
              <SocialIcon viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </SocialIcon>
            </SocialLink>
          </SocialLinksContainer>
        </TopNavbarContent>
      </TopNavbarContainer>

      {/* Side Pill Navbar */}
      <SideNavbarWrapper $isCollapsed={isSideNavCollapsed}>
        {/* Wrap both ToggleButton and SideNavbarContainer in same motion container */}
        {/* so they animate together when sliding out */}
        <SideNavbarMotionContainer
          {...sideNavbarConfig}
          style={{
            pointerEvents: isScrolledPastHero ? 'auto' : 'none',
            visibility: isScrolledPastHero ? 'visible' : 'hidden'
          }}
        >
          {/* Toggle Button - Half circle hump attached to pill */}
          <ToggleButton
            onClick={() => setIsSideNavCollapsed(!isSideNavCollapsed)}
            $isVisible={isScrolledPastHero}
          >
            <ChevronRight as="svg" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </ChevronRight>
          </ToggleButton>
          
          <SideNavbarContainer
            $isCollapsed={isSideNavCollapsed}
          >
          <SideNavContent $isCollapsed={isSideNavCollapsed}>
            {navItems.map((item) => {
              const SideNavButtonVariant = getSideNavButtonVariant(item.id);
              return (
                <SideNavButtonVariant
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.desktopOffset, item.mobileOffset)}
                  $isActive={activeSection === item.id}
                  title={item.label}
                >
                  <SideNavIcon>{item.icon}</SideNavIcon>
                  {activeSection === item.id && <ActiveIndicator />}
                </SideNavButtonVariant>
              );
            })}
          </SideNavContent>
          </SideNavbarContainer>
        </SideNavbarMotionContainer>
      </SideNavbarWrapper>
    </>
  );
};

/* ========== Styled Components ========== */

// Top Navbar Container
const TopNavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  
  /* Enhanced glass morphism effect */
  background: linear-gradient(
    135deg,
    rgba(13, 7, 27, 0.5) 0%,
    rgba(20, 12, 35, 0.4) 50%,
    rgba(13, 7, 27, 0.5) 100%
  );
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  
  /* Glass border effect */
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 20px rgba(100, 150, 255, 0.1);
  
  /* Subtle star effect */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
      radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 1px, transparent 1px);
    background-size: 100% 100%;
    animation: ${starTwinkle} 4s ease-in-out infinite;
    pointer-events: none;
    opacity: 0.5;
  }

  /* GPU acceleration */
  transform: translateZ(0);
  will-change: transform, opacity;

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Top Navbar Content
const TopNavbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  max-width: 100%;
  position: relative;
  z-index: 1;

  @media (max-width: 1600px) {
    padding: 0.875rem 1.5rem;
  }
`;

// Logo Container
const LogoContainer = styled.div`
  position: absolute;
  left: 2rem;
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
  
  @media (max-width: 1600px) {
    left: 1.5rem;
    height: 40px;
  }
`;

const LogoImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(150, 200, 255, 0.3));
  transition: all 0.3s ease;
  
  ${LogoContainer}:hover & {
    filter: drop-shadow(0 0 20px rgba(150, 200, 255, 0.8)) drop-shadow(0 0 30px rgba(100, 150, 255, 0.6));
    transform: scale(1.05);
  }
`;

// Social Links Container - positioned on right side
const SocialLinksContainer = styled.div`
  position: absolute;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  height: 50px;
  
  @media (max-width: 1600px) {
    right: 1.5rem;
    height: 40px;
    gap: 0.625rem;
  }
  
  @media (max-width: 900px) {
    display: none; /* Hide on mobile to save space */
  }
`;

// Social Link Button - matching pill styling
const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  
  /* GPU acceleration */
  transform: translateZ(0);
  will-change: border-color, box-shadow;
  
  /* Subtle base glow */
  box-shadow: none;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
  
  &:active {
    transition: all 0.1s ease;
  }
  
  @media (max-width: 1600px) {
    width: 36px;
    height: 36px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

// Social Icon SVG
const SocialIcon = styled.svg`
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
  
  @media (max-width: 1600px) {
    width: 18px;
    height: 18px;
  }
`;

// Navigation Buttons Container
const NavButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 1600px) {
    gap: 0.75rem;
  }

  @media (max-width: 900px) {
    gap: 0.5rem;
  }
`;

// Base Navigation Button - shared styles
const NavButtonBase = styled.button`
  font: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
  
  /* GPU acceleration */
  transform: translateZ(0);
  will-change: border-color, box-shadow;
  
  /* Subtle base glow */
  box-shadow: none;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
  
  &:active {
    transition: all 0.1s ease;
  }

  @media (max-width: 900px) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    gap: 0.375rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

// Who I Am - Space/Star theme (astronaut)
const NavButtonWhoIAm = styled(NavButtonBase)`
  background: linear-gradient(135deg,
    rgb(13, 7, 27) 0%,
    rgb(30, 20, 55) 40%,
    rgb(45, 30, 80) 70%,
    rgb(85, 60, 135) 95%,
    rgb(100, 70, 150) 100%);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
`;

// Experience - Purple to Blue gradient (matching Experience section)
const NavButtonExperience = styled(NavButtonBase)`
  background: linear-gradient(135deg,
    rgb(78, 58, 128) 0%,
    rgb(78, 58, 128) 10%,
    rgb(92, 74, 155) 32%,
    rgb(112, 95, 182) 54%,
    rgb(132, 127, 210) 78%,
    rgb(148, 180, 243) 100%);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
`;

// Projects - Light Blue Sky gradient (more blue, less white - matching Projects section)
const NavButtonProjects = styled(NavButtonBase)`
  background: linear-gradient(135deg,
    rgb(120, 165, 234) 0%,
    rgb(106, 158, 232) 25%,
    rgb(95, 157, 236) 50%,
    rgb(83, 158, 237) 75%,
    rgb(71, 160, 238) 100%);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
`;

// Skills - Bright Blue Sky gradient (matching Skills section)
const NavButtonSkills = styled(NavButtonBase)`
  background: linear-gradient(135deg,
    rgb(71, 160, 238) 0%,
    rgb(80, 170, 242) 25%,
    rgb(90, 180, 246) 50%,
    rgb(115, 205, 255) 75%,
    rgb(135, 225, 255) 100%);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
`;

// About - Darker underwater theme with bubbles
const NavButtonAbout = styled(NavButtonBase)`
  background: linear-gradient(135deg,
    rgb(18, 66, 114) 0%,
    rgb(23, 82, 126) 20%,
    rgb(29, 98, 138) 40%,
    rgb(36, 114, 150) 60%,
    rgb(44, 130, 162) 75%,
    rgb(54, 146, 174) 90%,
    rgb(60, 154, 180) 100%);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
`;

// Helper function to get the right button variant
const getNavButtonVariant = (sectionId) => {
  switch(sectionId) {
    case 'who-i-am': return NavButtonWhoIAm;
    case 'experience': return NavButtonExperience;
    case 'projects': return NavButtonProjects;
    case 'skills': return NavButtonSkills;
    case 'about': return NavButtonAbout;
    default: return NavButtonBase;
  }
};

const NavButtonIcon = styled.span`
  font-size: 1.1rem;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
  z-index: 2;
  position: relative;
  
  @media (max-width: 900px) {
    font-size: 1rem;
  }
`;

const NavButtonText = styled.span`
  font: inherit;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  z-index: 2;
  position: relative;
  
  @media (max-width: 900px) {
    display: none;
  }
`;

// Background components for each section
const NavButtonBackgroundWhoIAm = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.4;
  border-radius: 50px;
  pointer-events: none;
  
  /* Starry background */
  &::before,
  &::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: ${starTwinkleHero} 4s ease-in-out infinite;
  }
  
  &::before {
    width: 3px;
    height: 3px;
    top: 20%;
    left: 15%;
    animation-delay: 0s;
    box-shadow: 
      0 0 6px rgba(255, 255, 255, 0.8),
      0 0 12px rgba(255, 255, 255, 0.4);
  }
  
  &::after {
    width: 2.5px;
    height: 2.5px;
    top: 70%;
    right: 20%;
    animation-delay: 2s;
    box-shadow: 
      0 0 5px rgba(255, 255, 255, 0.8),
      0 0 10px rgba(255, 255, 255, 0.4);
  }
  
  background-image: 
    radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.9) 1px, transparent 1px),
    radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
    radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 100% 100%;
  animation: ${starField} 8s ease-in-out infinite;
`;

// Wave SVG container
const WaveSVGContainer = styled.svg`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 60%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
  overflow: visible;
`;

// Experience background wrapper
const ExperienceBGWrap = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  border-radius: 50px;
  pointer-events: none;
  overflow: hidden;
  
  /* Aurora glow effect - breathing background */
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    left: 0;
    right: 0;
    height: 50%;
    z-index: 1;
    background: radial-gradient(
      ellipse at 50% 50%,
      rgba(100, 255, 200, 0.25) 0%,
      rgba(150, 120, 255, 0.2) 30%,
      rgba(255, 150, 200, 0.15) 60%,
      transparent 100%
    );
    filter: blur(20px);
    mix-blend-mode: screen;
    animation: ${starTwinkleHero} 10s ease-in-out infinite;
  }
`;

// Static wave path component (no animation)
const WavePath = styled.path`
  /* No animation - static wave shape */
`;

// Experience background component with SVG wave
function NavButtonBackgroundExperience() {
  // Generate wave path for pill size - use viewBox that scales
  const wavePath = useMemo(() => {
    // Use a reasonable width that will scale with the SVG viewBox
    return generatePillWavePath(200, 30, 8, 3, 0, 6);
  }, []);

  // Generate second wave with slight phase offset for depth
  const wavePath2 = useMemo(() => {
    return generatePillWavePath(200, 30, 7, 3, Math.PI / 4, 5);
  }, []);

  return (
    <ExperienceBGWrap>
      <WaveSVGContainer
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="expWaveGrad1" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(80, 255, 180, 0.85)" />
            <stop offset="33%" stopColor="rgba(150, 120, 255, 0.8)" />
            <stop offset="66%" stopColor="rgba(255, 150, 200, 0.82)" />
            <stop offset="100%" stopColor="rgba(110, 255, 190, 0.85)" />
          </linearGradient>
          <linearGradient id="expWaveGrad2" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="rgba(80, 255, 180, 0.7)" />
            <stop offset="33%" stopColor="rgba(150, 120, 255, 0.65)" />
            <stop offset="66%" stopColor="rgba(255, 150, 200, 0.68)" />
            <stop offset="100%" stopColor="rgba(110, 255, 190, 0.7)" />
          </linearGradient>
          <filter id="waveBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        {/* Main wave */}
        <WavePath
          d={wavePath}
          fill="url(#expWaveGrad1)"
          filter="url(#waveBlur)"
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Secondary wave for depth */}
        <WavePath
          d={wavePath2}
          fill="url(#expWaveGrad2)"
          filter="url(#waveBlur)"
          style={{ mixBlendMode: 'screen', opacity: 0.6 }}
        />
      </WaveSVGContainer>
    </ExperienceBGWrap>
  );
}

const NavButtonBackgroundProjects = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.35;
  border-radius: 50px;
  pointer-events: none;
  overflow: hidden;
  
  /* Clouds overlay */
  background-repeat: no-repeat;
  background-image: 
    url(${cloud1Img}),
    url(${cloud2Img}),
    url(${cloud3Img});
  animation: ${cloudDrift} 10s ease-in-out infinite;
  background-position: 10% 30%, 60% 50%, 85% 20%;
  background-size: 20px 12px, 18px 10px, 22px 14px;
  
  /* Subtle sun glow */
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    right: 15%;
    width: 30%;
    height: 30%;
    background: radial-gradient(circle, 
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 255, 255, 0.2) 40%,
      transparent 70%);
    border-radius: 50%;
    animation: ${sunGlow} 4s ease-in-out infinite;
  }
`;

const NavButtonBackgroundSkills = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.25;
  border-radius: 50px;
  pointer-events: none;
  overflow: hidden;
  
  /* Tiny skyline - buildings as rectangles */
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35%;
    background-image: 
      /* Building 1 - tallest */
      linear-gradient(to top, 
        rgba(80, 100, 130, 0.6) 0%,
        rgba(80, 100, 130, 0.6) 100%),
      /* Building 2 - medium */
      linear-gradient(to top, 
        rgba(90, 110, 140, 0.5) 0%,
        rgba(90, 110, 140, 0.5) 100%),
      /* Building 3 - short */
      linear-gradient(to top, 
        rgba(100, 120, 150, 0.4) 0%,
        rgba(100, 120, 150, 0.4) 100%),
      /* Building 4 - tall */
      linear-gradient(to top, 
        rgba(85, 105, 135, 0.55) 0%,
        rgba(85, 105, 135, 0.55) 100%),
      /* Building 5 - medium */
      linear-gradient(to top, 
        rgba(95, 115, 145, 0.45) 0%,
        rgba(95, 115, 145, 0.45) 100%);
    background-size: 
      14% 100%,  /* Building 1 width and height */
      12% 75%,   /* Building 2 */
      10% 50%,   /* Building 3 */
      13% 90%,   /* Building 4 */
      11% 65%;   /* Building 5 */
    background-position: 
      2% bottom,    /* Building 1 - closer together */
      18% bottom,   /* Building 2 - closer together */
      35% bottom,   /* Building 3 - closer together */
      52% bottom,   /* Building 4 - closer together */
      70% bottom;   /* Building 5 - closer together */
    background-repeat: no-repeat;
  }
  
  /* Building windows detail - simple grid pattern */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35%;
    opacity: 0.4;
    background-image: 
      /* Window dots for all buildings - adjusted positions */
      radial-gradient(circle at 5% 70%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 9% 50%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 7% 30%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 21% 65%, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
      radial-gradient(circle at 19% 40%, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
      radial-gradient(circle at 38% 55%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
      radial-gradient(circle at 36% 35%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
      radial-gradient(circle at 55% 75%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 57% 50%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 59% 30%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
      radial-gradient(circle at 73% 60%, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
      radial-gradient(circle at 75% 35%, rgba(255, 255, 255, 0.25) 1px, transparent 1px);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
`;

const NavButtonBackgroundAbout = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  border-radius: 50px;
  pointer-events: none;
  overflow: hidden;
  
  /* Floating bubbles - similar to About.jsx underwater particles */
  background-image:
    /* Multiple bubbles at different positions */
    radial-gradient(circle at 12% 20%, rgba(255,255,255,0.2) 0%, transparent 2px),
    radial-gradient(circle at 38% 35%, rgba(255,255,255,0.15) 0%, transparent 2.5px),
    radial-gradient(circle at 65% 15%, rgba(255,255,255,0.18) 0%, transparent 2px),
    radial-gradient(circle at 85% 45%, rgba(255,255,255,0.12) 0%, transparent 1.5px),
    radial-gradient(circle at 22% 60%, rgba(255,255,255,0.16) 0%, transparent 2px),
    radial-gradient(circle at 55% 70%, rgba(255,255,255,0.14) 0%, transparent 1.8px),
    radial-gradient(circle at 78% 55%, rgba(255,255,255,0.13) 0%, transparent 2.2px),
    radial-gradient(circle at 42% 25%, rgba(255,255,255,0.17) 0%, transparent 2px),
    radial-gradient(circle at 8% 50%, rgba(255,255,255,0.11) 0%, transparent 1.5px),
    radial-gradient(circle at 68% 75%, rgba(255,255,255,0.13) 0%, transparent 2px),
    radial-gradient(circle at 30% 80%, rgba(255,255,255,0.10) 0%, transparent 2.5px),
    radial-gradient(circle at 90% 30%, rgba(255,255,255,0.08) 0%, transparent 2px),
    radial-gradient(circle at 15% 85%, rgba(255,255,255,0.07) 0%, transparent 1.8px),
    radial-gradient(circle at 75% 65%, rgba(255,255,255,0.06) 0%, transparent 1.5px);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: ${floatParticles} 15s ease-in-out infinite;
  transform: translateZ(0);
  will-change: transform, opacity;
`;

// Helper function to get the right background component
const getNavButtonBackground = (sectionId) => {
  switch(sectionId) {
    case 'who-i-am': return NavButtonBackgroundWhoIAm;
    case 'experience': return NavButtonBackgroundExperience;
    case 'projects': return NavButtonBackgroundProjects;
    case 'skills': return NavButtonBackgroundSkills;
    case 'about': return NavButtonBackgroundAbout;
    default: return null;
  }
};

// Side Navbar Wrapper for proper transform layering
const SideNavbarWrapper = styled.div`
  position: fixed;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* When collapsed, slide mostly off-screen but leave a portion visible (empty pill appearance) */
  /* Leave about 30% of the pill visible (the right side) */
  transform: translateY(-50%) translateX(${props => props.$isCollapsed ? 'calc(-70% - 1.5rem)' : '0'});
  
  @media (max-width: 900px) {
    left: 1rem;
    transform: translateY(-50%) translateX(${props => props.$isCollapsed ? 'calc(-70% - 1rem)' : '0'});
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Side Navbar Motion Container - wraps both toggle button and container
// This ensures they animate together when sliding out
const SideNavbarMotionContainer = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  /* Ensure container wraps both toggle button and navbar pill */
  width: fit-content;
  height: fit-content;
`;

// Side Pill Navbar Container - floating pill disconnected from edge
const SideNavbarContainer = styled.nav`
  position: relative;
  z-index: 1;
  
  /* Enhanced glass morphism effect - matching toggle button exactly */
  background: linear-gradient(
    135deg,
    rgba(13, 7, 27, 0.6) 0%,
    rgba(20, 12, 35, 0.5) 50%,
    rgba(13, 7, 27, 0.6) 100%
  );
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  
  
  /* Full pill shape - fully rounded, disconnected from edge */
  border-radius: 50px;
  padding: 1.5rem 0.75rem;
  
  /* No transform here - handled by motion container */
  
  /* GPU acceleration */
  will-change: transform, opacity;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// Side Nav Content
const SideNavContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  opacity: ${props => props.$isCollapsed ? '0' : '1'};
  pointer-events: ${props => props.$isCollapsed ? 'none' : 'auto'};
  transition: opacity 0.3s ease;
`;

// Base Side Nav Button - shared styles
const SideNavButtonBase = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  /* GPU acceleration */
  transform: translateZ(0);
  will-change: border-color, box-shadow;
  
  /* Subtle base glow */
  box-shadow: none;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
  }
  
  &:active {
    transition: all 0.1s ease;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

// Who I Am - Space/Star theme
const SideNavButtonWhoIAm = styled(SideNavButtonBase)`
  background: linear-gradient(135deg,
    rgb(13, 7, 27) 0%,
    rgb(30, 20, 55) 40%,
    rgb(45, 30, 80) 70%,
    rgb(85, 60, 135) 95%,
    rgb(100, 70, 150) 100%);
`;

// Experience - Purple to Blue gradient
const SideNavButtonExperience = styled(SideNavButtonBase)`
  background: linear-gradient(135deg,
    rgb(78, 58, 128) 0%,
    rgb(78, 58, 128) 10%,
    rgb(92, 74, 155) 32%,
    rgb(112, 95, 182) 54%,
    rgb(132, 127, 210) 78%,
    rgb(148, 180, 243) 100%);
`;

// Projects - Light Blue Sky gradient
const SideNavButtonProjects = styled(SideNavButtonBase)`
  background: linear-gradient(135deg,
    rgb(120, 165, 234) 0%,
    rgb(106, 158, 232) 25%,
    rgb(95, 157, 236) 50%,
    rgb(83, 158, 237) 75%,
    rgb(71, 160, 238) 100%);
`;

// Skills - Bright Blue Sky gradient
const SideNavButtonSkills = styled(SideNavButtonBase)`
  background: linear-gradient(135deg,
    rgb(71, 160, 238) 0%,
    rgb(80, 170, 242) 25%,
    rgb(90, 180, 246) 50%,
    rgb(115, 205, 255) 75%,
    rgb(135, 225, 255) 100%);
`;

// About - Darker underwater theme
const SideNavButtonAbout = styled(SideNavButtonBase)`
  background: linear-gradient(135deg,
    rgb(18, 66, 114) 0%,
    rgb(23, 82, 126) 20%,
    rgb(29, 98, 138) 40%,
    rgb(36, 114, 150) 60%,
    rgb(44, 130, 162) 75%,
    rgb(54, 146, 174) 90%,
    rgb(60, 154, 180) 100%);
`;

// Helper function to get the right side nav button variant
const getSideNavButtonVariant = (sectionId) => {
  switch(sectionId) {
    case 'who-i-am': return SideNavButtonWhoIAm;
    case 'experience': return SideNavButtonExperience;
    case 'projects': return SideNavButtonProjects;
    case 'skills': return SideNavButtonSkills;
    case 'about': return SideNavButtonAbout;
    default: return SideNavButtonBase;
  }
};

// Chevron SVG component (from WhoIAm.jsx) - positioned to be fully visible in half circle
const ChevronRight = styled.svg`
  width: 20px;
  height: 20px;
  viewBox: 0 0 24 24;
  fill: none;
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  display: block;
  flex-shrink: 0;
  /* Shift chevron to the right so it's fully visible in the half circle */
  margin-left: 17.5px;
`;

// Toggle Button - Pure half circle hump attached to pill's right side
const ToggleButton = styled.button`
  position: absolute;
  right: -26.5px;
  top: 50%;
  transform: translateY(-50%);
  width: 55px;
  height: 50px;
  z-index: 3;
  
  /* Exact same glass morphism as SideNavbarContainer - seamless connection */
  background: linear-gradient(
    135deg,
    rgba(13, 7, 27, 0.6) 0%,
    rgba(20, 12, 35, 0.5) 50%,
    rgba(13, 7, 27, 0.6) 100%
  );
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  
  /* Match border styling exactly - no left border for seamless connection */
  border: 1px solid rgba(255, 255, 255, 0.0);
  border-left: none;
  
  /* Pure half circle using clip-path - only show right half */
  clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
  border-radius: 50%;
  
  /* Match exact box-shadow from container */
  box-shadow: 
    inset -2px 0 8px rgba(255, 255, 255, 0.1);
  
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8px;
  
  /* Ensure no overflow creates rectangular appearance */
  overflow: hidden;
  
  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Visibility based on scroll state - opacity handled by parent motion container */
  /* Only handle pointer-events here, opacity animation is on parent */
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
  
  /* Color for chevron */
  color: rgba(255, 255, 255, 0.9);
  
  /* GPU acceleration */
  will-change: transform, opacity;
  
  &:hover {
    /* Slightly brighter on hover but maintain same structure */
    background: linear-gradient(
      135deg,
      rgba(20, 12, 35, 0.65) 0%,
      rgba(25, 18, 42, 0.55) 50%,
      rgba(20, 12, 35, 0.65) 100%
    );
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 1);
  }
  
  &:active {
    transition: all 0.1s ease;
    transform: translateY(-50%) translateX(-2px);
  }

  @media (max-width: 900px) {
    width: 44px;
    height: 44px;
    right: -22px;
    padding-left: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: translateY(-50%);
    }
  }
`;

const SideNavIcon = styled.span`
  font-size: 1.5rem;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
  z-index: 1;
  position: relative;
`;

const ActiveIndicator = styled.div`
  position: absolute;
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  background: linear-gradient(to bottom, 
    rgba(100, 150, 255, 1),
    rgba(150, 200, 255, 0.8));
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 10px rgba(100, 150, 255, 0.8);
  animation: ${starTwinkle} 2s ease-in-out infinite;
`;

export default Navbar;

