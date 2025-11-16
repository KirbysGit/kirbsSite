// navbar.jsx

// main navbar component, used for navigation and smooth scrolling.
// also we have the sidebar component in here as well, which follows the user down the site.

// imports.
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// utils.
import { navItems } from './NavbarConfig';
import { scrollToSection } from '../../utils/scrollToSection';

// images.
import fullLogo from '@/images/0navbar/navLogo.png';
import cloud1Img from '@/images/3experience/clouds/cloud1.png';
import cloud2Img from '@/images/3experience/clouds/cloud2.png';
import cloud3Img from '@/images/3experience/clouds/cloud3.png';

/* ================= helper functions & components ================= */

// generate wave path for pill-sized sinusoidal wave.
function generatePillWavePath(width = 200, height = 30, amplitude = 8, frequency = 3, phase = 0, thickness = 6) {

	// calculate the step size.
	const step = width / (frequency * 20);

	// arrays for top and bottom waves.
	const top = [];
	const bottom = [];
	
	// generate top wave.
	for (let x = 0; x <= width; x += step) {
		const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude;
		top.push({ x, y });
	}
	
	// generate bottom wave.
	for (let x = width; x >= 0; x -= step) {
		const y = height/2 + Math.sin((x / width) * frequency * 2 * Math.PI + phase) * amplitude + thickness;
		bottom.push({ x, y });
	}
	
	// build the path.
	let d = `M${top[0].x},${top[0].y}`;
	for (let i = 1; i < top.length; i++) d += ` L${top[i].x},${top[i].y}`;
	for (let i = 0; i < bottom.length; i++) d += ` L${bottom[i].x},${bottom[i].y}`;
	return d + ' Z';
}

// helper function to get the right background component.
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

// helper function to get the right button variant.
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

// helper function to get the right tooltip variant.
const getTooltipVariant = (sectionId) => {
	switch(sectionId) {
	  case 'who-i-am': return TooltipWhoIAm;
	  case 'experience': return TooltipExperience;
	  case 'projects': return TooltipProjects;
	  case 'skills': return TooltipSkills;
	  case 'about': return TooltipAbout;
	  default: return TooltipBase;
	}
};

// tooltip component that uses the correct variant.
const TooltipVariant = ({ sectionId, className, children }) => {
	const TooltipComponent = getTooltipVariant(sectionId);
	return <TooltipComponent className={className}>{children}</TooltipComponent>;
};

// helper function to get the right side nav button variant.
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

/* ================== main component ================== */

