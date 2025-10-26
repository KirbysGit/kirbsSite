// basic imports.
import styled from 'styled-components';
import React, { useEffect, memo } from 'react';

// map pin component.
import MapPin from '../Experience/MapPin';

// images.
import ucf4 from '@/images/story/ucf4.jpg';
import lilG from '@/images/story/lilG.jpg';
import mySetUp from '@/images/story/mySetUp.jpg';
import secondHome from '@/images/story/secondHome.jpg';
import campingTrip from '@/images/story/campingTrip.jpg';
import alwaysChillin from '@/images/story/alwaysChillin.jpg';
import naturalAthlete from '@/images/story/naturalAthlete.jpg';
import engineeringGuy from '@/images/story/engineeringGuy.jpg';
import sanduskySunset from '@/images/story/sanduskySunset.jpg';
import spaceStation from '@/images/story/spacestation.png';
import satellite1 from '@/images/story/satellite1.png';
import satellite2 from '@/images/story/satellite2.png';

const WhoIAm = memo(() => {
    
    // preload images that appear at section boundaries to prevent decode jitter
    useEffect(() => {
        const srcs = [
            ucf4, engineeringGuy, secondHome, // college section
            naturalAthlete, alwaysChillin,    // early years (edge cases)
            campingTrip, lilG, mySetUp, sanduskySunset // post-grad section
        ];
        srcs.forEach(src => { 
            const img = new Image(); 
            img.src = src; 
        });
    }, []);

    return (
        <WhoIAmContainer>
            {/* Background effects - positioned absolutely to avoid layout shifts */}
            <BackgroundEffectsLayer>
                {/* <Aurora /> */}
                { /* <MeteorShower images={[asteroid1, asteroid2, asteroid3, asteroid4]} /> */}
            </BackgroundEffectsLayer>
            
            {/* main title */}
            <WhoIAmMainTitle>Who I Am</WhoIAmMainTitle>
            
            {/* single simplified section */}
            <WhoIAmSection>
                <OverlappingImageContainer>
                    {/* pin of windermere */}
                    <MapPinWrapper $side="left">
                        <MapPin 
                            item={{ theme: { primary: '#ff6b6b' } }}
                            coords={[28.4958, -81.5359]}
                            address="Windermere, Florida"
                            link="https://www.google.com/maps/place/Windermere,+FL/@28.4958,-81.5359,15z"
                            style="outdoors-v12"
                            size="400x350"
                            pitch={55}
                            bearing={-40}
                            zoom={13.8}
                            pinSize="7rem"
                            pinPosition={{ bottom: "42%", left: "33.75%" }}
                            pulsePosition={{ top: "52.5%", left: "52.625%" }}
                            showPulse={true}
                            mapFilters="grayscale(20%) brightness(85%) contrast(110%)"
                            borderRadius="20px"
                        />
                    </MapPinWrapper>

                    {/* image of me hitting a dinger */}
                    <ImageCard 
                        $position="bottom-right" 
                        $image={naturalAthlete}
                        $alt="Natural Athlete"
                    >
                        <BubbleContainer $position="bottom-right">
                            <SpeechBubble $parentPosition="bottom-right">
                                Clearly a natural athlete, photo speaks for itself. 💯
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-right">
                                If you were wondering, Yes that was a home run. ⚾
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>

                    {/* image of me in front of engineering building */}
                    <ImageCard 
                        $position="bottom-left" 
                        $image={engineeringGuy}
                        $alt="Engineering Guy"
                    >
                        <BubbleContainer $position="top-left">
                            <SpeechBubble $parentPosition="top-left" $width="100%">
                                Big Engineering Guy 💻 #2EZ
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="top-left" $width="90%">
                                #ItWasActuallyReallyHard
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>

                    {/* image of the my setup */}
                    <ImageCard
                        $position="diagonal-down-left"
                        $image={mySetUp}
                        $alt="My Setup"
                    >
                        <BubbleContainer $position="bottom-left">
                            <SpeechBubble $parentPosition="bottom-left" $width="max-content">
                                A look into my setup ⌨️🖱️
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-left" $width="max-content">
                                Where the magic happens 🪄
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>

                    {/* image of lil g */}
                    <ImageCard 
                        $position="top-left" 
                        $image={lilG}
                        $alt="Lil G"
                    >
                        <BubbleContainer $position="top-left">
                            <SpeechBubble $parentPosition="bottom-right" $width="max-content">
                                My lil bro 🐕
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-right" $width="max-content">
                                His name is Guinness 🍺
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>
                </OverlappingImageContainer>
                
                {/* simplified content */}
                <TextContainer>
                    <SectionTitle>About Me</SectionTitle>
                    <SimplifiedText>
                        <OneLinerText>
                            I'm a <span className="emphasis">Computer Engineering graduate</span> who builds <span className="skill">software solutions</span> and thrives on <span className="activity">creative problem-solving</span> while staying connected to <span className="subject-good">people</span>.
                        </OneLinerText>
                        
                        <NowText>
                            <NowBullet>🎯 <span className="emphasis">Job hunting</span> for roles that blend <span className="skill">software</span> with <span className="subject-good">human connection</span></NowBullet>
                            <NowBullet>🚀 <span className="activity">Building projects</span> to sharpen my <span className="skill">full-stack</span> development skills</NowBullet>
                            <NowBullet>🧠 <span className="activity">Learning</span> new technologies while staying grounded in <span className="subject-good">fundamentals</span></NowBullet>
                        </NowText>
                        
                        <SuperpowersText>
                            <SuperpowerTag>💻 <span className="skill">Full-Stack Development</span></SuperpowerTag>
                            <SuperpowerTag>🎨 <span className="activity">Creative Problem Solving</span></SuperpowerTag>
                            <SuperpowerTag>🤝 <span className="subject-good">Team Collaboration</span></SuperpowerTag>
                            <SuperpowerTag>📈 <span className="skill">Continuous Learning</span></SuperpowerTag>
                            <SuperpowerTag>⚡ <span className="emphasis">Adaptability</span></SuperpowerTag>
                        </SuperpowersText>
                    </SimplifiedText>
                </TextContainer>
            </WhoIAmSection>
        </WhoIAmContainer>
    );
});

