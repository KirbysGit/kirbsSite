import React from 'react';
import styled, { keyframes } from 'styled-components';

// Fade out animation
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$isFading 
    ? 'transparent' 
    : 'linear-gradient(135deg, #0d071b 0%, #1e1437 50%, #2d1e50 100%)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${props => props.$isFading ? 0 : 1};
  transition: opacity 1.2s ease-out, background 1.2s ease-out;
  pointer-events: ${props => props.$isFading ? 'none' : 'auto'};
`;

const LoadingLine = styled.div`
  width: 300px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  overflow: hidden;
  position: relative;
`;

const ProgressLine = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #007AFF, #5856D6);
  border-radius: 1px;
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const LoadingText = styled.div`
  color: white;
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 16px;
  font-weight: 400;
  margin-top: 20px;
  opacity: 0.8;
`;

const LoadingScreen = ({ progress = 0, isFading = false }) => {
  return (
    <LoadingContainer $isFading={isFading}>
      <LoadingLine>
        <ProgressLine $progress={progress} />
      </LoadingLine>
      <LoadingText>
        Loading Portfolio...
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen;