const Navbar = ({ loadingCompleteTime = null }) => {

	const [isMounted, setIsMounted] = useState(false);						// state for if navbar is mounted.	
	const [lastScrollY, setLastScrollY] = useState(0);						// state for last scroll position.
	const [activeSection, setActiveSection] = useState('hero');				// state for active section.
	const [isTopNavbarVisible, setIsTopNavbarVisible] = useState(true);		// state for if top navbar is visible.
	const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);	// state for if user has scrolled past hero.
	const [isSideNavCollapsed, setIsSideNavCollapsed] = useState(false);	// state for if side navbar is collapsed.

	// mount navbar after hero animations complete - timing relative to loading completion.
	useEffect(() => {
		if (!loadingCompleteTime) return;								// wait for loading to complete.
		const heroAnimationDuration = 7000;								// how long the hero animation takes.
		const mountTime = loadingCompleteTime + heroAnimationDuration;	// when the navbar should mount.
		const now = performance.now();									// now.
		const delay = Math.max(0, mountTime - now);						// delay based on the mount time and now.
		const timeoutId = setTimeout(() => setIsMounted(true), delay);	// set the navbar to mounted after the delay.
		return () => clearTimeout(timeoutId);							// cleanup: clear timeout on unmount.
	}, [loadingCompleteTime]);

	// detect scroll direction and hero visibility.
	useEffect(() => {
		if (!isMounted) return;
		
		// handle scroll.
		const handleScroll = () => {
			const currentScrollY = window.scrollY;					// current scroll position.
			const heroElement = document.getElementById('hero');	// set hero element.
			
			if (!heroElement) return;								// if hero element is not found, return.	

			const heroRect = heroElement.getBoundingClientRect();	// get the bounding client rect of the hero element.
			const heroTop = heroRect.top;							// get the top of the hero element.
			const heroBottom = heroRect.bottom;						// get the bottom of the hero element.
			
			const HIDE_THRESHOLD = 150;								// hide navbar threshold when hero top is within this distance from viewport top.
			
			const isAtTopOfPage = currentScrollY < 50;				// check if hero is at top of page.

			const heroFullyInView = (heroTop >= HIDE_THRESHOLD || isAtTopOfPage) && heroBottom > 0;	// check if hero is fully in view.

			const shouldShowSideNav = !heroFullyInView;				// check if the side navbar should be shown.

			setIsScrolledPastHero(shouldShowSideNav);				// set the state for if the user has scrolled past the hero.

			if (heroFullyInView) {									// if hero is visible.
				setIsTopNavbarVisible(true);						// show the top navbar.
			} else {												// if hero is not visible.
				setIsTopNavbarVisible(false);						// hide the top navbar.
			}

			setLastScrollY(currentScrollY);							// set the last scroll position.

			// detect active section based on scroll position.
			const sections = ['hero', 'who-i-am', 'experience', 'projects', 'skills', 'about'];
			const scrollPosition = currentScrollY + window.innerHeight / 3;

			// detect active section based on scroll position.
			// basically we're checking if the scroll position is greater than the section top.
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

		// throttle scroll listener for performance.
		// basically, only handle scroll once per animation frame.
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

		// add the scroll listener.
    	window.addEventListener('scroll', throttledScroll, { passive: true });
		// run the initial check.
		handleScroll();

		// on dismount, remove the scroll listener.
    	return () => {
      		window.removeEventListener('scroll', throttledScroll);
    	};
  	}, [lastScrollY, isMounted]);

  // handle navigation click.
	const handleNavClick = useCallback((sectionId, desktopOffset, mobileOffset) => {
		scrollToSection(sectionId, desktopOffset, mobileOffset);
	}, []);

  	// handle scroll to top.
	const handleScrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);

	// top navbar animation config.
	const topNavbarConfig = useMemo(() => ({
		initial: { y: '-100%', opacity: 0 },
		animate: { y: isTopNavbarVisible ? '0%' : '-100%', opacity: isTopNavbarVisible ? 1 : 0 },
		transition: { duration: 0.4, ease: 'easeInOut' }
	}), [isTopNavbarVisible]);

  // side pill navbar animation config.
	const sideNavbarConfig = useMemo(() => ({
		initial: { x: '-100%', opacity: 0 },
		animate: { x: isScrolledPastHero ? '0%' : '-100%', opacity: isScrolledPastHero ? 1 : 0 },
		transition: { duration: 0.5, ease: 'easeOut' }
	}), [isScrolledPastHero]);

	// if the navbar is not mounted, return null.
	if (!isMounted) return null;

	return (
		<>
			{/* top navbar */}
			<TopNavbarContainer
				{...topNavbarConfig}
				style={{ 
				pointerEvents: isTopNavbarVisible ? 'auto' : 'none',
				visibility: isTopNavbarVisible ? 'visible' : 'hidden'
				}}
			>
				<TopNavbarContent>
					{/* logo container */}
					<LogoContainer onClick={handleScrollToTop}>
						<LogoImage src={fullLogo} alt="Colin Kirby" />
					</LogoContainer>

					{/* navigation buttons (all the pills)*/}
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

					{/* social links (linkedin, github, resume) */}
					<SocialLinksContainer>
						{/* linkedin */}
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
						
						{/* github */}
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
						
						{/* resume */}
						<SocialLink
							href="/my_resume.pdf"
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

			{/* side pill navbar */}
			<SideNavbarWrapper $isCollapsed={isSideNavCollapsed}>
				{/* toggle button & navbar content*/}
				<SideNavbarMotionContainer
					{...sideNavbarConfig}
					style={{
						pointerEvents: isScrolledPastHero ? 'auto' : 'none',
						visibility: isScrolledPastHero ? 'visible' : 'hidden'
					}}
				>
					{/* toggle button - half circle hump attached to pill */}
					<ToggleButton
						onClick={() => setIsSideNavCollapsed(!isSideNavCollapsed)}
						$isVisible={isScrolledPastHero}
					>
						<ChevronRight as="svg" aria-hidden="true">
							<polyline points="9 18 15 12 9 6" />
						</ChevronRight>
					</ToggleButton>
					
					{/* side navbar container - the circle w/ emojis */}
					<SideNavbarContainer
						$isCollapsed={isSideNavCollapsed}
					>
						<SideNavContent $isCollapsed={isSideNavCollapsed}>
							{navItems.map((item) => {
							const SideNavButtonVariant = getSideNavButtonVariant(item.id);
							return (
								<SideNavButtonWrapper key={item.id}>
									{/* side nav button variants */}
									<SideNavButtonVariant
										onClick={() => handleNavClick(item.id, item.desktopOffset, item.mobileOffset)}
										$isActive={activeSection === item.id}
									>
										<SideNavIcon>{item.icon}</SideNavIcon>
										{activeSection === item.id && <ActiveIndicator />}
									</SideNavButtonVariant>
									{/* customized tooltip */}
									<TooltipVariant sectionId={item.id} className="tooltip">{item.label}</TooltipVariant>
								</SideNavButtonWrapper>
							);
							})}
						</SideNavContent>
					</SideNavbarContainer>
				</SideNavbarMotionContainer>
			</SideNavbarWrapper>
		</>
	);
};

