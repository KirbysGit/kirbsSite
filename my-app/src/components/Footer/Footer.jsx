import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// Footer images
import rockpileImage from '../../images/footer/rockpile.png';
import bluecoral from '../../images/footer/bluecoral.png';
import flatrock from '../../images/footer/flatrock.png';
import orangecoral from '../../images/footer/orangecoral.png';
import pinkcoral from '../../images/footer/pinkcoral.png';
import rockwithseaweed from '../../images/footer/rockwithseaweed.png';
import seaweed from '../../images/footer/seaweed.png';
import seaweed2 from '../../images/footer/seaweed2.png';
import seaweed3 from '../../images/footer/seaweed3.png';
import tallrock from '../../images/footer/tallrock.png';
import yellowcoral from '../../images/footer/yellowcoral.png';
import purplecoral from '../../images/footer/purplecoral.png';
import rocket from '../../images/footer/rocket.png';

// Interactive components
import ShellPhoneWithTooltip from './ShellPhone';
import MessageInBottleWithTooltip from './MessageInBottle';

const Footer = () => { 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <FooterContainer>

            {/* Made with Love - positioned without perspective in bottom left */}
            <MadeWithLoveContainer>
                Made with<HeartEmoji>❤️</HeartEmoji>by me (CK)
            </MadeWithLoveContainer>

            {/* Copyright - positioned without perspective in bottom right */}
            <CopyrightContainer>© 2025 Colin Kirby. All rights reserved.</CopyrightContainer>
            <SandPlane />
            
            <SandTextLayer>
                {/* Contact Me – sits near the bottom center (adjusted for perspective) */}
                <SandText
                    style={{ left: '94.25%', bottom: '-87%', fontSize: '2.25rem', fontWeight: 700 }}
                    data-text="Contact Me!"
                >
                    Contact Me!
                </SandText>
                

                {/* To The Moon – just below the rocket (adjusted for perspective) */}
                <SandText
                    style={{ left: '96%', bottom: '-47.5%', fontSize: '1.3rem', fontWeight: 500 }}
                    data-text="To The Moon!"
                >
                    To The Moon!
                </SandText>

                {/* Email icon near the bottle (adjusted for perspective) */}
                <SandIconWrap style={{ left: '42%', bottom: '-10%' }}>
                    <SandIcon width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 6h18v12H3zM3 6l9 6 9-6" />
                    </SandIcon>
                </SandIconWrap>

                {/* Phone icon near the shell phone (adjusted for perspective) */}
                <SandIconWrap style={{ left: '58%', bottom: '-10%' }}>
                    <SandIcon width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M6.6 10.8c1.5 2.9 3.8 5.1 6.7 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2a13 13 0 003.6.6c.6 0 1 .5 1 1V20a1 1 0 01-1 1c-9.4 0-17-7.6-17-17a1 1 0 011-1H7a1 1 0 011 1c0 1.2.2 2.4.6 3.6.1.3 0 .7-.3 1l-1.7 1.7z"/>
                    </SandIcon>
                </SandIconWrap>
            </SandTextLayer>
            
            {/* FAR LEFT - Large rock pile with seaweed cluster (pushed to wall) */}
            <UnderwaterObject style={{ bottom: '32%', left: '1%' }}>
                <img style={{ width: '245px', height: '245px' }} src={rockwithseaweed} alt="Rock with Seaweed" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '18%', left: '5%' }}>
                <img style={{ width: '210px', height: '210px' }} src={tallrock} alt="Tall Rock" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '4%', left: '-8%' }}>
                <img style={{ width: '360px', height: '360px', transform: 'scaleX(-1)' }} src={rockpileImage} alt="Rockpile" />
            </UnderwaterObject>
            
            <UnderwaterObject style={{ bottom: '0%', left: '-2%' }}>
                <img style={{ width: '220px', height: '220px' }} src={seaweed} alt="Seaweed" />
            </UnderwaterObject>
            
            <UnderwaterObject style={{ bottom: '6%', left: '3%' }}>
                <img style={{ width: '200px', height: '200px' }} src={seaweed2} alt="Seaweed" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '9%', left: '7%' }}>
                <img style={{ width: '220px', height: '220px' }} src={seaweed3} alt="Seaweed" />
            </UnderwaterObject>


            {/* LEFT CORAL GROUP - Spread out more to the left */}

            <UnderwaterObject style={{ bottom: '17%', left: '16%' }}>
                <img style={{ width: '225px', height: '225px' }} src={yellowcoral} alt="Yellow Coral" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '5%', left: '12%' }}>
                <img style={{ width: '245px', height: '245px' }} src={pinkcoral} alt="Pink Coral" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '8%', left: '20%' }}>
                <img style={{ width: '230px', height: '230px' }} src={purplecoral} alt="Purple Coral" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '-6%', left: '14%' }}>
                <img style={{ width: '235px', height: '235px' }} src={orangecoral} alt="Orange Coral" />
            </UnderwaterObject>
            
            <UnderwaterObject style={{ bottom: '-12%', left: '17%' }}>
                <img style={{ width: '260px', height: '260px' }} src={bluecoral} alt="Blue Coral" />
            </UnderwaterObject>

            {/* CENTER SECTION - More space around rocket */}

            {/* Interactive Message in a Bottle with email tooltip - LEFT of center (centered at 35%) */}
            <UnderwaterObject style={{ bottom: '10%', left: '37.5%', transform: 'translateX(-50%)'}}>
                <MessageInBottleWithTooltip />
            </UnderwaterObject>
            
            {/* Rocket - CENTERED at 50% */}
            <RocketContainer style={{ bottom: '20%', left: '49.75%', transform: 'translateX(-50%)'}} onClick={scrollToTop}>
                <RocketImage style={{ width: '250px', height: '250px' }} src={rocket} alt="Rocket - Back to top" />
            </RocketContainer>
            
            {/* Interactive Shell Phone with phone tooltip - RIGHT of center (centered at 65%) */}
            <UnderwaterObject style={{ bottom: '10%', left: '62.5%', transform: 'translateX(-50%)'}}>
                <ShellPhoneWithTooltip />
            </UnderwaterObject>

            {/* RIGHT CORAL GROUP - Spread out more to the right */}
            
            <UnderwaterObject style={{ bottom: '17%', right: '16%' }}>
                <img style={{ width: '235px', height: '235px' }} src={bluecoral} alt="Blue Coral" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '5%', right: '12%' }}>
                <img style={{ width: '240px', height: '240px' }} src={yellowcoral} alt="Yellow Coral" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '8%', right: '20%' }}>
                <img style={{ width: '230px', height: '230px' }} src={orangecoral} alt="Orange Coral" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '-6%', right: '14%' }}>
                <img style={{ width: '245px', height: '245px' }} src={purplecoral} alt="Purple Coral" />
            </UnderwaterObject>
            
            <UnderwaterObject style={{ bottom: '-12%', right: '17%' }}>
                <img style={{ width: '265px', height: '265px' }} src={pinkcoral} alt="Pink Coral" />
            </UnderwaterObject>

            {/* FAR RIGHT - Rock pile and seaweed cluster (pushed to wall) */}

            <UnderwaterObject style={{ bottom: '32%', right: '1%' }}>
                <img style={{ width: '240px', height: '240px' }} src={rockwithseaweed} alt="Rock with Seaweed" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '19%', right: '5%' }}>
                <img style={{ width: '210px', height: '210px' }} src={flatrock} alt="Flat Rock" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '4%', right: '-8%' }}>
                <img style={{ width: '360px', height: '360px' }} src={rockpileImage} alt="Rockpile" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '0%', right: '-2%' }}>
                <img style={{ width: '215px', height: '215px' }} src={seaweed} alt="Seaweed" />
            </UnderwaterObject>

            <UnderwaterObject style={{ bottom: '6%', right: '3%' }}>
                <img style={{ width: '195px', height: '195px' }} src={seaweed2} alt="Seaweed" />
            </UnderwaterObject>
            
            <UnderwaterObject style={{ bottom: '9%', right: '7%' }}>
                <img style={{ width: '220px', height: '220px', transform: 'scaleX(-1)' }} src={seaweed3} alt="Seaweed" />
            </UnderwaterObject>
        

            <FooterContent>
                {/* Underwater objects are now in Background component */}
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
  height: max-content;
  overflow: visible;           /* allow all overflow - horizontal is controlled at body level */
  margin-top: -10vh;           /* overlap with UnderwaterSection to allow rock piles to extend up */
  padding-top: 10vh;           /* compensate for negative margin */
  z-index: 5;                  /* higher than UnderwaterSection (z-index: 1) */
  
  /* shared vars for all sand text/icons */
  --tilt: 55deg;
  --sand-base: #b39873;
  --sand-dark: #6e5843;
  --sand-light: #efe2cc;
