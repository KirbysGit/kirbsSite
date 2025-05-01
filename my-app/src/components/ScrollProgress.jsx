import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ProgressBar>
      <ProgressFill style={{ width: `${scrollProgress}%` }} />
    </ProgressBar>
  );
};

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 1000;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.primary};
  transition: width 0.1s ease-out;
`;

export default ScrollProgress; 