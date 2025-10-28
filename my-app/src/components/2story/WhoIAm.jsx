import styled from 'styled-components';
import React, { memo, useEffect, useRef, useState } from 'react';
import { CARDS, LONGEST_ROLE_CH } from './cardsData.jsx';
import { useTypewriter } from '@/hooks/useTypewriter';
import engineeringGuy from '@/images/story/engineeringGuy.jpg';
import ucfCampus from '@/images/story/ucf4.jpg';
import creativeDesk from '@/images/story/mySetUp.jpg';

const TYPE_SPEED = 40;       // ms/char (typing)
const DELETE_SPEED = 30;     // ms/char (deleting)
const EXTRA_PAUSE = 150;     // pause before revealing content

const WhoIAm = memo(() => {
  const [index, setIndex] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [startInitial, setStartInitial] = useState(false);
  const [slideDirection, setSlideDirection] = useState(null); // 'left' or 'right'
  const [previousIndex, setPreviousIndex] = useState(0);
  const [showImages, setShowImages] = useState(true);
  const nextIdxRef = useRef(0);
  const triggerRef = useRef(null);

  // Hook: start by typing the current role
  const role = CARDS[index].role;
  const { out, phase, setPhase, resetTo } = useTypewriter(role, {
      typeMs: TYPE_SPEED,
      deleteMs: DELETE_SPEED,
      start: startInitial,
      mode: 'type',
      onDone: (donePhase) => {
          if (donePhase === 'type') {
              setFrozen(true);
              setShowContent(true);
              setPhase('idle');
          }
          if (donePhase === 'delete') {
              // Switch to next role
              const ni = nextIdxRef.current;
              const nextRole = CARDS[ni].role;
              setIndex(ni);
              resetTo('');
              setPhase('type');
          }
      }
  });

  // Preload first card image
  useEffect(() => {
      const i = new Image();
      i.src = CARDS[0].image;
  }, []);

  // Start initial typing when H2 is in view
  useEffect(() => {
      const el = triggerRef.current;
      if (!el || startInitial) return;
      
      const obs = new IntersectionObserver(
          ([entry]) => {
              if (entry.isIntersecting) {
                  setStartInitial(true);
                  obs.disconnect();
              }
          },
          { threshold: 0.25, rootMargin: '0px 0px -30% 0px' }
      );
      
      obs.observe(el);
      return () => obs.disconnect();
  }, [startInitial]);

  // Nav function
  const goTo = (nextIndex) => {
      if (phase === 'delete') return; // Ignore rapid clicks during delete
      nextIdxRef.current = nextIndex;
      
      // Determine slide direction
      const direction = nextIndex > index ? 'right' : 'left';
      setSlideDirection(direction);
      
      // Store previous index for animation tracking
      setPreviousIndex(index);
      
      // First slide out existing content
      setIsSlidingOut(true);
      
      // Wait for slide-out animation, then hide images and start deleting text
      setTimeout(() => {
          setShowImages(false); // Hide images during text transition
          setShowContent(false);
          setIsSlidingOut(false);
          setFrozen(false);
          setPhase('delete');
      }, 600); // Match slide-out duration
  };

  const next = () => goTo((index + 1) % CARDS.length);
  const prev = () => goTo((index - 1 + CARDS.length) % CARDS.length);

  // Get current card's images for the zigzag
  const getCurrentImageSet = () => {
    const currentCard = CARDS[index];
    
    // Each card has 3 images in its array
    return [
      { image: currentCard.images[0], position: 'top-left', z: 1 },
      { image: currentCard.images[1], position: 'middle-right', z: 2 },
      { image: currentCard.images[2], position: 'bottom-left', z: 3 },
    ];
  };

  const card = CARDS[index];
  const imageSet = getCurrentImageSet();
  
  // Track if we just switched cards (for slide-in animation)
  const isNewCardSet = index !== previousIndex;
  
  // Show images when new card set and update previousIndex after slide-in
  useEffect(() => {
      if (isNewCardSet && !isSlidingOut && !showImages) {
          // Show images for new card (they will slide in)
          setShowImages(true);
          
          // Update previousIndex after slide-in completes
          const timer = setTimeout(() => {
              setPreviousIndex(index);
          }, 500); // Wait for slide-in animation to complete (400ms + buffer)
          
          return () => clearTimeout(timer);
      }
  }, [isNewCardSet, isSlidingOut, index, showImages]);

    return (
        <SectionWrap>
            <PageTitle>Who I Am</PageTitle>

            <Grid>
                <LeftCol>
                    <ImageStack $slideDirection={slideDirection} $isSlidingOut={isSlidingOut}>
                        {showImages && imageSet.map((img, i) => {
                            let positioning = {};
                            
                            if (img.position === 'top-left') {
                                positioning = { top: 0, left: 0 };
                            } else if (img.position === 'middle-right') {
                                positioning = { top: '50%', right: 0 };
                            } else if (img.position === 'bottom-left') {
                                positioning = { bottom: 0, left: 0 };
                            }
                            
                            // Determine individual image slide direction based on position
                            let imgSlideDirection = 'left'; // default
                            if (img.position === 'middle-right') {
                                imgSlideDirection = 'right';
                            } else if (img.position === 'top-left' || img.position === 'bottom-left') {
                                imgSlideDirection = 'left';
                            }
                            
                            // Get bubbles for this specific image
                            const imageBubbles = CARDS[index].imageBubbles ? CARDS[index].imageBubbles[i] : [];
                            
                            return (
                                <ImgShell
                                    key={`${img.image}-${index}-${i}`}
                                    $imgPosition={img.position}
                                    $isSlidingOut={isSlidingOut}
                                    $slideDirection={slideDirection}
                                    $imgSlideDirection={imgSlideDirection}
                                    $isNewCardSet={isNewCardSet}
                                    style={{
                                        ...positioning,
                                        zIndex: img.z,
                                    }}
                                >
                                    <StyledImage src={img.image} alt={img.position} />
                                    {imageBubbles && imageBubbles.length > 0 && (
                                        <BubbleContainer $position={img.position}>
                                            {imageBubbles.map((bubbleText, bi) => (
                                                <SpeechBubble 
                                                    key={bi}
                                                    $parentPosition={img.position}
                                                >
                                                    {bubbleText}
                                                </SpeechBubble>
                                            ))}
                                        </BubbleContainer>
                                    )}
                                </ImgShell>
                            );
                        })}
                    </ImageStack>
                </LeftCol>

                <Spacer />
                
                <RightCol>
                    <ContentBox>
                        <H2 ref={triggerRef}>
                            <StaticA>A&nbsp;</StaticA>
                            <TypedBox style={{ minWidth: `${LONGEST_ROLE_CH}ch` }}>
                                {frozen ? (
                                    <LiveRegion aria-live="polite">
                                        <FrozenRole>
                                            {card.role}
                                            <Caret aria-hidden>_</Caret>
                                        </FrozenRole>
                                    </LiveRegion>
                                ) : (
                                    <LiveRegion aria-live="polite">
                                        <GradientSpan>
                                            {out}
                                            <Caret aria-hidden>_</Caret>
                                        </GradientSpan>
                                    </LiveRegion>
                                )}
                            </TypedBox>
                        </H2>

                        <ContentWrapper
                          className={`${isSlidingOut ? 'slideOut' : ''} ${showContent ? 'visible' : 'hidden'}`}
                        >
                          <OneLiner>{card.oneLiner}</OneLiner>
                          <SectionTitle>{card.sectionTitle}</SectionTitle>
                          <BulletList>
                            {card.bullets.map((b, i) => (
                              <BulletItem key={i}>{b}</BulletItem>
                            ))}
                          </BulletList>
                          <Closer>{card.closer}</Closer>
                        </ContentWrapper>

                    </ContentBox>
                    <NavRow>
                        <NavBtn onClick={prev} aria-label="Previous" disabled={isSlidingOut || phase === 'delete'}>‹</NavBtn>
                        <PageIndicator>
                            {index + 1} / {CARDS.length}
                        </PageIndicator>
                        <NavBtn onClick={next} aria-label="Next" disabled={isSlidingOut || phase === 'delete'}>›</NavBtn>
                    </NavRow>
                </RightCol>
            </Grid>
        
        </SectionWrap>
    );
});

