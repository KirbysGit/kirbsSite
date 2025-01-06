import React, { useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import styled from 'styled-components';

const Hero = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Hello, I'm Colin Kirby"],
      typeSpeed: 50,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <StyledHero className="hero" id="hero">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroTitle className="hero-title">
          <span ref={el}></span>
        </HeroTitle>
        <HeroSubtitle className="hero-subtitle">
          I'm a Computer Engineering student, passionate about building interactive 
          web experiences and developing efficient systems.
        </HeroSubtitle>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <HeroButton to="projects" smooth={true} duration={500}>
            View My Work
          </HeroButton>
        </motion.div>
        <ScrollIndicator 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          &#x25BC;
        </ScrollIndicator>
      </motion.div>
    </StyledHero>
  );
};

const StyledHero = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.background};
  transition: all 0.3s ease;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
  }
`;

const ScrollIndicator = styled(motion.div)`
  margin-top: 3rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textSecondary};
  animation: bounce 2s infinite;
  transition: color 0.3s ease;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`;

const HeroSubtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

export default Hero;