export default Navbar;

/* ================= animated frames ================= */

// cloud drift animation. ( in projects pill )
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

// star field animation. ( in who i am pill )
const starField = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
`;

// floating bubbles animation. ( in about section )
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

// star twinkle animation for hero section.
const starTwinkleHero = keyframes`
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1); 
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2); 
  }
`;

// star twinkle animation.
const starTwinkle = keyframes`
  0%, 100% { 
    opacity: 0.4; 
  }
  50% { 
    opacity: 1; 
  }
`;

/* ====================== styled ====================== */

const TopNavbarContainer = styled(motion.nav)`
    /* layout */
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
	position: fixed;
    transform: translateZ(0);
    will-change: transform, opacity;
    
    /* spacing */
    width: 100%;
    
    /* styles */
	backdrop-filter: blur(30px) saturate(200%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    background: linear-gradient( 135deg,
        rgba(13, 7, 27, 0.5) 0%,
        rgba(20, 12, 35, 0.4) 50%,
        rgba(13, 7, 27, 0.5) 100%
    );
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 0 20px rgba(100, 150, 255, 0.1);
    
    /* media queries */
    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

const TopNavbarContent = styled.div`
    /* layout */
	z-index: 1;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    
    /* spacing */
    max-width: 100%;
    padding: 1rem 2rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        padding: 0.875rem 1.5rem;
    }
    
    @media (max-width: 900px) {
        justify-content: center;
        padding: 0.875rem 1rem;
    }
`;

/* ============ logo ============ */

const LogoContainer = styled.div`
    /* layout */
    position: absolute;
    left: 2rem;
    display: flex;
    align-items: center;
    
    /* spacing */
    height: 50px;
    
    /* styles */
    cursor: pointer;
    
    /* media queries */
    @media (max-width: 1600px) {
        left: 1.5rem;
        height: 40px;
    }
    
    @media (max-width: 900px) {
        display: none;
    }
`;

const LogoImage = styled.img`
    /* layout */
    width: auto;
    height: 100%;
    object-fit: contain;
    
    /* styles */
	transition: all 0.3s ease;
    filter: drop-shadow(0 0 10px rgba(150, 200, 255, 0.3));
    
    /* hover styles */
    ${LogoContainer}:hover & {
        filter: drop-shadow(0 0 20px rgba(150, 200, 255, 0.8)) drop-shadow(0 0 30px rgba(100, 150, 255, 0.6));
        transform: scale(1.05);
    }
`;

/* ======== social links ======== */

const SocialLinksContainer = styled.div`
    /* layout */
    position: absolute;
    right: 2rem;
    display: flex;
    align-items: center;
    
    /* spacing */
    gap: 0.75rem;
    height: 50px;
    
    /* media queries */
    @media (max-width: 1600px) {
        right: 1.5rem;
        gap: 0.625rem;
        height: 40px;
    }
    
    @media (max-width: 900px) {
        display: none;
    }
`;

const SocialLink = styled.a`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateZ(0);
    will-change: border-color, box-shadow;
    
    /* spacing */
    width: 40px;
    height: 40px;
    
    /* styles */
	color: white;
    cursor: pointer;
    box-shadow: none;
    border-radius: 50%;
	text-decoration: none;
	background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        border-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
    }
    
    &:active {
        transition: all 0.1s ease;
    }
    
    /* media queries */
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

const SocialIcon = styled.svg`
    /* spacing */
    width: 20px;
    height: 20px;
    
    /* styles */
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
    
    /* media queries */
    @media (max-width: 1600px) {
        width: 18px;
        height: 18px;
    }
`;

/* ======== nav. buttons ======== */

const NavButtonsContainer = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    
    /* spacing */
    gap: 1rem;
    
    /* media queries */
    @media (max-width: 1600px) {
        gap: 0.75rem;
    }

    @media (max-width: 900px) {
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        gap: 0.5rem;
    }
`;

// base nav button - shared styles.
const NavButtonBase = styled.button`
    /* layout */
    display: flex;
	overflow: hidden;
    position: relative;
    align-items: center;
    transform: translateZ(0);
    will-change: border-color, box-shadow, transform;
    
    /* spacing */
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    
    /* styles */
    font: inherit;
    color: white;
    cursor: pointer;
	font-weight: 500;
    box-shadow: none;
    font-size: 0.95rem;
	border-radius: 50px;
	border: 1px solid rgba(255, 255, 255, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        border-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
    }
    
    &:active {
        transition: all 0.1s ease;
    }
    
    /* media queries */
    @media (max-width: 900px) {
        justify-content: center;
        min-width: 40px;
        width: 40px;
        height: 40px;
        padding: 0.4rem 0.75rem;
        border-radius: 50%;
        font-size: 0.8rem;
        gap: 0.3rem;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
        
        &:hover {
            transform: none;
        }
    }
`;

// who i am - space / star theme.
const NavButtonWhoIAm = styled(NavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(13, 7, 27) 0%,
        rgb(30, 20, 55) 40%,
        rgb(45, 30, 80) 70%,
        rgb(85, 60, 135) 95%,
        rgb(100, 70, 150) 100%);
    
    /* hover effects */
    &:hover {
        border-color: rgba(100, 70, 150, 0.9);
        transform: translateZ(0) scale(1.05);
        box-shadow: 0 0 20px rgba(100, 70, 150, 0.5),
                    0 0 40px rgba(85, 60, 135, 0.3);
    }
`;

// experience - upper atmosphere theme.
const NavButtonExperience = styled(NavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(78, 58, 128) 0%,
        rgb(78, 58, 128) 10%,
        rgb(92, 74, 155) 32%,
        rgb(112, 95, 182) 54%,
        rgb(132, 127, 210) 78%,
        rgb(148, 180, 243) 100%);
    
    /* hover effects */
    &:hover {
        border-color: rgba(148, 180, 243, 0.9);
        transform: translateZ(0) scale(1.05);
        box-shadow: 0 0 20px rgba(148, 180, 243, 0.5),
                    0 0 40px rgba(132, 127, 210, 0.3);
    }
`;

// projects - light blue sky theme.
const NavButtonProjects = styled(NavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(120, 165, 234) 0%,
        rgb(106, 158, 232) 25%,
        rgb(95, 157, 236) 50%,
        rgb(83, 158, 237) 75%,
        rgb(71, 160, 238) 100%);
    
    /* hover effects */
    &:hover {
        border-color: rgba(120, 165, 234, 0.9);
        transform: translateZ(0) scale(1.05);
        box-shadow: 0 0 20px rgba(120, 165, 234, 0.5),
                    0 0 40px rgba(95, 157, 236, 0.3);
    }
`;

// skills - bright blue sky theme.
const NavButtonSkills = styled(NavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(71, 160, 238) 0%,
        rgb(80, 170, 242) 25%,
        rgb(90, 180, 246) 50%,
        rgb(115, 205, 255) 75%,
        rgb(135, 225, 255) 100%);
    
    /* hover effects */
    &:hover {
        border-color: rgba(135, 225, 255, 0.9);
        transform: translateZ(0) scale(1.05);
        box-shadow: 0 0 20px rgba(135, 225, 255, 0.5),
                    0 0 40px rgba(115, 205, 255, 0.3);
    }
`;

// about - darker underwater theme with bubbles.
const NavButtonAbout = styled(NavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(18, 66, 114) 0%,
        rgb(23, 82, 126) 20%,
        rgb(29, 98, 138) 40%,
        rgb(36, 114, 150) 60%,
        rgb(44, 130, 162) 75%,
        rgb(54, 146, 174) 90%,
        rgb(60, 154, 180) 100%);
    
    /* hover effects */
    &:hover {
        border-color: rgba(60, 154, 180, 0.9);
        transform: translateZ(0) scale(1.05);
        box-shadow: 0 0 20px rgba(60, 154, 180, 0.5),
                    0 0 40px rgba(44, 130, 162, 0.3);
    }
`;

const NavButtonIcon = styled.span`
    /* layout */
    z-index: 2;
	position: relative;
    
    /* styles */
    font-size: 1.1rem;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
    
    /* media queries */
    @media (max-width: 900px) {
        font-size: 0.9rem;
    }
`;

const NavButtonText = styled.span`
    /* layout */
    z-index: 2;
	position: relative;
    
    /* styles */
    font: inherit;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    
    /* media queries */
    @media (max-width: 900px) {
        display: none;
    }
`;

/* ======== background components per nav button ======== */
const NavButtonBackgroundWhoIAm = styled.div`
    /* layout */
    inset: 0;
	position: absolute;
    pointer-events: none;
    
    /* styles */
    opacity: 0.4;
    border-radius: 50px;
    background-image: 
        radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.9) 1px, transparent 1px),
        radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.7) 1px, transparent 1px),
        radial-gradient(circle at 60% 80%, rgba(255, 255, 255, 0.8) 1px, transparent 1px);
    background-size: 100% 100%, 100% 100%, 100% 100%;
    animation: ${starField} 8s ease-in-out infinite;
    
    /* pseudo-elements (stars in the background) */
    &::before,
    &::after {
        content: '';
        position: absolute;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        animation: ${starTwinkleHero} 4s ease-in-out infinite;
    }
    
    &::before {
        top: 20%;
        left: 15%;
        width: 3px;
        height: 3px;
        animation-delay: 0s;
        box-shadow: 
            0 0 6px rgba(255, 255, 255, 0.8),
            0 0 12px rgba(255, 255, 255, 0.4);
    }
    
    &::after {
        top: 70%;
        right: 20%;
        width: 2.5px;
        height: 2.5px;
        animation-delay: 2s;
        box-shadow: 
            0 0 5px rgba(255, 255, 255, 0.8),
            0 0 10px rgba(255, 255, 255, 0.4);
    }
