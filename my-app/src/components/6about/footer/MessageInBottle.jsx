import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import messageBottle from '../../../images/5about/footer/messagebottle.png';

// Interactive Message in Bottle Component with bubble tooltip
const MessageInBottleWithTooltip = () => {
    const [showBubble, setShowBubble] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const email = 'kirbycolin26@gmail.com';

    const handleClick = () => {
        setShowBubble(!showBubble);
    };

    const handleCopyEmail = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(email);
        setIsCopied(true);
        
        // Reset back to copy icon after 2 seconds
        setTimeout(() => {
            setIsCopied(false);
        }, 4000);
    };

    return (
        <BottleContainer onClick={handleClick}>
            <BottleImage 
                style={{ width: '175px', height: '175px' }} 
                src={messageBottle} 
                alt="Message in a Bottle - Click for contact"
                $isActive={showBubble}
            />
            <EmailBubble $show={showBubble}>
                <EmailContent>
                    <EmailText>{email}</EmailText>
                    <ActionButton 
                        onClick={handleCopyEmail} 
                        title={isCopied ? "Copied!" : "Copy to clipboard"}
                        $isCopied={isCopied}
                    >
                        <IconWrapper $isCopied={isCopied}>
                            {isCopied ? (
                                // Check icon
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                </svg>
                            ) : (
                                // Copy icon
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                                </svg>
                            )}
                        </IconWrapper>
                    </ActionButton>
                </EmailContent>
            </EmailBubble>
            <BubbleTail1 $show={showBubble} />
            <BubbleTail2 $show={showBubble} />
        </BottleContainer>
    );
};

export default MessageInBottleWithTooltip;

/* ================= Styled Components ================= */

// Bubble float up animation
const bubbleUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Bubble pop animation
const bubblePop = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.15);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px) scale(0.5);
  }
`;

// Icon scale-in animation
const iconScaleIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

// Bottle container
const BottleContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: inline-block;
  pointer-events: auto;
`;

// Bottle image with hover effect
const BottleImage = styled.img`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.02);
    filter: drop-shadow(0 4px 14px rgba(0, 40, 80, 0.2));
  }
  
  ${({ $isActive }) => $isActive && css`
    transform: scale(1.02);
    filter: drop-shadow(0 4px 13px rgba(0, 40, 80, 0.32));
  `}
`;

// Main bubble tooltip (glassmorphic style like social bubbles)
const EmailBubble = styled.div`
  position: absolute;
  bottom: 127.5%;
  left: -75%;  /* Positioned to the left */
  
  min-width: 220px;
  padding: 0.75rem 1rem;
  border-radius: 20px;
  z-index: 2;
  
  /* Glassmorphism effect - matching social bubbles */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(150, 220, 240, 0.18) 100%
  );
  backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  /* Multiple layered shadows for depth */
  box-shadow: 
    /* Inner highlight - glossy shine */
    inset -4px -4px 12px rgba(255, 255, 255, 0.4),
    inset 4px 4px 12px rgba(100, 180, 200, 0.2),
    /* Outer glow */
    0 8px 32px rgba(100, 200, 220, 0.4),
    /* Depth shadow */
    0 4px 16px rgba(31, 38, 135, 0.5);
  
  /* Show/hide animation */
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
  
  ${({ $show }) => $show ? css`
    animation: ${bubbleUp} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.4s;  /* After both tail bubbles */
    opacity: 0;  /* Start hidden, animation will show it */
  ` : css`
    animation: ${bubblePop} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0s;  /* Pop immediately */
  `}
  
  /* Glossy highlight overlay */
  &::before {
    content: '';
    position: absolute;
    top: 8%;
    left: 15%;
    width: 45%;
    height: 45%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 40%,
      transparent 70%
    );
    filter: blur(6px);
    pointer-events: none;
  }
  
  z-index: 100;
`;

// Email content container (horizontal layout)
const EmailContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  white-space: nowrap;  /* Prevent text wrapping */
`;

// Email text
const EmailText = styled.span`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 0.3px;
  flex: 1;
  
  /* Text shadow for readability */
  text-shadow: 
    0 2px 4px rgba(0, 40, 80, 0.3),
    0 0 20px rgba(120, 200, 220, 0.3);
