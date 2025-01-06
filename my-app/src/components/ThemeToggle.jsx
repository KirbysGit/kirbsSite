import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../theme/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
    >
      <IconWrapper>
        {isDark ? (
          <motion.span
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
          >
            🌙
          </motion.span>
        ) : (
          <motion.span
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -180 }}
          >
            ☀️
          </motion.span>
        )}
      </IconWrapper>
    </ToggleButton>
  );
};

const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: ${({ theme }) => theme.card};
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  line-height: 1;
`;

export default ThemeToggle; 