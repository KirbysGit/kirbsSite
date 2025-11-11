// whoiam.jsx

// this component gives a professional background into me, and who i am.
// swaps between cards, showing specific info about me with some photos for personalization.

// imports.
import styled, { keyframes, css } from 'styled-components';
import { useTypewriter } from '@/components/2whoiam/useTypewriter.js';
import { CARDS, LONGEST_ROLE_CH } from '../../data/aboutData.jsx';
import React, { memo, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useComponentPerformance } from '../../hooks/useComponentPerformance';

// space elements images.
import satellite1 from '@/images/2story/satellite1.png';
import satellite2 from '@/images/2story/satellite2.png';
import spaceStation from '@/images/2story/spacestation.png';

// extra vars for animation.
const IMG_MS = 400;           // image slide duration
const BUFFER_MS = 40;         // extra buffer for animation end
const TYPE_SPEED = 40;        // ms/char (typing)
const DELETE_SPEED = 30;      // ms/char (deleting)

// ========== Keyframes - extracted outside components to avoid re-creation ==========

// Image slide animations
const slideOutRight = keyframes`
    0% { transform: translateX(0) translateZ(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateX(80%) translateZ(0); opacity: 0; }
`;

const slideOutRightVert = keyframes`
    0% { transform: translateY(-50%) translateX(0) translateZ(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateY(-50%) translateX(80%) translateZ(0); opacity: 0; }
`;

const slideOutLeft = keyframes`
    0% { transform: translateX(0) translateZ(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateX(-80%) translateZ(0); opacity: 0; }
`;

const slideOutLeftVert = keyframes`
    0% { transform: translateY(-50%) translateX(0) translateZ(0); opacity: 1; }
    50% { opacity: 0; }
    100% { transform: translateY(-50%) translateX(-80%) translateZ(0); opacity: 0; }
`;

const slideInRight = keyframes`
    0% { transform: translateX(80%) translateZ(0); opacity: 0; }
    100% { transform: translateX(0) translateZ(0); opacity: 1; }
`;

const slideInRightVert = keyframes`
    0% { transform: translateY(-50%) translateX(80%) translateZ(0); opacity: 0; }
    100% { transform: translateY(-50%) translateX(0) translateZ(0); opacity: 1; }
`;

const slideInLeft = keyframes`
    0% { transform: translateX(-80%) translateZ(0); opacity: 0; }
    100% { transform: translateX(0) translateZ(0); opacity: 1; }
`;

const slideInLeftVert = keyframes`
    0% { transform: translateY(-50%) translateX(-80%) translateZ(0); opacity: 0; }
    100% { transform: translateY(-50%) translateX(0) translateZ(0); opacity: 1; }
`;

// Bubble pop-in animation
const popIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.9) translateZ(0);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1) translateZ(0);
    }
`;

// Twinkle animation for bullet points aaeda
const twinkle = keyframes`
    0%, 100% { 
        opacity: 0.6; 
    }
    50% { 
        opacity: 1; 
    }
`;

// Blink animation for caret
const blink = keyframes`
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
`;

// Space station float animation
const spaceStationFloat = keyframes`
    0%, 100% { 
        transform: translate3d(0, 0, 0) rotate(0deg);
    }
    50% { 
        transform: translate3d(0, -8px, 0) rotate(2deg);
    }