`;

// wave svg container.
const WaveSVGContainer = styled.svg`
    /* layout */
    left: 0;
	top: 50%;
	z-index: 2;
    overflow: visible;
	position: absolute;
	pointer-events: none;
    transform: translateY(-50%);
    
    /* spacing */
    width: 100%;
    height: 60%;
`;

/* ======== experience bg ======== */

// experience background wrapper.
const ExperienceBGWrap = styled.div`
    /* layout */
    inset: 0;
	overflow: hidden;
	position: absolute;
    pointer-events: none;
    
    /* styles */
    opacity: 0.6;
    border-radius: 50px;
    
    /* pseudo-elements (aurora effect) */
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
    }
`;

// static wave path component (no animation).
const WavePath = styled.path`
  /* no animation - static wave shape */
`;

// experience background component with svg wave.
function NavButtonBackgroundExperience() {
  // generate wave path for pill size - use viewBox that scales.
  const wavePath = useMemo(() => {
    // use a reasonable width that will scale with the svg viewBox.
    return generatePillWavePath(200, 30, 8, 3, 0, 6);
  }, []);

  // generate second wave with slight phase offset for depth.
  const wavePath2 = useMemo(() => {
    return generatePillWavePath(200, 30, 7, 3, Math.PI / 4, 5);
  }, []);

  return (
    <ExperienceBGWrap>
		{/* wave svg container */}
		<WaveSVGContainer
			viewBox="0 0 200 40"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			{/* defs for the waves */}
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
			{/* main wave */}
			<WavePath
				d={wavePath}
				fill="url(#expWaveGrad1)"
				filter="url(#waveBlur)"
				style={{ mixBlendMode: 'screen' }}
			/>
			{/* secondary wave for depth */}
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

/* ======== projects bg ======== */

const NavButtonBackgroundProjects = styled.div`
    /* layout */
    inset: 0;
	position: absolute;
    pointer-events: none;
    
    /* styles */
    opacity: 0.35;
    border-radius: 50px;
    
    /* clouds overlay */
  	background-repeat: no-repeat;
  	background-image: 
		url(${cloud1Img}),
		url(${cloud2Img}),
		url(${cloud3Img});
	animation: ${cloudDrift} 10s ease-in-out infinite;
	background-position: 10% 30%, 60% 50%, 85% 20%;
	background-size: 20px 12px, 18px 10px, 22px 14px;
