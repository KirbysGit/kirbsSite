import React from 'react';
import styled, { keyframes } from 'styled-components';
import TreasureChest from './TreasureChest';

const Footer = () => { 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <FooterContainer>
            <SandPlane />
            
            {/* Treasure chest - positioned on left, partially buried */}
            <TreasureChest 
                width={160} 
                height={160}
                burialDepth={0.45}
                tilt={0}
            />

            <FooterContent>
                
                {/*
                <CenterSection>
                    <SurfaceButton onClick={scrollToTop}>
                        <ButtonText>SURFACE</ButtonText>
                        <ArrowIcon>↑</ArrowIcon>
                    </SurfaceButton>
                </CenterSection>*/}
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;

/* ================= Styles ================= */

// Footer container - sandy ocean floor theme
const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  min-height: 25vh;
  overflow: clip;

  perspective: 400px;
  perspective-origin: 50% 100%;
`;

const SandPlane = styled.div`
    height: 45vh;
    width: 100%;
    position: absolute;
    z-index: 0;           
    
    transform: rotateX(55deg);
    transform-origin: top center;

    background: linear-gradient(
        to bottom,
        #7b654d 0%,
        #8a7157 20%,
        #9a7f61 40%,
        #b39873 70%,
        #c2a680 100%
    );

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        /* DRAMATIC hills and valleys - MAXIMUM contrast for 3D terrain */
        background:
            /* Depth gradient - darker toward bottom (farther away) */
            linear-gradient(
                to bottom,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0.06) 35%,
                rgba(0,0,0,0.14) 65%,
                rgba(0,0,0,0.22) 100%
            ),
            
            /* Large raised mounds (BRIGHT highlights) - MAXIMUM contrast */
            radial-gradient(ellipse 450px 200px at 18% 22%, 
                rgba(255,255,255,0.7) 0%, 
                rgba(255,255,255,0.4) 32%, 
                rgba(255,255,255,0.15) 52%, 
                transparent 68%),
            radial-gradient(ellipse 380px 180px at 78% 28%, 
                rgba(255,255,255,0.66) 0%, 
                rgba(255,255,255,0.38) 30%, 
                rgba(255,255,255,0.12) 50%, 
                transparent 65%),
            radial-gradient(ellipse 500px 220px at 42% 55%, 
                rgba(255,255,255,0.68) 0%, 
                rgba(255,255,255,0.42) 34%, 
                rgba(255,255,255,0.16) 54%, 
                transparent 70%),
            radial-gradient(ellipse 320px 160px at 12% 78%, 
                rgba(255,255,255,0.64) 0%, 
                rgba(255,255,255,0.36) 28%, 
                rgba(255,255,255,0.1) 48%, 
                transparent 62%),
            radial-gradient(ellipse 420px 190px at 85% 70%, 
                rgba(255,255,255,0.65) 0%, 
                rgba(255,255,255,0.39) 32%, 
                rgba(255,255,255,0.13) 52%, 
                transparent 66%),
            
            /* Deep valleys (DARK shadows) - DRAMATIC depth */
            radial-gradient(ellipse 360px 170px at 35% 38%, 
                rgba(0,0,0,0.55) 0%, 
                rgba(0,0,0,0.32) 36%, 
                rgba(0,0,0,0.12) 54%, 
                transparent 66%),
            radial-gradient(ellipse 310px 150px at 68% 50%, 
                rgba(0,0,0,0.52) 0%, 
                rgba(0,0,0,0.3) 34%, 
                rgba(0,0,0,0.1) 52%, 
                transparent 64%),
            radial-gradient(ellipse 380px 180px at 8% 58%, 
                rgba(0,0,0,0.58) 0%, 
                rgba(0,0,0,0.35) 38%, 
                rgba(0,0,0,0.14) 56%, 
                transparent 68%),
            radial-gradient(ellipse 330px 160px at 90% 42%, 
                rgba(0,0,0,0.5) 0%, 
                rgba(0,0,0,0.28) 32%, 
                rgba(0,0,0,0.09) 50%, 
                transparent 62%),
            radial-gradient(ellipse 400px 185px at 52% 85%, 
                rgba(0,0,0,0.54) 0%, 
                rgba(0,0,0,0.31) 36%, 
                rgba(0,0,0,0.11) 54%, 
                transparent 66%),
            
            /* Medium ridges for more detail */
            radial-gradient(ellipse 250px 120px at 28% 45%, 
                rgba(255,255,255,0.45) 0%, 
                rgba(255,255,255,0.15) 48%, 
                transparent 70%),
            radial-gradient(ellipse 220px 110px at 72% 68%, 
                rgba(0,0,0,0.42) 0%, 
                rgba(0,0,0,0.14) 46%, 
                transparent 66%),
            radial-gradient(ellipse 270px 130px at 48% 32%, 
                rgba(255,255,255,0.4) 0%, 
                rgba(255,255,255,0.12) 46%, 
                transparent 68%);
        
        filter: blur(9px);
        mix-blend-mode: overlay;
        pointer-events: none;
    }

    &::after {
        content: "";
        position: absolute;
        inset: 0;
        /* Subtle sandy grain texture - MUCH less prominent */
        background-image:
            radial-gradient(circle, rgba(255, 255, 255, 0.08) 25%, transparent 60%),
            radial-gradient(circle, rgba(0, 0, 0, 0.06) 25%, transparent 60%);
        background-size: 2px 2px, 2.5px 2.5px;
        background-position: 0 0, 1px 1px;
        opacity: 0.35;
        filter: blur(0.3px);
        mix-blend-mode: soft-light;
        pointer-events: none;
    }
`;


/* keep your content wrapper; just make sure it's above the layers */
const FooterContent = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem clamp(2rem, 5vw, 6rem);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 2rem;
`;


// Center section
const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


// Surface button with bubble trail
const SurfaceButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 3rem;
  font-family: 'Red Hat Display', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: rgba(180, 230, 245, 1);
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
  border: 2px solid rgba(120, 200, 220, 0.5);
  border-radius: 60px;
  backdrop-filter: blur(15px);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 0 25px rgba(100, 200, 220, 0.3);
  
  &:hover {
    transform: translateY(-8px);
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.18) 0%,
      rgba(255, 255, 255, 0.09) 100%
    );
    border-color: rgba(120, 200, 220, 0.7);
    box-shadow: 
      0 16px 48px rgba(31, 38, 135, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.35),
      0 0 40px rgba(100, 200, 220, 0.5);
  }
  
  &:active {
    transform: translateY(-4px);
  }
`;

const ButtonText = styled.span`
  display: block;
  text-shadow: 0 2px 10px rgba(120, 200, 220, 0.5);
`;

const ArrowIcon = styled.span`
  font-size: 2rem;
  line-height: 1;
  animation: arrowFloat 2s ease-in-out infinite;
  
  @keyframes arrowFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
`;