`;

// Satellite 1 float animation
const satellite1Float = keyframes`
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
`;

// Satellite 2 float animation
const satellite2Float = keyframes`
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
`;

// svg chevrons (too lazy to do FontAwesome).
const ChevronRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const ChevronLeft = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

// Optimized image item component - separated to allow proper memoization
const ImageItem = memo(({ img, index, card, cardIndex, isSlidingOut, slideDirection, isNewCardSet, loadedImages, onImageLoad }) => {
    // Memoize positioning calculation
    const positioning = useMemo(() => {
        if (img.position === 'top-left') {
            return { top: 0, left: 0 };
        } else if (img.position === 'middle-right') {
            return { top: '50%', right: 0 };
        } else if (img.position === 'bottom-left') {
            return { bottom: 0, left: 0 };
        }
        return {};
    }, [img.position]);
    
    // Memoize slide direction calculation
    const imgSlideDirection = useMemo(() => {
        return img.position === 'middle-right' ? 'right' : 'left';
    }, [img.position]);
    
    // Memoize bubbles lookup
    const imageBubbles = useMemo(() => {
        return card.imageBubbles ? card.imageBubbles[index] : [];
    }, [card.imageBubbles, index]);
    
    // Create unique image key for tracking load state
    const imageKey = useMemo(() => `${img.image}-${cardIndex}-${index}`, [img.image, cardIndex, index]);
    const isImageLoaded = loadedImages.has(imageKey);
    
    // Memoized callback ref - checks if image is already loaded when element mounts
    const imageRefCallback = useCallback((imgElement) => {
        if (imgElement && imgElement.complete && !isImageLoaded) {
            onImageLoad(imageKey);
        }
    }, [imageKey, isImageLoaded, onImageLoad]);
    
    // Memoized handleLoad callback
    const handleLoad = useCallback(() => {
        onImageLoad(imageKey);
    }, [imageKey, onImageLoad]);
    
    return (
        <ImgShell
            $imgPosition={img.position}
            $isSlidingOut={isSlidingOut}
            $slideDirection={slideDirection}
            $imgSlideDirection={imgSlideDirection}
            $isNewCardSet={isNewCardSet}
            $isImageLoaded={isImageLoaded}
            data-animating={isSlidingOut || isNewCardSet ? "true" : "false"}
            style={{
                ...positioning,
                zIndex: img.z,
            }}
        >
            {/* styled image */}
            <StyledImage 
                ref={imageRefCallback}
                src={img.image} 
                alt={img.position} 
                decoding="async" 
                loading="eager"
                onLoad={handleLoad}
                $isLoaded={isImageLoaded}
            />
            {/* bubble container */}
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
});

// whoiam component.
const WhoIAm = memo(() => {
    // Performance monitoring
    useComponentPerformance('WhoIAm', process.env.NODE_ENV === 'development');

    // state management.
    const [index, setIndex] = useState(0);						    // current card index.
    const [frozen, setFrozen] = useState(false);					// whether the text is frozen.
    const [showImages, setShowImages] = useState(true);			    // whether the images are shown.
    const [previousIndex, setPreviousIndex] = useState(0);		    // previous card index.
    const [showContent, setShowContent] = useState(false);		    // whether the content is shown.
    const [isSlidingOut, setIsSlidingOut] = useState(false);		// whether the content is sliding out.
    const [startInitial, setStartInitial] = useState(false);		// whether the initial animation has started.
    const [slideDirection, setSlideDirection] = useState(null); 	// 'left' or 'right'
    const [loadedImages, setLoadedImages] = useState(new Set());	// track which images have loaded

    // refs.
    const nextIdxRef = useRef(0);									// next card index.
    const triggerRef = useRef(null);								// trigger reference.

    // our hook for the typewriter effect - memoize role to avoid recalculation
    const role = useMemo(() => CARDS[index].role, [index]);
    const { out, phase, setPhase, resetTo } = useTypewriter(role, {
        typeMs: TYPE_SPEED,											    // ms/char (typing)
        deleteMs: DELETE_SPEED,										    // ms/char (deleting)
        start: startInitial,											// whether the initial animation has started.
        mode: 'type',													// current phase: 'type' | 'delete' | 'idle'
        onDone: (donePhase) => {										// callback when a phase completes.
            if (donePhase === 'type') {
                setFrozen(true);										// freeze the text.
                setShowContent(true);									// show the content.
                setPhase('idle');										// set the phase to idle.
            }
            if (donePhase === 'delete') {
                const ni = nextIdxRef.current;						    // next card index.
                setIndex(ni);											// set the index to the next card.
                resetTo('');											// reset the text.
                setPhase('type');										// set the phase to type.
            }
        }
    });

    // start initial typing when H2 is in view.
    useEffect(() => {
        // get the trigger element.
        const el = triggerRef.current;
        if (!el || startInitial) return;

        // use observer to start initial typing when H2 is in view.
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartInitial(true);
                    obs.disconnect();
                }
            },
            { 
                threshold: 0.25, 
                rootMargin: '0px 0px -30% 0px' 
            }
        );

        // observe the trigger element.
        obs.observe(el);

        // disconnect observer when component unmounts.
        return () => obs.disconnect();
    }, [startInitial]);

    // navigation function - memoized to avoid recreation
    const goTo = useCallback((nextIndex) => {
        // ignore clicks during delete.
        if (phase === 'delete') return;

        // store the next index.
        nextIdxRef.current = nextIndex;
        
        // determine & set slide direction.
        const direction = nextIndex > index ? 'right' : 'left';
        setSlideDirection(direction);
        
        // store previous index for animation tracking.
        setPreviousIndex(index);
        
        // first slide out existing content.
        setIsSlidingOut(true);
        
        // use requestAnimationFrame to sync with animation end.
        const onEnd = () => {
            setShowImages(false);   // hide images during text transition.
            setShowContent(false);  // hide content during text transition.
            setIsSlidingOut(false); // stop sliding out.
            setFrozen(false);       // unfreeze the text.
            setPhase('delete');     // set the phase to delete.
        };
        
        // use setTimemout to sync with the end of our animation.
        setTimeout(() => {
            requestAnimationFrame(onEnd);
        }, IMG_MS + BUFFER_MS);
    }, [phase, index]);

    // next function - memoized
    const next = useCallback(() => goTo((index + 1) % CARDS.length), [goTo, index]);

    // prev function - memoized
    const prev = useCallback(() => goTo((index - 1 + CARDS.length) % CARDS.length), [goTo, index]);

    // get current card's images for the zigzag - memoized
    const getCurrentImageSet = useCallback(() => {
        const currentCard = CARDS[index];
        
        // each card has 3 images in its array.
        return [
        { image: currentCard.images[0], position: 'top-left', z: 1 },
        { image: currentCard.images[1], position: 'middle-right', z: 2 },
        { image: currentCard.images[2], position: 'bottom-left', z: 3 },
        ];
    }, [index]);

    // get the current card - memoized
    const card = useMemo(() => CARDS[index], [index]);

    // get the current image set - memoized
    const imageSet = useMemo(() => getCurrentImageSet(), [getCurrentImageSet]);
    
    // track if we just switched cards (for slide-in animation) - memoized
    const isNewCardSet = useMemo(() => index !== previousIndex, [index, previousIndex]);
    
    // Memoized image load handler to prevent infinite re-renders
    const handleImageLoad = useCallback((imageKey) => {
        setLoadedImages(prev => {
            // Only update if image isn't already loaded (prevents unnecessary re-renders)
            if (prev.has(imageKey)) return prev;
            const newSet = new Set(prev);
            newSet.add(imageKey);
            return newSet;
        });
    }, []);
    
    // Reset loaded images when card changes (before showing new images)
    useEffect(() => {
        if (isNewCardSet) {
            setLoadedImages(new Set());
        }
    }, [isNewCardSet]);
    
    // show images when new card set and update previousIndex after slide-in.
    useEffect(() => {
        // show images for new card (they will slide in).
        if (isNewCardSet && !isSlidingOut && !showImages) {
            setShowImages(true);
            
            const timer = setTimeout(() => {
                setPreviousIndex(index);
            }, IMG_MS + BUFFER_MS);
            
            return () => clearTimeout(timer);
        }
    }, [isNewCardSet, isSlidingOut, index, showImages]);

    return (
        <SectionWrap id="who-i-am">
            {/* space elements - satellites and space station */}
            <SpaceStation />
            <Satellite1 />
            <Satellite2 />
            
            {/* page title - snap point for centering */}
            <PageTitle data-snap-title>Who I Am</PageTitle>

            {/* grid container */}
            <Grid>
                {/* left column (images w/ bubbles) */}
                <LeftCol>
                    {/* image stack w/ animation handling*/}
                    <ImageStack $slideDirection={slideDirection} $isSlidingOut={isSlidingOut}>
                        {/* map over the image set */}
                        {showImages && imageSet.map((img, i) => (
                            <ImageItem
                                    key={`${img.image}-${index}-${i}`}
                                img={img}
                                index={i}
                                card={card}
                                cardIndex={index}
                                isSlidingOut={isSlidingOut}
                                slideDirection={slideDirection}
                                isNewCardSet={isNewCardSet}
                                loadedImages={loadedImages}
                                onImageLoad={handleImageLoad}
                            />
                        ))}
                    </ImageStack>
                </LeftCol>

                {/* spacer because grid was being annoying with gaps*/}
                <Spacer />
                
                {/* right column (content) */}
                <RightCol>
                    {/* content box */}
                    <ContentBox>
                        {/* title */}
                        <H2 ref={triggerRef}>
                            {/* static "A" should not move*/}
                            <StaticA>A&nbsp;</StaticA>  
                         {/* typed box for the role */}
                             <TypedBox style={{ minWidth: `${LONGEST_ROLE_CH}ch` }}>
                                 <LiveRegion aria-live="polite">
                                     <RoleText $roleIndex={index}>{frozen ? card.role : out}</RoleText>
                                     <Caret aria-hidden $paused={isSlidingOut || phase === 'delete'}>_</Caret>
                                 </LiveRegion>
                             </TypedBox>
                        </H2>

                        {/* content wrapper */}
                        <ContentWrapper
                          className={`${isSlidingOut ? 'slideOut' : ''} ${showContent ? 'visible' : 'hidden'}`}
                        >
                          {/* one liner */}
                          <OneLiner>{card.oneLiner}</OneLiner>
                          {/* section title */}
                          <SectionTitle>{card.sectionTitle}</SectionTitle>
                          {/* bulleted list */}
                          <BulletList $cardIndex={index}>
                            {card.bullets.map((b, i) => (
                              <BulletItem key={i}>{b}</BulletItem>
                            ))}
                          </BulletList>
                          {/* closer */}
                          <Closer>{card.closer}</Closer>
                        </ContentWrapper>

                    </ContentBox>

                    {/* navigation row */}
                    <NavRow>
                        {/* previous button */}
                        <NavBtn onClick={prev} aria-label="Previous" disabled={isSlidingOut || phase === 'delete'}>
                            <ChevronLeft />
                        </NavBtn>
                        {/* page indicator */}
                        <PageIndicator>
                            {index + 1} / {CARDS.length}
                        </PageIndicator>
                        <NavBtn onClick={next} aria-label="Next" disabled={isSlidingOut || phase === 'delete'}>
                            <ChevronRight />
                        </NavBtn>
                    </NavRow>
                </RightCol>
            </Grid>
            
        </SectionWrap>
    );
});

/* ========== styled ========== */

// entire section wrapper.
const SectionWrap = styled.section`
    /* layout */
    min-height: 110vh;
    position: relative;
    
    /* CSS containment for performance */
    contain: layout style;

    /* spacing */
    padding: 4rem 6rem 8rem;
    
    /* compact at 1600px */
    @media (max-width: 1600px) {
        padding: 3rem 4rem 4rem;
    }

    /* styles - gradient fallback */
    background: linear-gradient(
        to bottom,
        rgb(13 7 27) 0%,
        rgb(13 7 27) 15%,
        /* begin easing into lighter purples a bit earlier */
        rgb(16 10 32) 40%,
        rgb(25 18 48) 65%,
        rgb(40 28 75) 82%,
        /* finish on the seam for a perfect handoff */
        rgb(78 58 128) 92%,
        rgb(78 58 128) 100%
    );
    
    /* perceptual blend - smoother on modern browsers */
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            /* simple perceptual ramp from deep space to seam */
            rgb(13 7 27) 0%,
            rgb(78 58 128) 100%
        );
    }
    
    /* media queries */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0s !important;
            transition-duration: 0s !important;
        }
        &::after {
            display: none;
        }
    }