// -------------------------------------------------------------- main container.
const WhoIAmContainer = styled.div`
  /* design tokens for scale */
  --section-h: clamp(560px, 70vh, 820px);  /* total height budget per section */
  --text-max: clamp(54ch, 58ch, 62ch);     /* readable line length */
  --img:      clamp(15rem, 18vw, 21rem);   /* image card size */
  --gap:      clamp(20px, 3vw, 48px);

  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100vh;

  /* scrolling */
  overflow-x: hidden;
  overflow-y: visible;
  overscroll-behavior: contain;

  gap: 0;
  padding-top: 2rem;
  padding-bottom: 6rem;

  background: linear-gradient(to bottom,
    rgb(13, 7, 27) 0%,
    rgb(13, 7, 27) 25%,
    rgb(30, 20, 55) 50%,
    rgb(45, 30, 80) 65%,
    rgb(65, 45, 110) 80%,
    rgb(85, 60, 135) 90%,
    rgb(100, 70, 150) 100%);

  @media (max-width: 1600px) { padding-bottom: 3rem; }
`;

// background effects layer - prevents layout shifts
const BackgroundEffectsLayer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    pointer-events: none;
    contain: layout style paint;
    will-change: auto;
    transform: translateZ(0); /* force GPU layer */
`;

// main title at the top
const WhoIAmMainTitle = styled.div` 
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;

    /* spacing */
    margin-bottom: -1.5rem;
    padding: 0;

    /* styles */
    font-weight: 700;
    text-align: center;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 1) 0%,
        rgba(200, 180, 255, 0.95) 50%,
        rgba(150, 200, 255, 1) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* media queries */
    @media (max-width: 2000px) {
        font-size: 6rem; 
    }

    @media (max-width: 1600px) {
        font-size: 4rem;
    }
`;

// story sections like "early years".
const WhoIAmSection = styled.section`
  display: grid;
  grid-template-columns: minmax(480px, 1fr) minmax(460px, 1fr);
  grid-template-areas: "media text";
  align-items: center;
  gap: var(--gap);
  padding: clamp(24px, 6vh, 64px) clamp(16px, 3vw, 56px);
  min-height: var(--section-h);
`;

// images throughout the "story".
const OverlappingImageContainer = styled.div`
  grid-area: media;
  position: relative;
  height: var(--section-h);
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  overflow: visible;       /* allow cards to overlap within this area */
  contain: layout style;   /* no paint containment (avoids clipping) */
