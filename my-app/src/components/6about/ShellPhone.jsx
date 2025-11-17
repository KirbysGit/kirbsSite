// shellPhone.jsx

// cool little shell phone with bubble tooltip.

// imports.
import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import shellphone from '@/images/5about/shellphone.png';

/* ================== main component ================== */

const ShellPhoneWithTooltip = () => {
    const [showBubble, setShowBubble] = useState(false);  // state for if bubble is shown.
    const [isCopied, setIsCopied] = useState(false);      // state for if phone number copied.
    const phoneNumber = '407-876-8172';                  // phone number to copy.

    // handle click to show bubble.
    const handleClick = () => {
        setShowBubble(!showBubble);
    };

    // handle copy phone number.
    const handleCopyPhone = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(phoneNumber);
        setIsCopied(true);
        
        // reset back to copy icon after 4 seconds.
        setTimeout(() => {
            setIsCopied(false);
        }, 4000);
    };

    return (
        <PhoneContainer onClick={handleClick}>
            {/* phone image */}
            <PhoneImage 
                style={{ width: '200px', height: '200px' }} 
                src={shellphone} 
                alt="Shell Phone - Click for contact"
                $isActive={showBubble}
            />
            {/* phone bubble */}
            <PhoneBubble $show={showBubble}>
                <PhoneContent>
                    <BubbleText>{phoneNumber}</BubbleText>
                    <ActionButton 
                        onClick={handleCopyPhone} 
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
                </PhoneContent>
            </PhoneBubble>
            {/* bubble tails */}
            <BubbleTail1 $show={showBubble} />
            <BubbleTail2 $show={showBubble} />
        </PhoneContainer>
    );
};

export default ShellPhoneWithTooltip;

/* ====================== styled ====================== */

// bubble float up animation
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

// bubble pop animation
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

// icon scale-in animation
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

// phone container
const PhoneContainer = styled.div`
    /* layout */
    position: relative;
    display: inline-block;
    cursor: pointer;
    pointer-events: auto;
`;

// phone image with hover effect
const PhoneImage = styled.img`
    /* styles */
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    /* hover effects */
    &:hover {
        transform: scale(1.02);
        filter: drop-shadow(0 4px 14px rgba(0, 40, 80, 0.2));
    }
    
    /* active state */
    ${({ $isActive }) => $isActive && css`
        transform: scale(1.02);
        filter: drop-shadow(0 4px 13px rgba(0, 40, 80, 0.32));
    `}
`;

// phone bubble tooltip
const PhoneBubble = styled.div`
    /* layout */
    position: absolute;
    bottom: calc(100% + 40px);
    left: 55%;
    transform: translateX(-50%);
    pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
    
    /* spacing */
    min-width: 230px;
    padding: 1rem 1.5rem;
    border-radius: 20px;
    
    /* styles */
    z-index: 100;
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
        0 8px 32px rgba(100, 200, 220, 0.4),
        0 4px 16px rgba(31, 38, 135, 0.5);
    
    /* animations */
    ${({ $show }) => $show ? css`
        animation: ${bubbleUp} 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        animation-delay: 0.4s;
        opacity: 0;
    ` : css`
        animation: ${bubblePop} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        animation-delay: 0s;
    `}
    
    /* pseudo-elements */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        top: 8%;
        left: 15%;
        pointer-events: none;
        
        /* spacing */
        width: 45%;
        height: 45%;
        border-radius: 50%;
        
        /* styles */
        filter: blur(6px);
        background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.2) 40%,
            transparent 70%
        );
    }
`;

// phone content container (horizontal layout)
const PhoneContent = styled.div`
    /* layout */
    position: relative;
    display: flex;
    align-items: center;
    white-space: nowrap;
    
    /* spacing */
    gap: 0.5rem;
    
    /* styles */
    z-index: 1;
`;

// bubble text
const BubbleText = styled.span`
    /* layout */
    position: relative;
    display: block;
    flex: 1;
    
    /* spacing */
    font-size: 1.1rem;
    letter-spacing: 0.5px;
    
    /* styles */
    z-index: 1;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    text-shadow: 
        0 2px 4px rgba(0, 40, 80, 0.3),
        0 0 20px rgba(120, 200, 220, 0.3);
`;

// copy button
const ActionButton = styled.button`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    pointer-events: auto;
    
    /* spacing */
    padding: 0.45rem 0.5rem;
    border-radius: 8px;
    
    /* styles */
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.9);
    transition: all 0.3s ease;
    
    /* hover effects */
    &:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 4px 12px rgba(100, 200, 220, 0.3);
    }
    
    /* active state */
    &:active {
        transform: scale(0.95);
    }
`;

// icon wrapper
const IconWrapper = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* animations */
    ${({ $isCopied }) => $isCopied && css`
        animation: ${iconScaleIn} 0.3s ease-out;
    `}
`;

// bubble tail - first circle
const BubbleTail1 = styled.div`
    /* layout */
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-30%);
    pointer-events: none;
    
    /* spacing */
    width: 24px;
    height: 24px;
    border-radius: 50%;
    
    /* styles */
    z-index: 99;
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
    
    /* animations */
    ${({ $show }) => $show ? css`
        animation: ${bubbleUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        animation-delay: 0.2s;
        opacity: 0;
    ` : css`
        animation: ${bubblePop} 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        animation-delay: 0.1s;
    `}
    
    /* pseudo-elements */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        top: 8%;
        left: 15%;
        pointer-events: none;
        
        /* spacing */
        width: 45%;
        height: 45%;
        border-radius: 50%;
        
        /* styles */
        filter: blur(3px);
        background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.3) 40%,
            transparent 70%
        );
    }
    
    &::after {
        /* layout */
        content: '';
        position: absolute;
        bottom: 12%;
        left: 20%;
        pointer-events: none;
        
        /* spacing */
        width: 60%;
        height: 30%;
        border-radius: 50%;
        
        /* styles */
        filter: blur(4px);
        background: radial-gradient(
            ellipse at center,
            rgba(0, 40, 80, 0.2) 0%,
            transparent 70%
        );
    }
`;

// bubble tail - second circle
const BubbleTail2 = styled.div`
    /* layout */
    position: absolute;
    bottom: calc(100% - 12px);
    left: 50%;
    transform: translateX(-60%);
    pointer-events: none;
    
    /* spacing */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    
    /* styles */
    z-index: 98;
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
    
    /* animations */
    ${({ $show }) => $show ? css`
        animation: ${bubbleUp} 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        animation-delay: 0s;
        opacity: 0;
    ` : css`
        animation: ${bubblePop} 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        animation-delay: 0.2s;
    `}
    
    /* pseudo-elements */
    &::before {
        /* layout */
        content: '';
        position: absolute;
        top: 8%;
        left: 15%;
        pointer-events: none;
        
        /* spacing */
        width: 45%;
        height: 45%;
        border-radius: 50%;
        
        /* styles */
        filter: blur(3px);
        background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.3) 40%,
            transparent 70%
        );
    }
    
    &::after {
        /* layout */
        content: '';
        position: absolute;
        bottom: 12%;
        left: 20%;
        pointer-events: none;
        
        /* spacing */
        width: 60%;
        height: 30%;
        border-radius: 50%;
        
        /* styles */
        filter: blur(4px);
        background: radial-gradient(
            ellipse at center,
            rgba(0, 40, 80, 0.2) 0%,
            transparent 70%
        );
    }
`;