`;

/* ======== skills bg ======== */

const NavButtonBackgroundSkills = styled.div`
    /* layout */
    inset: 0;
	overflow: hidden;
	position: absolute;
    pointer-events: none;
    
    /* styles */
    opacity: 0.25;
    border-radius: 50px;
    
    /* pseudo-elements (skyline buildings) */
    &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 35%;
        background-image: 
            linear-gradient(to top, 
                rgba(80, 100, 130, 0.6) 0%,
                rgba(80, 100, 130, 0.6) 100%),
            linear-gradient(to top, 
                rgba(90, 110, 140, 0.5) 0%,
                rgba(90, 110, 140, 0.5) 100%),
            linear-gradient(to top, 
                rgba(100, 120, 150, 0.4) 0%,
                rgba(100, 120, 150, 0.4) 100%),
            linear-gradient(to top, 
                rgba(85, 105, 135, 0.55) 0%,
                rgba(85, 105, 135, 0.55) 100%),
            linear-gradient(to top, 
                rgba(95, 115, 145, 0.45) 0%,
                rgba(95, 115, 145, 0.45) 100%);
        background-size: 
            14% 100%,
            12% 75%,
            10% 50%,
            13% 90%,
            11% 65%;
        background-position: 
            2% bottom,
            18% bottom,
            35% bottom,
            52% bottom,
            70% bottom;
        background-repeat: no-repeat;
    }