`;


const SandPlane = styled.div`
    height: 50vh;
    width: 100%;
    position: absolute;
    top: 10vh;               /* align with padding-top to start at visible footer area */
    z-index: 0;           
    overflow: visible;       /* don't clip children */
    
    /* Moved perspective here to avoid clipping issues */
    perspective: 400px;
    perspective-origin: 50% 100%;
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

// Rock pile component - positioned on the sandy bottom
const UnderwaterObject = styled.div`
    position: absolute;
    z-index: 20;                /* very high z-index to appear above all content */
    overflow: visible;          /* ensure no clipping of large images */
    pointer-events: none;       /* allow clicks to pass through */
    
    /* Reset perspective to avoid 3D effects clipping */
    perspective: none;
    transform-style: flat;
    
    /* Subtle underwater glow effect */
    filter: drop-shadow(0 4px 12px rgba(0, 40, 80, 0.3));
    
    /* Allow images inside to receive pointer events */
    img {
        pointer-events: auto;
    }
`;

/* ================= Sand Text/Icon Overlay ================= */

/* Layer that sits *in the same plane* as the sand */
const SandTextLayer = styled.div`
  position: absolute;
  inset: 0;
  top: 10vh; /* same as SandPlane top so they align */
  width: 100%;
  pointer-events: none;
  z-index: 12; /* above sand, below rocks (your rocks use z=20) */

  /* match perspective/tilt of SandPlane */
  transform: perspective(400px) rotateX(var(--tilt));
  transform-origin: top center;
`;