`;

// wrapper for the mapbox pin. used twice, once for windy, and one for ucf.
const MapPinWrapper = styled.div`
    /* layout */
    top: 0;
    z-index: 1;
    position: absolute;

    /* styles */
    transform: scale(1);

    /* media queries */
    
    /* when wrapper is one left side of the screen*/
    ${props => props.$side === 'left' && `
        /* for my big monitor */
        @media (min-width: 1900px) {
            transform: scale(1.1);
            left: 57.5px;
        }
        
        /* for my smaller monitor */
        @media (max-width: 1599px) {
            transform: scale(0.9);
            left: 20px;
        }
    `}
    
    /* when wrapper is one right side of the screen*/
    ${props => props.$side === 'right' && `
        /* for my large monitor */
        @media (min-width: 1900px) {
            transform: scale(1.1);
            right: 57.5px;
            left: auto;
        }
        
        /* for my smaller monitor */
        @media (max-width: 1599px) {
            transform: scale(0.9);
            right: 20px;
            left: auto;
        }
    `}
`;

// image card used for all of the images.
const ImageCard = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--img);
  height: var(--img);

  cursor: pointer;
  border-radius: 20px;
  transition: transform .3s ease, box-shadow .3s ease;
  border: 2px solid rgba(255,255,255,0.2);
  background: ${p => p.$image ? `url(${p.$image}) center/cover no-repeat`
                               : 'rgba(255,255,255,0.1)'};
  backdrop-filter: ${p => p.$image ? 'none' : 'blur(10px)'};
  z-index: ${p => (p.$position === 'bottom-left' ? 2 : 1)};

  /* your existing placement transforms preserved */
  ${p => p.$position === 'top-left' && `
    top: 0; left: 0; transform: translate(40px, 40px);
  `}
  ${p => p.$position === 'bottom-right' && `
    bottom: 0; right: 0; transform: translate(20px, 50px);
  `}
  ${p => p.$position === 'bottom-left' && `
    bottom: 0; left: 0; transform: translate(-20px, 20px);
  `}
  ${p => p.$position === 'diagonal-down-left' && `
    top: 60%; left: 0; transform: translate(35px, 30px);
  `}
  ${p => p.$position === 'diagonal-down-right' && `
    top: 60%; right: 0; transform: translate(-35px, 30px);
  `}
  ${p => p.$position === 'sunset' && `
    top: 85%; right: 0; transform: translate(20px, 40px);
  `}
  ${p => p.$position === 'diagonal-down-left-from-right' && `
    top: 85%; left: 0; transform: translate(-20px, 40px);
  `}
`;

// wrapper for the speech bubbles.
const BubbleContainer = styled.div`
    /* layout */
    z-index: 10;
    display: flex;
    position: absolute;
    flex-direction: column;

    /* spacing */
    gap: 8px;

    /* styles */
    pointer-events: none;
    transform: scale(0.8);
    transition: all 0.3s ease;
    
    /* media queries */
    @media (min-width: 1900px) {
        transform: scale(1);
    }
    
    @media (max-width: 1599px) {
        transform: scale(0.85);
    }
    
    /* --- positioning based on $position prop --- */

    ${props => props.$position === 'top-left' && `
        top: -15px;
        left: -140px;
        
        @media (min-width: 1900px) {
            left: -20px;
        }
        
        @media (max-width: 1599px) {
            left: -35px;
        }
    `}
    
    ${props => props.$position === 'top-right' && `
        top: -10px;
        right: -140px;
        
        @media (min-width: 1900px) {
            right: -10px;
        }
        
        @media (max-width: 1599px) {
            right: -20px;
        }
    `}
    
    ${props => props.$position === 'bottom-left' && `
        bottom: -15px;
        left: -20px;
        
        @media (min-width: 1900px) {
            left: -10px;
        }
        
        @media (max-width: 1599px) {
            left: -40px;
        }
    `}
    
    ${props => props.$position === 'bottom-right' && `
        bottom: -15px;
        right: -20px;
        
        @media (min-width: 1900px) {
            bottom: -10px;
            right: -10px;
        }
        
        @media (max-width: 1599px) {
            bottom: -15px;
            right: -35px;
        }
    `}
`;