`;

/* ======== about bg ======== */

const NavButtonBackgroundAbout = styled.div`
    /* layout */
    inset: 0;
    overflow: hidden;
	position: absolute;
	pointer-events: none;
    transform: translateZ(0);
    will-change: transform, opacity;
    
    /* styles */
    opacity: 0.6;
    border-radius: 50px;
    background-image:
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
`;

/* ======== side navbar ======== */

const SideNavbarWrapper = styled.div`
    /* layout */
    top: 50%;
    z-index: 99;
	left: 1.5rem;
	position: fixed;
    transform: translateY(-50%) translateX(${props => props.$isCollapsed ? 'calc(-70% - 1.5rem)' : '0'});
    
    /* styles */
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* media queries */
    @media (max-width: 1000px) {
        display: none;
    }
    
    @media (max-width: 900px) {
        left: 1rem;
        transform: translateY(-50%) translateX(${props => props.$isCollapsed ? 'calc(-70% - 1rem)' : '0'});
    }
    
    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

// ensures toggle button and container animate together.
const SideNavbarMotionContainer = styled(motion.div)`
    /* layout */
    display: flex;
	position: relative;
    align-items: center;
    
    /* spacing */
    width: fit-content;
    height: fit-content;
`;

// floating pill disconnected from edge.
const SideNavbarContainer = styled.nav`
    /* layout */
    z-index: 10;
	position: relative;
    will-change: transform, opacity;
    
    /* spacing */
    padding: 1.5rem 0.75rem;
    
    /* styles */
    border-radius: 50px;
    background: linear-gradient(
        135deg,
        rgba(13, 7, 27, 0.6) 0%,
        rgba(20, 12, 35, 0.5) 50%,
        rgba(13, 7, 27, 0.6) 100%
    );
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.04),
                0 0 40px rgba(255, 255, 255, 0.02);
    
    /* media queries */
    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

// side nav content.
const SideNavContent = styled.div`
    /* layout */
    display: flex;
    align-items: center;
	flex-direction: column;
    pointer-events: ${props => props.$isCollapsed ? 'none' : 'auto'};
    
    /* spacing */
    gap: 1rem;
    
    /* styles */
    opacity: ${props => props.$isCollapsed ? '0' : '1'};
    transition: opacity 0.3s ease;
`;

// side nav button wrapper - for tooltip positioning.
const SideNavButtonWrapper = styled.div`
    /* layout */
    display: flex;
	position: relative;
    align-items: center;
    
    /* hover effects */
    &:hover .tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
    }
