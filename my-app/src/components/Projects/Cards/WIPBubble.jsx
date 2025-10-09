import React from 'react';
import styled from 'styled-components';

const WIPBubble = ({ theme }) => {
  return (
    <BubbleContainer $theme={theme}>
      <BubbleTail />
      <BubbleContent>
        <BubbleEmoji>🚧</BubbleEmoji>
      </BubbleContent>
    </BubbleContainer>
  );
};

export default WIPBubble;

/* ===== iMessage-style Bubble Styles ===== */

const BubbleContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BubbleContent = styled.div`
  background: ${({ $theme }) => {
    switch ($theme) {
      case 'cosmic':
        return 'rgba(150, 100, 255, 0.95)';
      case 'sentiment':
        return 'rgba(156, 39, 176, 0.95)';
      case 'centi':
        return 'rgba(13, 110, 253, 0.95)';
      default:
        return 'rgba(255, 193, 7, 0.95)';
    }
  }};
  
  border-radius: 18px;
  padding: 0.5rem 0.75rem;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.3);
  }
`;

const BubbleTail = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid ${({ $theme }) => {
    switch ($theme) {
      case 'cosmic':
        return 'rgba(150, 100, 255, 0.95)';
      case 'sentiment':
        return 'rgba(156, 39, 176, 0.95)';
      case 'centi':
        return 'rgba(13, 110, 253, 0.95)';
      default:
        return 'rgba(255, 193, 7, 0.95)';
    }
  }};
  margin-bottom: -1px;
  margin-right: 8px;
`;

const BubbleEmoji = styled.span`
  font-size: 1.2rem;
  line-height: 1;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
`;