`;

// page title. ("Who I Am")
const PageTitle = styled.div`
    /* spacing */
    margin: 0 0 2rem;
    
    @media (max-width: 1600px) {
        margin: 0 0 1.5rem;
    }

    /* styles */
    opacity: 0.9;
    font-size: clamp(2.6rem, 4.2vw, 6rem);
    font-weight: 800;
    text-align: center;
    background: linear-gradient(135deg, #fff 0%, rgba(200,180,255,.95) 50%, rgba(150,200,255,1) 100%);
    -webkit-background-clip: text; 
    background-clip: text; 
    -webkit-text-fill-color: transparent;
`;

// grid container. left column, spacer, right column.
const Grid = styled.div`
    /* layout */
    width: 100%;
    display: grid;
    align-items: center;
    justify-items: start;
    grid-template-columns: 45% 2.5% 52.5%;
    padding-left: 2rem;
    /* spacing */
    margin: 0 auto;

    /* compact at 1600px - give more space to text */
    @media (max-width: 1600px) {
        grid-template-columns: 42% 2% 56%;
    }
`;

/* ========== left column ========== */

// left column. images w. bubbles.
const LeftCol = styled.div`
    /* layout */
    width: 100%;
    height: 100%;
    justify-content: center;
`;

// image stack set up.
const ImageStack = styled.div`
    /* layout */
    width: 100%;
    height: 100%;
    display: flex;
    overflow: visible;
    position: relative;
    align-items: center;
    justify-content: center;

    /* CSS containment for performance */
    contain: layout style;
`;

// Base image shell component
const ImgShellBase = styled.div`
    /* layout */
    --width: 360px;  
    --height: 360px;
    width: var(--width);
    height: var(--height);
    position: absolute;
    
    @media (max-width: 2000px) {
        --width: 400px;
        --height: 360px;
    }
    
    @media (max-width: 1600px) {
        --width: 320px;
        --height: 320px;
    }
  
    /* GPU acceleration - only set will-change when actually animating */
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
        
    /* Pause animations during loading */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* Only set will-change when animating to reduce initial render cost */
    &[data-animating="true"] {
        will-change: transform, opacity;
        }
        
    &[data-animating="false"] {
        will-change: auto;
    }
`;

// Variant components for different animation states - eliminates expensive conditional logic
const ImgShellSlideOutLeft = styled(ImgShellBase)`
    transform: translateZ(0);
    animation: ${slideOutLeft} 400ms ease-out forwards;
                `;

const ImgShellSlideOutLeftVert = styled(ImgShellBase)`
    transform: translateY(-50%) translateZ(0);
    animation: ${slideOutLeftVert} 400ms ease-out forwards;
                `;

const ImgShellSlideOutRight = styled(ImgShellBase)`
    transform: translateZ(0);
    animation: ${slideOutRight} 400ms ease-out forwards;
`;

const ImgShellSlideOutRightVert = styled(ImgShellBase)`
    transform: translateY(-50%) translateZ(0);
    animation: ${slideOutRightVert} 400ms ease-out forwards;
                `;

const ImgShellSlideInLeft = styled(ImgShellBase)`
    transform: translateZ(0);
    animation: ${slideInLeft} 400ms ease-out forwards;
                `;

const ImgShellSlideInLeftVert = styled(ImgShellBase)`
    transform: translateY(-50%) translateZ(0);
    animation: ${slideInLeftVert} 400ms ease-out forwards;
`;

const ImgShellSlideInRight = styled(ImgShellBase)`
    transform: translateZ(0);
    animation: ${slideInRight} 400ms ease-out forwards;
`;

const ImgShellSlideInRightVert = styled(ImgShellBase)`
    transform: translateY(-50%) translateZ(0);
    animation: ${slideInRightVert} 400ms ease-out forwards;
`;

const ImgShellStatic = styled(ImgShellBase)`
    transform: translateZ(0);
`;

const ImgShellStaticVert = styled(ImgShellBase)`
    transform: translateY(-50%) translateZ(0);
`;

// Wrapper component that selects the right variant - eliminates prop interpolation
// Memoized to prevent unnecessary re-renders when props haven't changed
const ImgShell = memo(({ $imgPosition, $isSlidingOut, $imgSlideDirection, $isNewCardSet, ...props }) => {
    const isMiddleRight = $imgPosition === 'middle-right';
    const isRight = $imgSlideDirection === 'right';
    
    if ($isSlidingOut) {
        if (isRight) {
            return isMiddleRight 
                ? <ImgShellSlideOutRightVert {...props} />
                : <ImgShellSlideOutRight {...props} />;
        } else {
            return isMiddleRight
                ? <ImgShellSlideOutLeftVert {...props} />
                : <ImgShellSlideOutLeft {...props} />;
        }
    }
    
    if ($isNewCardSet) {
        if (isRight) {
            return isMiddleRight
                ? <ImgShellSlideInRightVert {...props} />
                : <ImgShellSlideInRight {...props} />;
        } else {
            return isMiddleRight
                ? <ImgShellSlideInLeftVert {...props} />
                : <ImgShellSlideInLeft {...props} />;
        }
    }
    
    return isMiddleRight 
        ? <ImgShellStaticVert {...props} />
        : <ImgShellStatic {...props} />;
}, (prevProps, nextProps) => {
    // Custom comparison function for memo - only re-render if relevant props change
    return (
        prevProps.$imgPosition === nextProps.$imgPosition &&
        prevProps.$isSlidingOut === nextProps.$isSlidingOut &&
        prevProps.$imgSlideDirection === nextProps.$imgSlideDirection &&
        prevProps.$isNewCardSet === nextProps.$isNewCardSet &&
        prevProps.$isImageLoaded === nextProps.$isImageLoaded
    );
});

// styled image.
const StyledImage = styled.img`
    /* layout */
    display: block;
    object-fit: cover;
    aspect-ratio: 1 / 1;

    /* spacing */
    width: calc(var(--width) - 10px);
    height: calc(var(--height) - 10px);

    /* styles */
    border-radius: 12px;
    border: 3px solid #fff;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    
    /* Border and image will be controlled by parent ImgShell based on load state */
    /* Start hidden, parent will show when loaded */
    opacity: ${props => props.$isLoaded ? 1 : 0};
    border-color: ${props => props.$isLoaded ? '#fff' : 'transparent'};
    transition: opacity 150ms ease-in, border-color 150ms ease-in;
    
    /* GPU acceleration for smooth rendering */
    transform: translateZ(0);
    will-change: transform, opacity;
`;

// speech bubble container.
const BubbleContainer = styled.div`
    /* layout */
    z-index: 10;
    min-width: 0;
    display: flex;
    position: absolute;
    flex-direction: column;

    /* spacing */
    gap: 8px;   
    max-width: calc(100% - 20px);

    /* styles */
    pointer-events: none;
    transform: scale(0.9);
    
    /* positioning based on image position */
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
    
    /* cool pop in animation for the bubbles - GPU accelerated */
    > * {
        opacity: 0;
        transform: translateY(-8px) scale(0.9) translateZ(0);
        animation: ${popIn} 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        will-change: transform, opacity;
    }
    
    > *:nth-child(1) { animation-delay: 500ms; } /* starts after slide-in (400ms) */
    > *:nth-child(2) { animation-delay: 700ms; }
    
    /* Pause animations during loading */
    [data-loading="true"] > * {
        animation-play-state: paused;
    }
`;

// speech bubble.
const SpeechBubble = styled.div`
    /* layout */
    position: relative;

    /* spacing */
    width: max-content;
    max-width: max-content;
    padding: 10px 18px 8px 18px;

    /* styles */
    color: white;
    font-weight: 500;
    line-height: 1.3;
    font-size: 1.1rem;
    text-align: justify;
    border-radius: 18px;
    background: #007AFF;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
        
    
    /* right-align bubbles when on right side */
    ${props => props.$parentPosition === 'middle-right' && `
        margin-left: auto;
    `}
    
    /* left-align bubbles when on left side */
    ${props => (props.$parentPosition === 'top-left' || props.$parentPosition === 'bottom-left') && `
        margin-right: auto;
    `}
    
    /* speech bubble tail - only on the last bubble */
    &:last-child::after {
        /* layout */
        z-index: 1;
        content: "";
        position: absolute;

        /* spacing */
        width: 15.515px;
        height: 17.5px;

        /* styles */
        background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15.515px' height='17.5px' viewBox='32.484 17.5 15.515 17.5' enable-background='new 32.484 17.5 15.515 17.5'><path fill='%23007AFF' d='M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'/></svg>") no-repeat;
        background-size: 15.515px 17.5px;
        
        /* tail positioning based on parent bubble container position */
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

/* ========== spacer ========== */

const Spacer = styled.div`
  width: 100%;
  height: 100%;
`;

/* ========== right column ========== */

// right column. content.
const RightCol = styled.div`
    /* layout */
    width: 100%;
    min-width: 0;
    max-width: 100%;
`;

// sub-container for content.
const ContentBox = styled.div`
    /* layout */
    width: 100%;
    min-width: 0;
    display: grid;
    max-width: 100%;
    overflow: hidden;

    /* spacing */
    gap: 1rem;
`;

// content wrapper for the animations.
const ContentWrapper = styled.div`
    /* layout */
    min-width: 0;
    display: grid;
    inline-size: 100%;
    min-height: clamp(420px, 60vh, 620px);
    max-inline-size: 100%;
    box-sizing: border-box;

    /* styles */
    opacity: 0;
    transform: translateY(12px) translateZ(0);
    transition: opacity 400ms ease, transform 400ms ease;
    will-change: transform, opacity;

    /* child elements */
    > * {
        opacity: 0;
        transform: translateY(16px) translateZ(0);
        transition: opacity 800ms cubic-bezier(0.2, 0.7, 0.2, 1), 
                    transform 800ms cubic-bezier(0.2, 0.7, 0.2, 1);
        will-change: transform, opacity;
    }
    
    /* visible state */
    &.visible {
        opacity: 1;
        transform: translateY(0) translateZ(0);
        
        > * {
        opacity: 1;
        transform: translateY(0) translateZ(0);
        }
        
        > *:nth-child(1) { transition-delay: 260ms; }
        > *:nth-child(2) { transition-delay: 520ms; }
        > *:nth-child(3) { transition-delay: 780ms; }
        > *:nth-child(4) { transition-delay: 1040ms; }
    }

    /* hidden state */
    &.hidden {
        opacity: 0;
        transform: translateY(12px) translateZ(0);
        pointer-events: none;
        
        > * {
        opacity: 0;
        transform: translateY(12px) translateZ(0);
        }
    }

    /* slide out state */
    &.slideOut {
        opacity: 0;
        transform: translateY(-16px) translateZ(0);
        
        > * {
        opacity: 0;
        transform: translateY(-16px) translateZ(0);
        }
    }
    
    /* media queries */
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

// title. "A" and the role.
const H2 = styled.div`
    /* layout */
    min-width: 0;
    display: flex;
    align-items: center;

    /* spacing */
    gap: 0.5rem;
    margin-bottom: 0.1rem;

    /* styles */
    font-weight: 800;    
    font-size: clamp(1.8rem, 3.6vw, 2.3rem);
`;

// static "A" that doesn't move.
const StaticA = styled.span`
    /* layout */
    align-self: flex-start;

    /* styles */
    line-height: 1;
    font-weight: 800;
    font-size: clamp(2.2rem, 4.4vw, 2.7rem);
    color: rgba(255,255,255,.9);
`;

// container for typed text.
const TypedBox = styled.span`
    /* layout */
    min-width: 0;               
    flex-shrink: 1;
    position: relative; 
    display: inline-block;
`;

// blinking caret for the typewriter effect.
const Caret = styled.span`
    /* layout */
    width: auto;
    margin-left: 0;
    display: inline-block;

    /* styles */
    -webkit-text-fill-color: rgba(200,180,255,.9);
    ${props => props.$paused 
        ? css`animation: none;`
        : css`animation: ${blink} 1s steps(1) infinite;`
    }
`;

// live region for accessibility (screen readers).
const LiveRegion = styled.span`
    /* layout */
    position: relative;
    display: inline-block;
`;

// Base role text component
const RoleTextBase = styled.span`
    /* styles */
    font-weight: 800;
    -webkit-text-fill-color: transparent;
`;

// Variant components for different role gradients (simplified from 3 color stops to 2)
// Each variant includes both gradient AND clip properties together
const RoleTextSoftwareEngineer = styled(RoleTextBase)`
                    background: linear-gradient(135deg, 
                        rgba(180, 140, 255, 0.95), 
        rgba(100, 70, 175, 0.9));
    -webkit-background-clip: text;
    background-clip: text;
                `;

const RoleTextUCFGrad = styled(RoleTextBase)`
                    background: linear-gradient(135deg, 
                        rgba(255, 220, 150, 0.95), 
                        rgba(255, 160, 80, 0.9));
    -webkit-background-clip: text;
    background-clip: text;
                `;

const RoleTextProfessionalBeginner = styled(RoleTextBase)`
                    background: linear-gradient(135deg, 
                        rgba(150, 255, 200, 0.95), 
                        rgba(100, 180, 140, 0.9));
    -webkit-background-clip: text;
    background-clip: text;
                `;

const RoleTextDefault = styled(RoleTextBase)`
                    background: linear-gradient(135deg, 
                        rgba(255,255,255,.95), 
                        rgba(200,180,255,.9));
    -webkit-background-clip: text;
    background-clip: text;
`;

// Gradient text for the role - wrapper that selects the right variant
// Memoized to prevent unnecessary re-renders when roleIndex hasn't changed
const RoleText = memo(({ $roleIndex: roleIndex, ...props }) => {
    switch(roleIndex) {
        case 0:
            return <RoleTextSoftwareEngineer {...props} />;
        case 1:
            return <RoleTextUCFGrad {...props} />;
        case 2:
            return <RoleTextProfessionalBeginner {...props} />;
        default:
            return <RoleTextDefault {...props} />;
    }
}, (prevProps, nextProps) => {
    // Only re-render if roleIndex changes
    return prevProps.$roleIndex === nextProps.$roleIndex;
});

// one-liner section.
const OneLiner = styled.div`
    /* spacing */
    max-width: 100%;

    /* styles */
    line-height: 1.8; 
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
    color: rgba(255,255,255,.88);
    font-size: clamp(0.85rem, 1.8vw, 1.275rem);

    /* smaller at 1600px */
    @media (max-width: 1600px) {
        font-size: clamp(0.85rem, 1.4vw, 1.1rem);
        line-height: 1.7;
    }

    /* strong text */
    strong {
        font-weight: 600;
        color: rgba(150, 200, 255, 1);
    }
`;

// section title. "What I'm Up To Right Now..."
const SectionTitle = styled.div`
    /* spacing */
    margin: 1rem 0;

    /* styles */
    font-weight: 600;
    color: rgba(200, 180, 255, 1);
    font-size: clamp(1.5rem, 2.2vw, 2.5rem);

    /* smaller at 1600px */
    @media (max-width: 1600px) {
        font-size: clamp(1.3rem, 1.8vw, 2rem);
        margin: 0.8rem 0;
    }
`;

// bullet list container.
const BulletList = styled.div`
    /* spacing */
    padding: 0;

    /* styles */
    list-style: none;
    
    /* two columns at 1600px to save vertical space - skip for card index 1 (second card) */
    @media (max-width: 1600px) {
        display: ${props => props.$cardIndex === 1 ? 'block' : 'grid'};
        ${props => props.$cardIndex !== 1 && `
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
            row-gap: 0.5rem;
        `}
    }
`;

// individual bullet item.
const BulletItem = styled.div`
    /* layout */
    position: relative;

    /* spacing */
    max-width: 100%;
    margin-bottom: 1rem;
    padding-left: 1.75rem;
    
    
    /* compact at 1600px */
    @media (max-width: 1600px) {
        text-align: left;
        font-size: clamp(0.95rem, 1.2vw, 1.15rem);
        margin-bottom: 0.5rem;
        padding-left: 1.8rem;
        
        /* smaller bullet at 1600px */
        &::before {
            font-size: 1.3rem;
        }
    }

    /* styles */
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;
    color: rgba(255,255,255,.85);
    font-size: clamp(1rem, 1.6vw, 1.275rem);
    
    /* star bullet point */
    &::before {
        /* layout */
        left: 0;
        top: 50%;
        content: '✦';
        position: absolute;
        transform: translateY(-50%) translateZ(0);

        /* styles */
        font-weight: 400;
        font-size: 1.5rem;
        color: rgba(150, 200, 255, 0.9);
        animation: ${twinkle} 2s ease-in-out infinite;
        animation-delay: ${props => props.$delay || 0}s;
        will-change: opacity;
    }

    /* Pause animations during loading */
    [data-loading="true"] &::before {
        animation-play-state: paused;
    }
`;

// closer paragraph.
const Closer = styled.div`
    /* spacing */
    max-width: 100%;

    /* styles */
    line-height: 1.8; 
    text-align: justify;
    word-wrap: break-word;
    overflow-wrap: break-word;
    color: rgba(255,255,255,.88);
    font-size: clamp(1rem, 1.8vw, 1.3rem);

    /* smaller at 1600px */
    @media (max-width: 1600px) {
        font-size: clamp(0.9rem, 1.4vw, 1.2rem);
        line-height: 1.7;
    }
    
    /* strong text */
    strong {
        font-weight: 600;
        color: rgba(150, 200, 255, 1);
    }
`;

// navigation row. previous, page indicator, next.
const NavRow = styled.div`
    /* layout */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    /* spacing */
    gap: 1.5rem;
    padding: 1rem;
    margin-bottom: 1rem;  
`;

// page indicator. (current page / total pages)
const PageIndicator = styled.div`
    /* spacing */
    padding: 0.4rem 1.3rem;
    
    /* styles */
    font-weight: 500;
    font-size: 1.2rem;
    border-radius: 24px;
    letter-spacing: 0.5px;
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(20px);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
`;

// navigation button. previous, next. 
const NavBtn = styled.button`  
    /* layout */
    display: flex;
    align-items: center;
    justify-content: center;

    /* spacing */
    width: 52px;
    height: 52px;
    

    /* styles */
    cursor: pointer;
    border-radius: 50%;
    backdrop-filter: blur(20px);
    color: rgba(255, 255, 255, 0.95);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    
    /* hover effects of buttons */
    &:hover {
        transform: translateY(-2px) scale(1.05) translateZ(0);
        background: rgba(150, 200, 255, 0.3);
        border-color: rgba(150, 200, 255, 0.6);
        color: rgba(255, 255, 255, 1);
        box-shadow: 0 6px 20px rgba(150, 200, 255, 0.3);
    }
    
    /* active state of buttons */
    &:active {
        transform: translateY(0) scale(0.98) translateZ(0);
        box-shadow: 0 2px 6px rgba(150, 200, 255, 0.15);
    }
    
    /* disabled state for when animation is happening */
    &:disabled {
        /* styles */
        opacity: 0.4;
        transform: none;
        cursor: not-allowed;
        
        &:hover {
            transform: none;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    }
`;

// space station - static in top right corner
const SpaceStation = styled.div`
    /* layout */
    top: 3.5%;
    right: 5%;
    z-index: 2;
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
    opacity: 1;
    will-change: transform;
    contain: layout style paint;
    
    /* subtle floating animation - GPU accelerated */
    animation: ${spaceStationFloat} 8s ease-in-out infinite;
    transform: translateZ(0);
    
    /* Pause animations during loading */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        width: 200px;
        height: 200px;
        opacity: 0.6;
    }
`;

// satellite 1 - floating across the top of the screen
const Satellite1 = styled.div`
    /* layout */
    top: 10%;
    left: -15%;
    z-index: 0;
    position: absolute;

    /* spacing */
    width: 80px;
    height: 144px;

    /* styles */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${satellite1});
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
    opacity: 0.6;
    will-change: transform;
    contain: layout style paint;
    
    /* floating animation with delay - GPU accelerated */
    animation-delay: 6s;
    animation: ${satellite1Float} 25s linear infinite;
    transform: translateZ(0);
    
    /* Pause animations during loading */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        width: 60px;
        height: 108px;
        opacity: 0.5;
    }
`;

// satellite 2 - floating across slightly lower
const Satellite2 = styled.div`
    /* layout */
    top: 25%;
    right: -15%;
    z-index: 0;
    position: absolute;

    /* spacing */
    width: 80px;
    height: 144px;

    /* styles */
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${satellite2});
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.12));
    opacity: 0.5;
    will-change: transform;
    contain: layout style paint;
    
    /* floating animation with different delay and path - right to left - GPU accelerated */
    animation-delay: 7s;
    animation: ${satellite2Float} 30s linear infinite;
    transform: translateZ(0);
    
    /* Pause animations during loading */
    [data-loading="true"] & {
        animation-play-state: paused;
    }
    
    /* media queries */
    @media (max-width: 1600px) {
        width: 60px;
        height: 108px;
        opacity: 0.4;
    }
`;

// export component.
export default WhoIAm;