// actual speed bubble component.
const SpeechBubble = styled.div`
    /* layout */
    position: relative;

    /* spacing */
    width: ${props => props.$width ? props.$width : '75%'};
    padding: 8px 16px 6px 16px;
    border-radius: 18px;

    /* styles */
    color: white;
    font-weight: 500;
    line-height: 1.2;
    font-size: 1.15rem;
    text-align: justify;    
    border-radius: 18px;
    background: #007AFF;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
    
    /* --- positioning based on $parentPosition prop --- */

    /* right-align bubbles when parent is top-right or bottom-right */
    ${props => (props.$parentPosition === 'top-right' || props.$parentPosition === 'bottom-right') && `
        margin-left: auto;
    `}
    
    /* speech bubble tail using svg like iphone - only on last bubble */
    &:last-child::after {
        position: absolute;
        content: "";
        bottom: -1px;
        width: 15.515px;
        height: 17.5px;
        z-index: 1;
        background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15.515px' height='17.5px' viewBox='32.484 17.5 15.515 17.5' enable-background='new 32.484 17.5 15.515 17.5'><path fill='%23007AFF' d='M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'/></svg>") no-repeat;
        background-size: 15.515px 17.5px;
        
        /* tail positioning based on parent bubble container position */
        /* so i can get the tail to point to the correct side based on where i placed it */
        ${props => {
            const parentPosition = props.$parentPosition;
            if (parentPosition === 'top-left' || parentPosition === 'bottom-left') {
                return `
                    left: -6px;
                    transform: scaleX(1);
                `;
            } else {
                return `
                    right: -6px;
                    transform: scaleX(-1);
                `;
            }
        }}
    }
`;

// wrapper for the text on left or right side of the screen.
const TextContainer = styled.div`
  grid-area: text;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  color: white;
  padding: 0 2rem 2rem 2rem;
  max-width: var(--text-max);
`;

// section title like "The One-Liner", "Now", "Superpowers".
const SectionTitle = styled.div`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  background: linear-gradient(135deg,
    rgba(255,255,255,0.9) 0%,
    rgba(200,180,255,0.8) 50%,
    rgba(150,200,255,0.9) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(2.25rem, 3.8vw, 4.5rem);
`;

// simplified text container - combines all content
const SimplifiedText = styled.div`
  line-height: 1.65;
  color: rgba(255,255,255,0.9);
  font-size: clamp(1.05rem, 1.1vw, 1.3rem);
`;

// one-liner text - single sentence summary
const OneLinerText = styled.div`
  line-height: 1.65;
  color: rgba(255,255,255,0.9);
  font-size: clamp(1.05rem, 1.1vw, 1.3rem);
  
  /* small styles for some of the text in the story, just to give it a bit more flair and make it less boring. */
  .location {
      color: rgb(120, 200, 200);
      font-weight: 500;
  }
  
  .special-moment {
      color: rgb(180, 200, 255);
      font-weight: 600;
  }
  
  .activity {
      color: rgb(150, 200, 180);
      font-weight: 500;
  }
  
  .subject-good {
      color: rgb(120, 180, 220);
      font-weight: 500;
  }
  
  .subject-bad {
      color: rgb(220, 140, 180);
      font-weight: 500;
      font-style: italic;
  }
  
  .emphasis {
      color: rgb(140, 180, 255);
      font-weight: 600;
  }
  
  .negative {
      color: rgb(200, 150, 200);
      font-weight: 500;
      font-style: italic;
  }
  
  .ucf {
      color: rgb(255, 200, 100);
      font-weight: 600;
  }
  
  .major {
      color: rgb(180, 150, 220);
      font-weight: 500;
  }
  
  .python {
      color: rgb(120, 180, 255);
      font-weight: 600;
  }
  
  .skill {
      color: rgb(140, 180, 240);
      font-weight: 500;
  }
`;

// now text - 3 short bullets
const NowText = styled.div`
  line-height: 1.65;
  color: rgba(255,255,255,0.9);
  font-size: clamp(1.05rem, 1.1vw, 1.3rem);
`;

// now bullet - individual bullet point
const NowBullet = styled.div`
  margin-bottom: clamp(12px, 1.2vh, 20px);
  
  /* small styles for some of the text in the story, just to give it a bit more flair and make it less boring. */
  .location {
      color: rgb(120, 200, 200);
      font-weight: 500;
  }
  
  .special-moment {
      color: rgb(180, 200, 255);
      font-weight: 600;
  }
  
  .activity {
      color: rgb(150, 200, 180);
      font-weight: 500;
  }
  
  .subject-good {
      color: rgb(120, 180, 220);
      font-weight: 500;
  }
  
  .subject-bad {
      color: rgb(220, 140, 180);
      font-weight: 500;
      font-style: italic;
  }
  
  .emphasis {
      color: rgb(140, 180, 255);
      font-weight: 600;
  }
  
  .negative {
      color: rgb(200, 150, 200);
      font-weight: 500;
      font-style: italic;
  }
  
  .ucf {
      color: rgb(255, 200, 100);
      font-weight: 600;
  }
  
  .major {
      color: rgb(180, 150, 220);
      font-weight: 500;
  }
  
  .python {
      color: rgb(120, 180, 255);
      font-weight: 600;
  }
  
  .skill {
      color: rgb(140, 180, 240);
      font-weight: 500;
  }
`;