`;

// Action button (copy button)
const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.45rem 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.9);
  pointer-events: auto;  /* Ensure button is always clickable */
  flex-shrink: 0;  /* Don't shrink button */
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(100, 200, 220, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// Icon wrapper with animation
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${({ $isCopied }) => $isCopied && css`
    animation: ${iconScaleIn} 0.3s ease-out;
  `}
`;

// Bubble tail - first circle (larger, closer to main bubble)
// Positioned to create trail on the RIGHT side (between main bubble and bottle)
const BubbleTail1 = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);  /* Just below the main bubble */
  left: 50%;
  transform: translateX(20%);  /* Offset to the RIGHT */
  
  width: 24px;
  height: 24px;
  border-radius: 50%;
  
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(150, 220, 240, 0.18) 100%
  );
  backdrop-filter: blur(12px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  box-shadow: 
    inset -4px -4px 12px rgba(255, 255, 255, 0.4),
    inset 4px 4px 12px rgba(100, 180, 200, 0.2),
    0 8px 32px rgba(100, 200, 220, 0.3),
    0 4px 16px rgba(31, 38, 135, 0.4);
  
  z-index: 99;
  
  /* Show/hide with sequential animation */
  pointer-events: none;
  
  ${({ $show }) => $show ? css`
    animation: ${bubbleUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.2s;  /* After BubbleTail2 */
    opacity: 0;  /* Start hidden */
  ` : css`
    animation: ${bubblePop} 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.1s;  /* Pop after main bubble */
  `}
  
  /* Glossy highlight - top left shine (like social bubbles) */
  &::before {
    content: '';
    position: absolute;
    top: 8%;
    left: 15%;
    width: 45%;
    height: 45%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.3) 40%,
      transparent 70%
    );
    filter: blur(3px);
    pointer-events: none;
  }
  
  /* Bottom shadow inside bubble (like social bubbles) */
  &::after {
    content: '';
    position: absolute;
    bottom: 12%;
    left: 20%;
    width: 60%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 40, 80, 0.2) 0%,
      transparent 70%
    );
    filter: blur(4px);
    pointer-events: none;
  }
`;

// Bubble tail - second circle (smaller, further from main bubble)
// Positioned between bottle and first tail bubble (RIGHT side, closest to bottle)
const BubbleTail2 = styled.div`
  position: absolute;
  bottom: calc(100% - 12px);  /* Between bottle and first tail */
  left: 50%;
  transform: translateX(50%);  /* More offset to the RIGHT */
  
  width: 14px;
  height: 14px;
  border-radius: 50%;
  
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(150, 220, 240, 0.18) 100%
  );
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  
  box-shadow: 
    inset -4px -4px 12px rgba(255, 255, 255, 0.4),
    inset 4px 4px 12px rgba(100, 180, 200, 0.2),
    0 8px 32px rgba(100, 200, 220, 0.3),
    0 4px 16px rgba(31, 38, 135, 0.4);
  
  z-index: 98;
  
  /* Show/hide with sequential animation */
  pointer-events: none;
  
  ${({ $show }) => $show ? css`
    animation: ${bubbleUp} 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0s;  /* First bubble to appear */
    opacity: 0;  /* Start hidden */
  ` : css`
    animation: ${bubblePop} 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: 0.2s;  /* Last to pop */
  `}
  
  /* Glossy highlight - top left shine (like social bubbles) */
  &::before {
    content: '';
    position: absolute;
    top: 8%;
    left: 15%;
    width: 45%;
    height: 45%;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0.3) 40%,
      transparent 70%
    );
    filter: blur(3px);
    pointer-events: none;
  }
  
  /* Bottom shadow inside bubble (like social bubbles) */
  &::after {
    content: '';
    position: absolute;
    bottom: 12%;
    left: 20%;
    width: 60%;
    height: 30%;
    border-radius: 50%;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 40, 80, 0.2) 0%,
      transparent 70%
    );
    filter: blur(4px);
    pointer-events: none;
  }
`;