`;

/* ======== tooltips ======== */

const TooltipBase = styled.div`
    /* layout */
    z-index: 10000;
	position: absolute;
	pointer-events: none;
    left: calc(100% + 1rem);
	will-change: transform, opacity;
    transform: translateZ(0) translateX(-10px);
    
    /* spacing */
    padding: 0.5rem 0.875rem;
    
    /* styles */
    color: white;
	opacity: 0;
	font-weight: 500;
    border-radius: 8px;
	visibility: hidden;
    font-size: 0.875rem;
    white-space: nowrap;
	border: 1px solid rgba(255, 255, 255, 0.3);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        0 0 20px rgba(100, 150, 255, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* media queries */
    @media (prefers-reduced-motion: reduce) {
        transition: opacity 0.2s ease;
        transform: none;
    }
`;

// who i am tooltip - space/star theme.
const TooltipWhoIAm = styled(TooltipBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(13, 7, 27) 0%,
        rgb(30, 20, 55) 40%,
        rgb(45, 30, 80) 70%,
        rgb(85, 60, 135) 95%,
        rgb(100, 70, 150) 100%);
    
    /* pseudo-elements (arrow pointer) */
    &::before {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        width: 0;
        height: 0;
        transform: translateY(-50%);
        border-style: solid;
        border-width: 6px 8px 6px 0;
        border-color: transparent rgb(30, 20, 55) transparent transparent;
    }
`;

// experience tooltip - purple to blue gradient.
const TooltipExperience = styled(TooltipBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(78, 58, 128) 0%,
        rgb(78, 58, 128) 10%,
        rgb(92, 74, 155) 32%,
        rgb(112, 95, 182) 54%,
        rgb(132, 127, 210) 78%,
        rgb(148, 180, 243) 100%);
    
    /* pseudo-elements (arrow pointer) */
    &::before {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        width: 0;
        height: 0;
        transform: translateY(-50%);
        border-style: solid;
        border-width: 6px 8px 6px 0;
        border-color: transparent rgb(92, 74, 155) transparent transparent;
    }
`;

// projects tooltip - light blue sky gradient.
const TooltipProjects = styled(TooltipBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(120, 165, 234) 0%,
        rgb(106, 158, 232) 25%,
        rgb(95, 157, 236) 50%,
        rgb(83, 158, 237) 75%,
        rgb(71, 160, 238) 100%);
    
    /* pseudo-elements (arrow pointer) */
    &::before {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        width: 0;
        height: 0;
        transform: translateY(-50%);
        border-style: solid;
        border-width: 6px 8px 6px 0;
        border-color: transparent rgb(95, 157, 236) transparent transparent;
    }
`;

// skills tooltip - bright blue sky gradient.
const TooltipSkills = styled(TooltipBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(71, 160, 238) 0%,
        rgb(80, 170, 242) 25%,
        rgb(90, 180, 246) 50%,
        rgb(115, 205, 255) 75%,
        rgb(135, 225, 255) 100%);
    
    /* pseudo-elements (arrow pointer) */
    &::before {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        width: 0;
        height: 0;
        transform: translateY(-50%);
        border-style: solid;
        border-width: 6px 8px 6px 0;
        border-color: transparent rgb(90, 180, 246) transparent transparent;
    }
`;

// about tooltip - darker underwater theme.
const TooltipAbout = styled(TooltipBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(18, 66, 114) 0%,
        rgb(23, 82, 126) 20%,
        rgb(29, 98, 138) 40%,
        rgb(36, 114, 150) 60%,
        rgb(44, 130, 162) 75%,
        rgb(54, 146, 174) 90%,
        rgb(60, 154, 180) 100%);
    
    /* pseudo-elements (arrow pointer) */
    &::before {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        width: 0;
        height: 0;
        transform: translateY(-50%);
        border-style: solid;
        border-width: 6px 8px 6px 0;
        border-color: transparent rgb(29, 98, 138) transparent transparent;
    }
`;

/* ======== side nav buttons ======== */

const SideNavButtonBase = styled.button`
    /* layout */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transform: translateZ(0);
    will-change: border-color, box-shadow;
    
    /* spacing */
    width: 50px;
    height: 50px;
    
    /* styles */
    color: white;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* hover effects */
    &:hover {
        border-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
    }
    
    /* active state */
    &:active {
        transition: all 0.1s ease;
    }
    
    /* media queries */
    @media (prefers-reduced-motion: reduce) {
        transition: none;
        
        &:hover {
            transform: none;
        }
    }
`;

// who i am - space/star gradient.
const SideNavButtonWhoIAm = styled(SideNavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(13, 7, 27) 0%,
        rgb(30, 20, 55) 40%,
        rgb(45, 30, 80) 70%,
        rgb(85, 60, 135) 95%,
        rgb(100, 70, 150) 100%);
`;

// experience - purple to blue gradient.
const SideNavButtonExperience = styled(SideNavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(78, 58, 128) 0%,
        rgb(78, 58, 128) 10%,
        rgb(92, 74, 155) 32%,
        rgb(112, 95, 182) 54%,
        rgb(132, 127, 210) 78%,
        rgb(148, 180, 243) 100%);
`;

// projects - light blue sky gradient.
const SideNavButtonProjects = styled(SideNavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(120, 165, 234) 0%,
        rgb(106, 158, 232) 25%,
        rgb(95, 157, 236) 50%,
        rgb(83, 158, 237) 75%,
        rgb(71, 160, 238) 100%);
`;

// skills - bright blue sky gradient.
const SideNavButtonSkills = styled(SideNavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(71, 160, 238) 0%,
        rgb(80, 170, 242) 25%,
        rgb(90, 180, 246) 50%,
        rgb(115, 205, 255) 75%,
        rgb(135, 225, 255) 100%);
`;

// about - darker underwater theme.
const SideNavButtonAbout = styled(SideNavButtonBase)`
    /* styles */
    background: linear-gradient(135deg,
        rgb(18, 66, 114) 0%,
        rgb(23, 82, 126) 20%,
        rgb(29, 98, 138) 40%,
        rgb(36, 114, 150) 60%,
        rgb(44, 130, 162) 75%,
        rgb(54, 146, 174) 90%,
        rgb(60, 154, 180) 100%);
`;

// chevron svg component - positioned to be fully visible in half circle.
const ChevronRight = styled.svg`
    /* layout */
    display: block;
    flex-shrink: 0;
    
    /* spacing */
    width: 20px;
    height: 20px;
    margin-left: 17.5px;
    
    /* styles */
    fill: none;
	stroke-width: 3;
    viewBox: 0 0 24 24;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
`;

// toggle button - pure half circle hump attached to pill's right side.
const ToggleButton = styled.button`
    /* layout */
    top: 50%;
    z-index: 5;
    display: flex;
    right: -26.5px;
	overflow: hidden;
	position: absolute;
    align-items: center;
    justify-content: flex-start;
    transform: translateY(-50%);
	will-change: transform, opacity;
    pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};

    /* spacing */
    width: 55px;
    height: 50px;
    padding-left: 8px;
    
    /* styles */
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.0);
    border-left: none;
    clip-path: polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%);
    background: linear-gradient(
        135deg,
        rgba(13, 7, 27, 0.6) 0%,
        rgba(20, 12, 35, 0.5) 50%,
        rgba(13, 7, 27, 0.6) 100%
    );
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    box-shadow: inset -2px 0 8px rgba(255, 255, 255, 0.1);
    filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.04))
            drop-shadow(0 0 40px rgba(255, 255, 255, 0.02));
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
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
        transform: translateY(-50%) translateX(-2px);
        transition: all 0.1s ease;
    }
    
    /* media queries */
    @media (max-width: 900px) {
        right: -22px;
        width: 44px;
        height: 44px;
        padding-left: 6px;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
        
        &:hover {
            transform: translateY(-50%);
        }
    }
`;

// side nav icon - the emoji icon that appears on the side nav button.
const SideNavIcon = styled.span`
    /* layout */
    position: relative;
    z-index: 1;
    
    /* styles */
    font-size: 1.5rem;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.4));
`;

// active indicator - the small line that appears when the button is active.
const ActiveIndicator = styled.div`
    /* layout */
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    
    /* spacing */
    width: 4px;
    height: 60%;
    
    /* styles */
    border-radius: 0 2px 2px 0;
    background: linear-gradient(to bottom, 
        rgba(100, 150, 255, 1),
        rgba(150, 200, 255, 0.8));
    box-shadow: 0 0 10px rgba(100, 150, 255, 0.8);
    animation: ${starTwinkle} 2s ease-in-out infinite;
`;