/* Reusable engraved sand text */
const SandText = styled.div`
  position: absolute;
  transform: translateX(-50%);   /* we'll position by left:% + this center shift */
  white-space: nowrap;
  letter-spacing: 0.04em;

  color: var(--sand-dark);

  /* "etched" effect: bright ridge (top-left) + darker groove (bottom-right) - same as icons */
  text-shadow:
    -1px -1px 0 rgba(255, 255, 255, 0.2);

  /* subtle grain inside the letters */
  position: relative;
  
`;

/* "Drawn in sand" icons = strokes + same highlight/groove trick */
const SandIconWrap = styled.div`
  position: absolute;
  transform: translateX(-50%);
  pointer-events: none;
`;

const SandIcon = styled.svg`
  display: block;
  fill: none;
  stroke: var(--sand-dark);
  stroke-width: 2.25;
  stroke-linecap: round;
  stroke-linejoin: round;

  /* highlight ridge + groove */
  filter:
    drop-shadow(-1px -1px 0 var(--sand-light))
    drop-shadow( 1px  1px 0 rgba(0,0,0,0.28));
    
  @media (max-width: 700px) {
    stroke-width: 2.6;
  }
`;

/* keep your content wrapper; just make sure it's above the layers */
const FooterContent = styled.div`
  position: relative;
  height: 20vh;
  z-index: 1;
  padding: 2rem clamp(2rem, 5vw, 6rem);
  gap: 2rem;
`;

// Rocket container (back to top button)
const RocketContainer = styled.div`
  position: absolute;
  z-index: 20;
  overflow: visible;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-15px);
  }
`;

// Rocket image with hover effects
const RocketImage = styled.img`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 12px rgba(0, 40, 80, 0.3));
`;

// Made with Love container - positioned without perspective in bottom left
const MadeWithLoveContainer = styled.div`
  position: absolute;
  bottom: -20%;
  left: 2.5%;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 15; /* above sand text layer but below interactive elements */
  pointer-events: none;
  color: rgb(255, 255, 255, 0.5);
  font-size: 2rem;
`;

// Heart emoji - stands up straight without sand effect
const HeartEmoji = styled.span`
  font-size: 2rem;
  display: inline-block;
  animation: heartbeat 2s ease-in-out infinite;
  
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

// Copyright container - positioned without perspective in bottom right
const CopyrightContainer = styled.div`
  position: absolute;
  bottom: -20%;
  right: 2.5%;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  z-index: 15; /* above sand text layer but below interactive elements */
  pointer-events: none;
  font-size: 1.2rem;
  color: rgb(255, 255, 255, 0.5)
`;