export default WhoIAm;

/* ========== styled ========== */

const SectionWrap = styled.section`
  padding: 4rem 6rem 8rem;
  background: linear-gradient(to bottom,
    rgb(13,7,27) 0%, rgb(13,7,27) 25%, rgb(30,20,55) 50%,
    rgb(45,30,80) 65%, rgb(65,45,110) 80%, rgb(85,60,135) 90%, rgb(100,70,150) 100%);
  min-height: 100vh;
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0s !important;
      transition-duration: 0s !important;
    }
  }
`;

const PageTitle = styled.div`
  margin: 0 0 3rem;
  font-weight: 800;
  text-align: center;
  font-size: 5rem;
  opacity: 0.7;
  background: linear-gradient(135deg, #fff 0%, rgba(200,180,255,.95) 50%, rgba(150,200,255,1) 100%);
  -webkit-background-clip: text; 
  background-clip: text; 
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 45% 2.5% 52.5%;
    align-items: center;
    justify-items: start;
    margin: 0 auto;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
        align-items: start;
    }
`;

const LeftCol = styled.div`
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
  justify-content: center;
`;

const ImageStack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

const ImgShell = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  
  /* Calculate which direction this image should slide based on navigation direction */
  ${props => {
    const isMiddleRight = props.$imgPosition === 'middle-right';
    const baseTransform = isMiddleRight ? 'translateY(-50%)' : '';
    
    // Always apply the base transform for middle-right images
    let styles = '';
    if (baseTransform) {
      styles += `transform: ${baseTransform};`;
    }
    
    // When sliding out (old images)
    if (props.$isSlidingOut) {
      // When sliding out, images on the left go left, images on the right go right
      if (props.$imgSlideDirection === 'right') {
        return `
          ${styles}
          animation: slideOutRight${isMiddleRight ? 'Vert' : ''} 400ms ease-out forwards;
        `;
      } else {
        return `
          ${styles}
          animation: slideOutLeft${isMiddleRight ? 'Vert' : ''} 400ms ease-out forwards;
        `;
      }
    }
    
    // When sliding in (new images) - only when NOT sliding out
    if (props.$isNewCardSet && !props.$isSlidingOut) {
      // New images slide in from the same direction they'll slide out to
      if (props.$imgSlideDirection === 'right') {
        return `
          ${styles}
          animation: slideInRight${isMiddleRight ? 'Vert' : ''} 400ms ease-out forwards;
        `;
      } else {
        return `
          ${styles}
          animation: slideInLeft${isMiddleRight ? 'Vert' : ''} 400ms ease-out forwards;
        `;
      }
    }
    
    return styles;
  }}
  
  @keyframes slideOutRight {
    0% { transform: translateX(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateX(80%); opacity: 0; }
  }
  
  @keyframes slideOutRightVert {
    0% { transform: translateY(-50%) translateX(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateY(-50%) translateX(80%); opacity: 0; }
  }
  
  @keyframes slideOutLeft {
    0% { transform: translateX(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateX(-80%); opacity: 0; }
  }
  
  @keyframes slideOutLeftVert {
    0% { transform: translateY(-50%) translateX(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateY(-50%) translateX(-80%); opacity: 0; }
  }
  
  @keyframes slideInRight {
    0% { transform: translateX(80%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInRightVert {
    0% { transform: translateY(-50%) translateX(80%); opacity: 0; }
    100% { transform: translateY(-50%) translateX(0); opacity: 1; }
  }
  
  @keyframes slideInLeft {
    0% { transform: translateX(-80%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideInLeftVert {
    0% { transform: translateY(-50%) translateX(-80%); opacity: 0; }
    100% { transform: translateY(-50%) translateX(0); opacity: 1; }
  }
`;

const StyledImage = styled.img`
  width: 340px;
  height: 340px;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  border: 3px solid #fff;
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  display: block;
`;

const RightCol = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

const ContentBox = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  overflow: hidden;
`;

const LiveRegion = styled.span`
  position: relative;
`;

const GradientSpan = styled.span`
  background: linear-gradient(135deg, rgba(255,255,255,.95), rgba(200,180,255,.9));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavRow = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
`;

const PageIndicator = styled.div`
  /* Typography */
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.5px;
  
  /* Spacing */
  padding: 0.25rem 1rem;
  
  /* Style */
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  
  /* Effects */
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const NavBtn = styled.button`
  /* Dimensions */
  width: 48px;
  height: 48px;
  border-radius: 50%;
  
  /* Layout */
  display: grid;
  place-items: center;
  
  /* Typography */
  font-size: 1.6rem;
  font-weight: 300;
  
  /* Colors */
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  
  /* Effects */
  cursor: pointer;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    background: rgba(150, 200, 255, 0.15);
    border-color: rgba(150, 200, 255, 0.4);
    color: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 16px rgba(150, 200, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: 0 2px 6px rgba(150, 200, 255, 0.15);
  }
  
  /* Disabled state for when animation is happening */
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

// Title
const H2 = styled.div`
    margin-bottom: 0.25rem;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  display: flex;
  align-items: center;       /* vertically center the "A" with the typed text */
  gap: 0.5rem;
`;

// Static "A" that doesn't move
const StaticA = styled.span`
  color: rgba(255,255,255,.9);
  font-weight: 800;
  font-size: clamp(2.5rem, 5vw, 3rem);
  line-height: 1;
  align-self: flex-start;
`;

// Container for typed text
const TypedBox = styled.span`
  display: inline-block;
  min-width: 18ch;             /* reserve space for the longest title */
  position: relative;
`;

// Invisible placeholder to stabilize width before typing starts
const Ghost = styled.span`
  visibility: hidden;
`;

// Frozen role display (when typing is complete)
const FrozenRole = styled.span`
  background: linear-gradient(135deg, rgba(255,255,255,.95), rgba(200,180,255,.9));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Caret = styled.span`
  display: inline-block;
  margin-left: 2px;
  -webkit-text-fill-color: rgba(200,180,255,.9);
  animation: blink 1s steps(1) infinite;
  
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  min-height: 580px;
  transition: opacity 400ms ease, transform 400ms ease;
  opacity: 0;
  transform: translateY(12px);
  
  > * {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1), 
                transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
    
    > * {
      opacity: 1;
      transform: translateY(0);
    }
    
    > *:nth-child(1) { transition-delay: 260ms; }
    > *:nth-child(2) { transition-delay: 520ms; }
    > *:nth-child(3) { transition-delay: 780ms; }
    > *:nth-child(4) { transition-delay: 1040ms; }
  }

  &.hidden {
    opacity: 0;
    transform: translateY(12px);
    pointer-events: none;
    
    > * {
      opacity: 0;
      transform: translateY(12px);
    }
  }

  &.slideOut {
    opacity: 0;
    transform: translateY(-16px);
    
    > * {
      opacity: 0;
      transform: translateY(-16px);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    > * {
      transition: none;
      opacity: 1;
      transform: none;
    }
    
    &.visible, &.hidden, &.slideOut {
      transition: none;
    }
  }
`;

// One-liner section
const OneLiner = styled.div`
  text-align: justify;
  line-height: 1.8; 
  color: rgba(255,255,255,.88);
  font-size: clamp(0.85rem, 1.8vw, 1.275rem);
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  strong {
    font-weight: 600;
    color: rgba(150, 200, 255, 1);
  }
`;

// Section title for "What I'm Up To Right Now"
const SectionTitle = styled.div`
    margin: 1rem 0;
    font-size: clamp(1.5rem, 2.2vw, 2.5rem);
    font-weight: 600;
    color: rgba(200, 180, 255, 1);
`;

// Bullet list container
const BulletList = styled.div`
  padding: 0;
  list-style: none;
`;

// Individual bullet item
const BulletItem = styled.div`
  position: relative;
  padding-left: 2.5rem;
  margin-bottom: 1rem;
  color: rgba(255,255,255,.85);
  font-size: clamp(1rem, 1.6vw, 1.275rem);
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  &::before {
    content: '✦';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(150, 200, 255, 0.9);
    font-size: 1.5rem;
    font-weight: 400;
    animation: twinkle 2s ease-in-out infinite;
    animation-delay: ${props => props.$delay || 0}s;
  }
  
  @keyframes twinkle {
    0%, 100% { 
      opacity: 0.6; 
    }
    50% { 
      opacity: 1; 
    }
  }
`;

// Closer paragraph
const Closer = styled.div`
    text-align: justify;
  line-height: 1.8; 
  color: rgba(255,255,255,.88);
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  
  strong {
    font-weight: 600;
    color: rgba(150, 200, 255, 1);
  }
`;

// Speech bubble container
const BubbleContainer = styled.div`
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
  transform: scale(0.9);
  min-width: 0;
  max-width: calc(100% - 20px);
  
  /* Position based on image position */
  ${props => props.$position === 'top-left' && `
    top: -20px;
    left: -25px;
  `}
  
  ${props => props.$position === 'middle-right' && `
    top: -20px;
    right: -20px;
  `}
  
  ${props => props.$position === 'bottom-left' && `
    bottom: -15px;
    left: -25px;
  `}
  
  /* Pop-in animation for all bubbles */
  > * {
    opacity: 0;
    transform: translateY(-8px) scale(0.9);
    animation: popIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  > *:nth-child(1) { animation-delay: 200ms; }
  > *:nth-child(2) { animation-delay: 400ms; }
`;

const SpeechBubble = styled.div`
  position: relative;
  width: max-content;
  max-width: max-content;
  padding: 10px 18px 8px 18px;
  border-radius: 18px;
  color: white;
  font-weight: 500;
  line-height: 1.3;
  font-size: 1.1rem;
  text-align: justify;
  background: #007AFF;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
  
  @keyframes popIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Right-align bubbles when on right side */
  ${props => props.$parentPosition === 'middle-right' && `
    margin-left: auto;
  `}
  
  /* Left-align bubbles when on left side */
  ${props => (props.$parentPosition === 'top-left' || props.$parentPosition === 'bottom-left') && `
    margin-right: auto;
  `}
  
  /* Speech bubble tail - only on the last bubble */
  &:last-child::after {
    position: absolute;
    content: "";
    width: 15.515px;
    height: 17.5px;
    z-index: 1;
    background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15.515px' height='17.5px' viewBox='32.484 17.5 15.515 17.5' enable-background='new 32.484 17.5 15.515 17.5'><path fill='%23007AFF' d='M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'/></svg>") no-repeat;
    background-size: 15.515px 17.5px;
    
    /* Tail positioning based on parent bubble container position */
    ${props => {
      const parentPosition = props.$parentPosition;
      if (parentPosition === 'top-left' || parentPosition === 'bottom-left') {
        return `
          left: -6px;
          bottom: -1px;
        `;
      } else {
        return `
          right: -6px;
          bottom: -1px;
          transform: scaleX(-1);
        `;
      }
    }}
  }
`;

const Spacer = styled.div`
  width: 100%;
  height: 100%;
`;