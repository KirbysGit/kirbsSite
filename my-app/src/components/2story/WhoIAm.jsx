import styled from 'styled-components';
import React, { memo, useEffect, useRef, useState } from 'react';
import { CARDS, LONGEST_ROLE_CH } from './cardsData.jsx';
import { useTypewriter } from '@/hooks/useTypewriter';

const TYPE_SPEED = 90;       // ms/char (typing)
const DELETE_SPEED = 65;     // ms/char (deleting)
const EXTRA_PAUSE = 150;     // pause before revealing content

const WhoIAm = memo(() => {
    const [index, setIndex] = useState(0);
    const [frozen, setFrozen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [isSlidingOut, setIsSlidingOut] = useState(false);
    const [startInitial, setStartInitial] = useState(false);
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
        
        // First slide out existing content
        setIsSlidingOut(true);
        
        // Wait for slide-out animation, then start deleting text
        setTimeout(() => {
            setShowContent(false);
            setIsSlidingOut(false);
            setFrozen(false);
            setPhase('delete');
        }, 400); // Match slideOut duration
    };

    const next = () => goTo((index + 1) % CARDS.length);
    const prev = () => goTo((index - 1 + CARDS.length) % CARDS.length);

    // Image shuffle transforms
    const decor = (i) => {
        const d = (i - index + CARDS.length) % CARDS.length;
        const tx = Math.min(d * 14, 42);
        const rot = Math.min(d * 2.5, 10);
        const z = CARDS.length - d;
        return { tx, rot, z };
    };

    const card = CARDS[index];

    return (
        <SectionWrap>
            <PageTitle>Who I Am</PageTitle>

            <Grid>
                <LeftCol>
                    <ImageStack>
                        {CARDS.map((c, i) => {
                            const { tx, rot, z } = decor(i);
                            const active = i === index;
                            return (
                                <ImgShell
                                    key={c.image}
                                    style={{
                                        zIndex: z,
                                        transform: `translateX(${active ? 0 : tx}px) rotate(${active ? 0 : rot}deg)`,
                                        opacity: active ? 1 : 0.9
                                    }}
                                >
                                    <StyledImage src={c.image} alt={c.imageAlt} />
                                </ImgShell>
                            );
                        })}
                    </ImageStack>
                </LeftCol>
                
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

                        {showContent && (
                            <ContentWrapper className={isSlidingOut ? 'slideOut' : ''}>
                                <OneLiner>{card.oneLiner}</OneLiner>
                                <SectionTitle>What I'm Up To Right Now...</SectionTitle>
                                <BulletList>
                                    {card.bullets.map((b, i) => (
                                        <BulletItem key={i}>{b}</BulletItem>
                                    ))}
                                </BulletList>
                                <Closer>{card.closer}</Closer>
                            </ContentWrapper>
                        )}
                    </ContentBox>
                </RightCol>
            </Grid>
            
            <NavRow>
                <NavBtn onClick={prev} aria-label="Previous">‹</NavBtn>
                <NavBtn onClick={next} aria-label="Next">›</NavBtn>
            </NavRow>
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

const PageTitle = styled.h1`
  margin: 0 0 3rem;
  font-weight: 800;
  opacity: 0.75;
  text-align: center;
  font-size: clamp(3rem, 8vw, 6rem);
  background: linear-gradient(135deg, #fff 0%, rgba(200,180,255,.95) 50%, rgba(150,200,255,1) 100%);
  -webkit-background-clip: text; 
  background-clip: text; 
  -webkit-text-fill-color: transparent;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 520px 1fr;
  gap: clamp(3rem, 6vw, 7rem);
  align-items: start;
  justify-items: start;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const LeftCol = styled.div`
  width: 520px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImageStack = styled.div`
  position: relative;
  width: 100%;
  height: 520px;
`;

const ImgShell = styled.div`
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 100%;
  transition: transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 280ms ease;
  will-change: transform, opacity;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
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
`;

const ContentBox = styled.div`
  display: grid;
  gap: 1rem;
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
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const NavBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  border: 2px solid rgba(255,255,255,.2);
  background: rgba(255,255,255,.08);
  color: rgba(255,255,255,.75);
  transition: transform 200ms ease, background 200ms ease, color 200ms ease, border-color 200ms ease;
  
  &:hover {
    transform: scale(1.08);
    background: rgba(150,200,255,.25);
    color: #fff;
    border-color: rgba(150,200,255,.5);
  }
  
  &:active {
    transform: scale(.95);
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
  animation: slideIn 800ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  
  > * {
    opacity: 0;
    transform: translateY(16px);
    animation: slideIn 800ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  }
  
  > *:nth-child(1) { animation-delay: 260ms; }    /* OneLiner */
  > *:nth-child(2) { animation-delay: 520ms; }   /* SectionTitle */
  > *:nth-child(3) { animation-delay: 780ms; }   /* BulletList */
  > *:nth-child(4) { animation-delay: 1040ms; }   /* Closer */
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &.slideOut {
    animation: slideOut 400ms cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-16px);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    > * {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;

// One-liner section
const OneLiner = styled.div`
    text-align: justify;
  line-height: 1.8; 
  color: rgba(255,255,255,.88);
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  
  strong {
    font-weight: 600;
    color: rgba(150, 200, 255, 1);
  }
`;

// Section title for "What I'm Up To Right Now"
const SectionTitle = styled.div`
    margin: 1rem 0;
    font-size: clamp(1.5rem, 2.5vw, 2rem);
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
  font-size: clamp(1rem, 1.8vw, 1.3rem);
  line-height: 1.6;
  
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
  line-height: 1.8; 
  color: rgba(255,255,255,.88);
  font-size: clamp(0.9rem, 2vw, 1.3rem);
  
  strong {
    font-weight: 600;
    color: rgba(150, 200, 255, 1);
  }
`;