// superpowers text - 5 concise tags
const SuperpowersText = styled.div`
  line-height: 1.65;
  color: rgba(255,255,255,0.9);
  font-size: clamp(1.05rem, 1.1vw, 1.3rem);
`;

// superpower tag - individual strength tag
const SuperpowerTag = styled.div`
  margin-bottom: clamp(12px, 1.2vh, 20px);
  
  /* small styles for some of the text in the story, just to give it a bit more flair and make it less boring. */
  .location {
      color: rgb(120, 200, 200);
      font-weight: 500;
  }
  
  .special-moment {
      color: rgb(180, 200, 255);
      font-weight: 600;
  }
  
  .activity {
      color: rgb(150, 200, 180);
      font-weight: 500;
  }
  
  .subject-good {
      color: rgb(120, 180, 220);
      font-weight: 500;
  }
  
  .subject-bad {
      color: rgb(220, 140, 180);
      font-weight: 500;
      font-style: italic;
  }
  
  .emphasis {
      color: rgb(140, 180, 255);
      font-weight: 600;
  }
  
  .negative {
      color: rgb(200, 150, 200);
      font-weight: 500;
      font-style: italic;
  }
  
  .ucf {
      color: rgb(255, 200, 100);
      font-weight: 600;
  }
  
  .major {
      color: rgb(180, 150, 220);
      font-weight: 500;
  }
  
  .python {
      color: rgb(120, 180, 255);
      font-weight: 600;
  }
  
  .skill {
      color: rgb(140, 180, 240);
      font-weight: 500;
  }
`;

// space station - static in top right of Early Years section
const SpaceStation = styled.div`
    /* layout */
    top: 0%;
    right: 5%;
    z-index: 0;
    position: absolute;

    /* spacing */
    width: 250px;
    height: 250px;

    /* styles */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${spaceStation});
    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.2));
    opacity: 0.7;
    will-change: transform;
    contain: layout style paint;
    
    /* subtle floating animation - optimized */
    animation: spaceStationFloat 8s ease-in-out infinite;
    
    @keyframes spaceStationFloat {
        0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg);
        }
        50% { 
            transform: translate3d(0, -8px, 0) rotate(2deg);
        }
    }
`;

// satellite 1 - floating through background
const Satellite1 = styled.div`
    /* layout */
    top: 12.5%;
    left: -15%;
    z-index: 0;
    position: absolute;

    /* spacing */
    width: 100px;
    height: 180px;

    /* styles */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${satellite1});
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
    opacity: 0.6;
    will-change: transform;
    contain: layout style paint;
    
    /* floating animation with delay - optimized */
    animation-delay: 3s;
    animation: satellite1Float 25s linear infinite;
    
    @keyframes satellite1Float {
        0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
        }
        25% {
            transform: translate3d(calc(25vw + 40px), -30px, 0) rotate(90deg);
        }
        50% {
            transform: translate3d(calc(50vw + 80px), 0, 0) rotate(180deg);
        }
        75% {
            transform: translate3d(calc(75vw + 120px), 30px, 0) rotate(270deg);
        }
        100% {
            transform: translate3d(calc(100vw + 160px), 0, 0) rotate(360deg);
        }
    }
`;

// satellite 2 - floating through background with different path
const Satellite2 = styled.div`
    /* layout */
    top: 22.5%;
    right: -15%;
    z-index: 0;
    position: absolute;

    /* spacing */
    width: 100px;
    height: 180px;

    /* styles */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${satellite2});
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.12));
    opacity: 0.5;
    will-change: transform;
    contain: layout style paint;
    
    /* floating animation with different delay and path - right to left - optimized */
    animation-delay: 7s;
    animation: satellite2Float 30s linear infinite;
    
    @keyframes satellite2Float {
        0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
        }
        20% {
            transform: translate3d(calc(-20vw - 30px), -20px, 0) rotate(72deg);
        }
        40% {
            transform: translate3d(calc(-40vw - 60px), 0, 0) rotate(144deg);
        }
        60% {
            transform: translate3d(calc(-60vw - 90px), 20px, 0) rotate(216deg);
        }
        80% {
            transform: translate3d(calc(-80vw - 120px), -10px, 0) rotate(288deg);
        }
        100% {
            transform: translate3d(calc(-100vw - 150px), 0, 0) rotate(360deg);
        }
    }
`;

// export.
export default WhoIAm;
