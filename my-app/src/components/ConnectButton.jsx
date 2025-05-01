import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const ConnectButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ConnectContainer>
      <MainButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        👋 Let's Connect
      </MainButton>
      <SocialLinks
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </SocialLink>
        <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </SocialLink>
        <SocialLink href="mailto:your.email@example.com">
          <FaEnvelope />
        </SocialLink>
      </SocialLinks>
    </ConnectContainer>
  );
};

const ConnectContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  z-index: 1000;
`;

const MainButton = styled(motion.button)`
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px ${({ theme }) => theme.accent}40;
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  overflow: hidden;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.accent};
    transform: translateY(-3px);
  }
`;

export default ConnectButton; 