// Imports.
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import styled from 'styled-components';
import { FaReact, FaNodeJs, FaFigma, FaPython, FaJava } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Hero Component.
const Hero = () => {
  // Refs.
  const rolesEl = useRef(null);

  // Initialize particles.
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // Effect for roles typing.
  useEffect(() => {
    const rolesTyped = new Typed(rolesEl.current, {
      strings: [
        "Software Developer",
        "UI/UX Enthusiast",
        "Creative Technologist",
        "Builder of Thoughtful Systems",
        "Lifelong Learner",
      ],
      typeSpeed: 70,
      backSpeed: 40,
      loop: true,
      showCursor: true,
      cursorChar: "_",
      startDelay: 1000,
      smartBackspace: true,
    });

    return () => {
      rolesTyped.destroy();
    };
  }, []);

  // Render.
  return (
    <StyledHero>
      <ParticlesContainer>
        <Particles
          id="hero-particles"
          init={particlesInit}
          options={{
            fullScreen: {
              enable: false,
              zIndex: 0
            },
            particles: {
              number: {
                value: 180,
                density: {
                  enable: true,
                  value_area: 1000
                }
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle"
              },
              opacity: {
                value: 0.6,
                random: true,
                anim: {
                  enable: true,
                  speed: 0.5,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 2,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  size_min: 0.5,
                  sync: false
                }
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: true,
                  rotateX: 600,
                  rotateY: 1200
                }
              },
              parallax: {
                enable: true,
                force: 60,
                smooth: 20
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: {
                  enable: true,
                  mode: "repulse",
                  parallax: {
                    enable: true,
                    force: 60,
                    smooth: 20
                  }
                },
                resize: true
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4
                }
              }
            },
            retina_detect: true
          }}
        />
      </ParticlesContainer>
      <HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroTitle>Hey, I'm Colin Kirby!</HeroTitle>
        </motion.div>
        <HeroSubtitle>
          I'm a <WaveText ref={rolesEl}></WaveText>
        </HeroSubtitle>
        <HeroSubtitle>
          This portfolio highlights my growth as a developer through projects, experiences, and skills — while also offering a glimpse into my life beyond work.
        </HeroSubtitle>
        <TechIcons>
          <TechIcon whileHover={{ scale: 1.2, y: -5 }}><FaReact /></TechIcon>
          <TechIcon whileHover={{ scale: 1.2, y: -5 }}><FaNodeJs /></TechIcon>
          <TechIcon whileHover={{ scale: 1.2, y: -5 }}><FaFigma /></TechIcon>
          <TechIcon whileHover={{ scale: 1.2, y: -5 }}><FaPython /></TechIcon>
          <TechIcon whileHover={{ scale: 1.2, y: -5 }}><FaJava /></TechIcon>
        </TechIcons>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ScrollButton
            to="experience"
            smooth={true}
            duration={800}
            offset={-50}
          >
            <ScrollArrow>↓</ScrollArrow>
            View My Work
          </ScrollButton>
        </motion.div>
      </HeroContent>
      <BottomFade />
    </StyledHero>
  );
};

// Styled Components
const StyledHero = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(180deg, 
    #0a0a2a 0%,
    #0c1339 40%,
    #0d1b48 70%,
    #0e2657 90%,
    #004d6e 100%
  );
  color: ${({ theme }) => theme.text};
  position: relative;
  overflow: hidden;
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  z-index: 0;
`;

const BottomFade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(180deg,
    transparent 0%,
    #004d6e 100%
  );
  opacity: 1;
  pointer-events: none;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const WaveText = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.primary};
  min-height: 1.2em;
  
  .typed-cursor {
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
  }
`;

const TechIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
`;

const TechIcon = styled(motion.div)`
  font-size: 2rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: color 0.3s ease;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const ScrollButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px ${({ theme }) => theme.accent}40;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${({ theme }) => theme.accent};
    transform: translateY(-2px);
  }
`;

const ScrollArrow = styled.span`
  font-size: 1.5rem;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

export default Hero;
