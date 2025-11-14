// actualExperience.jsx

// section for showing off my past work experiences. main feature is the
// experience carousel, which is a horizontal scrolling set of cards, 
// its swipable.

// upper atmosphere style, aurora down into clouds.

// imports.
import React, { useEffect, useState, useRef, useMemo, useCallback, memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useComponentPerformance } from '../../hooks/useComponentPerformance';

// component imports.
import Cloud from './Cloud';
import Aurora from './Aurora';

// image imports.
import curiousImg from '@/images/3experience/curious.jpg';
import bitgoLogo from '@/images/3experience/bitgoSmall.jpg';
import barLouieLogo from '@/images/3experience/blSmall.png';
import hawkersLogo from '@/images/3experience/hawkersSmall.png';

// utility imports.
import { getLogo } from '@/components/utils/logoMap.js';
import { getBrandColors } from '@/components/utils/brandColors.js';
import { EXPERIENCE_CARDS } from '@/data/experienceData.jsx';

// actual experience component.
const ActualExperience = memo(() => {
    // Performance monitoring
    useComponentPerformance('Experience', process.env.NODE_ENV === 'development');
    
    // Animation throttling state
    const [isInViewport, setIsInViewport] = useState(false);
    const [isSlowDevice, setIsSlowDevice] = useState(false);
    const sectionRef = useRef(null);
    
    // Performance monitoring refs
    const renderCountRef = useRef(0);
    const lastRenderTimeRef = useRef(performance.now());
    const fpsRef = useRef(0);
    const frameCountRef = useRef(0);
    const lastFpsTimeRef = useRef(performance.now());
    const lastCardFocusLog = useRef({});
    
    // Detect slower devices
    useEffect(() => {
        const cores = navigator.hardwareConcurrency || 4;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isSlow = cores < 4 || prefersReducedMotion;
        setIsSlowDevice(isSlow);
        
        console.log('[Experience] Device Detection:', {
            cores,
            prefersReducedMotion,
            isSlowDevice: isSlow,
            hardwareConcurrency: navigator.hardwareConcurrency,
            userAgent: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
        });
        
        // Performance breakdown summary
        console.log('[Experience] Performance Analysis:', {
            issues: [
                '1. Forced reflow violations (90ms, 66ms) - Layout thrashing detected',
                '2. FPS drops to 16-28 FPS with 2 Aurora waves',
                '3. Potential causes:',
                '   - Aurora clip-path animations (even with 2 waves)',
                '   - Backdrop-filter on cards (expensive compositing)',
                '   - Multiple blur filters on adjacent cards',
                '   - Skills carousel animations',
                '   - Cloud parallax animations',
                '   - CSS transitions triggering layout recalculations'
            ],
            recommendations: [
                'Consider disabling Aurora clip-path animation on mid-tier devices',
                'Reduce blur intensity further on mid-tier',
                'Pause skills carousel when FPS drops below 25',
                'Use transform/opacity only for card transitions (avoid layout properties)'
            ]
        });
    }, []);
    
    // Performance monitoring: FPS tracking (throttled to reduce overhead)
    useEffect(() => {
        if (!isInViewport) return; // Only measure when in viewport
        
        let rafId;
        let lastLogTime = 0;
        const measureFPS = () => {
            frameCountRef.current++;
            const now = performance.now();
            const elapsed = now - lastFpsTimeRef.current;
            
            if (elapsed >= 1000) {
                fpsRef.current = Math.round((frameCountRef.current * 1000) / elapsed);
                frameCountRef.current = 0;
                lastFpsTimeRef.current = now;
                
                // Log FPS only once per 3 seconds when low (reduce console overhead)
                if (fpsRef.current < 30 && (now - lastLogTime) > 3000) {
                    console.warn(`[Experience] Low FPS: ${fpsRef.current} FPS`);
                    lastLogTime = now;
                }
            }
            
            rafId = requestAnimationFrame(measureFPS);
        };
        
        rafId = requestAnimationFrame(measureFPS);
        return () => cancelAnimationFrame(rafId);
    }, [isInViewport]);
    
    // Performance monitoring: Render timing (throttled)
    const lastRenderLogTime = useRef(0);
    useEffect(() => {
        renderCountRef.current++;
        const now = performance.now();
        const timeSinceLastRender = now - lastRenderTimeRef.current;
        lastRenderTimeRef.current = now;
        
        // Log render info when in viewport, but throttle to once per 2 seconds
        if (isInViewport && (now - lastRenderLogTime.current) > 2000) {
            // Measure what's taking time
            const perfEntries = performance.getEntriesByType('measure');
            const recentMeasures = perfEntries.slice(-5); // Last 5 measures
            
            console.log(`[Experience] Render #${renderCountRef.current}`, {
                timeSinceLastRender: `${timeSinceLastRender.toFixed(2)}ms`,
                fps: fpsRef.current || 'calculating...',
                isSlowDevice,
                recentMeasures: recentMeasures.map(m => ({
                    name: m.name,
                    duration: `${m.duration.toFixed(2)}ms`
                }))
            });
            lastRenderLogTime.current = now;
        }
    });
    
    // IntersectionObserver to detect when section is in viewport - optimized to prevent thrash
    const lastInView = useRef(false);
    const rafIdRef = useRef(null);
    
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                // only update state if value actually changed - use requestAnimationFrame to batch updates
                const next = entry.isIntersecting && entry.intersectionRatio > 0.1;
                if (next !== lastInView.current) {
                    lastInView.current = next;
                    // Cancel any pending RAF to prevent multiple updates
                    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
                    // Batch state update to prevent thrashing during transitions
                    rafIdRef.current = requestAnimationFrame(() => {
                        setIsInViewport(next);
                        rafIdRef.current = null;
                    });
                }
            },
            {
                threshold: [0, 0.1, 0.5, 1],
                rootMargin: '200px' // Start animations before entering viewport
            }
        );
        
        observer.observe(section);
        return () => {
            observer.disconnect();
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
            }
        };
    }, []);
    
    // state variables.
    const [index, setIndex] = useState(1);              // current card index.
    const [paused, setPaused] = useState(false);        // whether carousel is paused.
    const [copied, setCopied] = useState(false);        // copy button feedback state.
    const drag = useRef({ x: 0, active: false });       // drag state for mobile. (expanded upon in future)
    
    // first slide is the "hire me" card, rest are data-driven.
    const n = useMemo(() => 1 + EXPERIENCE_CARDS.length, []);
    
    // Memoized navigation functions
    const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
    const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);
    
    // Copy email to clipboard
    const copyEmail = useCallback(async () => {
        const email = 'kirbycolin26@gmail.com';
        try {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Silently fail - user can manually copy if needed
      }
    }, []);
    
    // Check if mobile on mount and resize
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 900);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // handles pointer down event for mobile.
    const onPointerDown = useCallback((e) => {
        if (!isMobile) return; // Disable swipe on desktop
        drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX ?? 0, active: true };
        setPaused(true);
    }, [isMobile]);
    
    // handles pointer up event for mobile.
    const onPointerUp = useCallback((e) => {
        if (!isMobile || !drag.current.active) return; // Disable swipe on desktop
        const upX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0;
        const dx = upX - drag.current.x;
        drag.current.active = false;
        if (Math.abs(dx) > 50) (dx < 0 ? next() : prev());
        setPaused(false);
    }, [next, prev, isMobile]);
    
    // Memoized card style calculation
    const getCardStyle = useCallback((cardIndex) => {
        const distance = Math.abs(cardIndex - index);
        return {
            position: cardIndex - index,
            isFocused: cardIndex === index,
            distance
        };
    }, [index]);
    
    // Memoize skills carousel config to prevent recreation on every render
    const skillsCarouselConfig = useMemo(() => [
        { key: 'frontend', label: 'Frontend', dur: '18s', delay: '-3s', reverse: true },
        { key: 'backend', label: 'Backend', dur: '20s', delay: '-6s' },
        { key: 'devops', label: 'DevOps', dur: '22s', delay: '-2s', reverse: true },
        { key: 'cloud', label: 'Cloud & Auth', dur: '24s', delay: '-5s' }
    ], []);
    
    // Memoize sequence array to prevent recreation
    const sequenceArray = useMemo(() => [0, 1, 2], []);
    
    // Memoize style objects for skills carousel to prevent DOM updates
    const carouselStyles = useMemo(() => ({
        frontend: { '--dur': '18s', '--delay': '-3s' },
        backend: { '--dur': '20s', '--delay': '-6s' },
        devops: { '--dur': '22s', '--delay': '-2s' },
        cloud: { '--dur': '24s', '--delay': '-5s' }
    }), []);
    
    // main return.
    return (
        <ExperienceContainer id="experience" data-section-snap ref={sectionRef}>
            {/* aurora effects at the top */}
            <AuroraWrapper >
                <Aurora />
            </AuroraWrapper>
            
            {/* parallax cloud layers - far, mid, near */}
            {/* Optimized: Reduced cloud count on slow devices (12 → 6) for better performance */}
            <CloudLayer>
                {/* far layer - 2 clouds on slow devices, 4 on fast */}
                <Cloud top="67%" delay="18" duration="188" layer="far" type={4} direction="left" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                <Cloud top="70%" delay="0" duration="180" layer="far" type={1} direction="left" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                {!isSlowDevice && (
                    <>
                        <Cloud top="73%" delay="10" duration="200" layer="far" type={3} direction="right" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                        <Cloud top="76%" delay="20" duration="190" layer="far" type={2} direction="left" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                    </>
                )}
                
                {/* mid layer - 2 clouds on slow devices, 4 on fast */}
                <Cloud top="68%" delay="8" duration="148" layer="mid" type={1} direction="right" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                <Cloud top="71%" delay="3" duration="145" layer="mid" type={4} direction="left" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                {!isSlowDevice && (
                    <>
                        <Cloud top="74%" delay="13" duration="140" layer="mid" type={2} direction="right" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                        <Cloud top="75%" delay="53" duration="148" layer="mid" type={4} direction="right" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                    </>
                )}
                
                {/* near layer - 2 clouds on slow devices, 4 on fast */}
                <Cloud top="69%" delay="12" duration="118" layer="near" type={5} direction="right" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                <Cloud top="72%" delay="6" duration="115" layer="near" type={3} direction="left" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                {!isSlowDevice && (
                    <>
                        <Cloud top="75%" delay="17" duration="125" layer="near" type={1} direction="right" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                        <Cloud top="77%" delay="22" duration="122" layer="near" type={2} direction="left" isInViewport={isInViewport} isSlowDevice={isSlowDevice} />
                    </>
                )}
            </CloudLayer>
            
            {/* entire content wrapper */}
            <ContentWrapper>
                {/* main title - snap point for centering */}
                <SectionTitle data-snap-title>Experience</SectionTitle>
                
                {/* little sub title */}
                <SectionSubtitle>Where I've built, learned, and grown</SectionSubtitle>
                
                {/* experience carousel */}
                <Stage
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    {...(isMobile ? {
                        onPointerDown,
                        onPointerUp,
                        onTouchStart: onPointerDown,
                        onTouchEnd: onPointerUp
                    } : {})}
                    role="region"
                    aria-label="Experience carousel"
                >
                    <Track>
                        {/* "hire me" intro card */}
                        {(() => {
                            const cardStyle = getCardStyle(0); // get card style for "hire me" card.
                            if (!cardStyle) return null; // if card style is null, return null.
                            return (
                                <Slide 
                                    $position={cardStyle.position} 
                                    $isFocused={cardStyle.isFocused} 
                                    $distance={cardStyle.distance}
                                    data-transitioning={cardStyle.distance > 0 ? "true" : "false"}
                                >
                                    <HireCard>
                                        {/* overall hire me card */}
                                        <HireHeader>
                                            <HireTitle>What’s Next?</HireTitle>
                                            <HireSubtitle>Honestly, I'm not 100% sure yet. I’m keeping an open mind and exploring where I can make the biggest impact.</HireSubtitle>
                                        </HireHeader>
                                        <HireBody>
                                            <HireAvatar src={curiousImg} alt="Curious" />
                                            <HireBlurb>
                                                If you’re a recruiter or company interested in working together, I’d love to chat about potential roles or projects. Let’s build something great!                                           </HireBlurb>
                                            <HireActions>
                                                <Divider $themeColor="rgb(200, 180, 255)" />
                                                <HireReach>Reach out to me at:</HireReach>
                                                <EmailRow>
                                                    <HireButton as="div" role="button" aria-label="Email">
                                                        kirbycolin26@gmail.com
                                                    </HireButton>
                                                    <CopyButton 
                                                        onClick={copyEmail}
                                                        $copied={copied}
                                                        aria-label="Copy email"
                                                        title={copied ? "Copied!" : "Copy email"}
                                                    >
                                                        <CopyIconWrapper $copied={copied}>
                                                            {copied ? '✓' : '📋'}
                                                        </CopyIconWrapper>
                                                    </CopyButton>
                                                </EmailRow>
                                            </HireActions>
                                        </HireBody>
                                    </HireCard>
                                </Slide>
                            );
                        })()}
                        {/* data-driven experience slides (index offset +1 to account for "hire me" slide) */}
                        {/* Only render cards that are visible or adjacent (distance <= 1) to save rendering */}
                        {EXPERIENCE_CARDS.map((card, i) => {
                            const slideIdx = i + 1;                     // get slide index.
                            const cardStyle = getCardStyle(slideIdx);   // get card style.
            // Skip rendering far-off cards (distance > 1) - they're fully hidden anyway
            if (cardStyle.distance > 1) return null;
            
            // Log when card becomes focused for performance debugging (throttled)
            if (cardStyle.isFocused && isInViewport) {
                const now = performance.now();
                // Only log once per card focus change
                if (!lastCardFocusLog.current[card.id] || (now - lastCardFocusLog.current[card.id]) > 5000) {
                    // Measure performance breakdown
                    performance.mark('card-focus-start');
                    
                    console.log(`[Experience] Card focused: ${card.name}`, {
                        index,
                        slideIdx,
                        distance: cardStyle.distance,
                        fps: fpsRef.current || 'calculating...',
                        hasSkillsCarousel: !!card.skills,
                        skillsCount: card.skills ? Object.keys(card.skills).length : 0
                    });
                    
                    performance.mark('card-focus-end');
                    performance.measure('card-focus', 'card-focus-start', 'card-focus-end');
                    lastCardFocusLog.current[card.id] = now;
                }
            }
                            const themeRGB = card.themeColorRgb;        // get theme color.
                            
                            // ternary operator to get logo source based on card id.
                            const logoSrc = card.id === 'bitgo' ? bitgoLogo
                                           : card.id === 'barlouie' ? barLouieLogo
                                           : card.id === 'hawkers' ? hawkersLogo
                                           : null;

                            // if card type is tech, return tech experience card.
                            if (card.type === 'tech') {
                                return (
                                    <Slide key={card.id} $position={cardStyle.position} $isFocused={cardStyle.isFocused} $distance={cardStyle.distance} $isSlowDevice={isSlowDevice}>
                                        {/* overall experience card */}
                                        <ExperienceCard $isFocused={cardStyle.isFocused} $isSlowDevice={isSlowDevice}>
                                            <CardHeader>
                                                {/* header of card, includes company name, how long i worked there, and company logo */}
                                                <HeaderTop>
                                                    <CompanyInfo>
                                                        <CompanyName>{card.name}</CompanyName>
                                                        <DateRange>{card.dateRange}</DateRange>
                                                    </CompanyInfo>
                                                    {logoSrc && (
                                                        <CompanyLogo src={logoSrc} alt={`${card.name} logo`} $themeColor={`rgba(${themeRGB}, 0.5)`} />
                                                    )}
                                                </HeaderTop>
                                                {/* overview of card, includes job title and project description */}
                                                <HeaderOverview>
                                                    <JobTitle>{card.jobTitle}</JobTitle>
                                                    <ProjectDescription>{card.description}</ProjectDescription>
                                                </HeaderOverview>
                                                {/* divider between header and body */}
                                                <Divider $themeColor={`rgb(${themeRGB})`} />
                                            </CardHeader>

                                            {/* body of card, includes achievements list */}
                                            <CardBody>
                                                <AchievementsList>
                                                    {card.achievements.map((t, ai) => (
                                                        <Achievement key={ai}>
                                                            <AchievementIcon $themeColor={themeRGB} />
                                                            <AchievementText>{t}</AchievementText>
                                                        </Achievement>
                                                    ))}
                                                </AchievementsList>
                                            </CardBody>

                                            {/* footer of card, includes skills carousel */}
                                            <CardFooter>
                                                {/* divider between body and footer */}
                                                <Divider $themeColor={`rgb(${themeRGB})`} />
                                                {/* skills carousel modularized for adding more skills later */}
                                                <SkillsCarousel>
                                                    {skillsCarouselConfig.map(cfg => (
                                                        card.skills?.[cfg.key] ? (
                                                            <CarouselRow key={cfg.key}>
                                                                {/* label for skill category */}
                                                                <RowLabel>{cfg.label}</RowLabel>
                                                                {/* viewport for skill carousel */}
                                                                <RowViewport>
                                                                    {/* track for skill carousel */}
                                                                    <RowTrack 
                                                                        style={carouselStyles[cfg.key]} 
                                                                        $reverse={cfg.reverse}
                                                                        $isCardFocused={cardStyle.isFocused}
                                                                        $isSlowDevice={isSlowDevice}
                                                                    >
                                                                        {sequenceArray.map(rep => (
                                                                            <Sequence key={`${cfg.key}-seq-${rep}`} aria-hidden={rep>0}>
                                                                                {card.skills[cfg.key].map(name => (
                                                                                    <SkillPill key={`${cfg.key}-${rep}-${name}`} $skillName={name} title={name}>
                                                                                        <SkillPillIcon src={getLogo(name)} alt={name} />
                                                                                        <SkillPillName>{name}</SkillPillName>
                                                                                    </SkillPill>
                                                                                ))}
                                                                            </Sequence>
                                                                        ))}
                                                                    </RowTrack>
                                                                </RowViewport>
                                                            </CarouselRow>
                                                        ) : null
                                                    ))}
                                                </SkillsCarousel>
                                            </CardFooter>
                                        </ExperienceCard>
                                    </Slide>
                                );
                            }

                            // if card type is service, return service experience card.
                            return (
                                    <Slide 
                                        key={card.id} 
                                        $position={cardStyle.position} 
                                        $isFocused={cardStyle.isFocused} 
                                        $distance={cardStyle.distance}
                                        $isSlowDevice={isSlowDevice}
                                        data-transitioning={cardStyle.distance > 0 ? "true" : "false"}
                                    >
                                        <ServiceExperienceCard $theme={card.theme} $isSlowDevice={isSlowDevice}>
                                        {/* overall service experience card */}
                                        <CardHeader>
                                            {/* header of card, includes company name, how long i worked there, and company logo */}
                                            <HeaderTop>
                                                {/* company info */}
                                                <CompanyInfo>
                                                    <CompanyName>{card.name}</CompanyName>
                                                    <DateRange>{card.dateRange}</DateRange>
                                                </CompanyInfo>
                                                {/* company logo */}
                                                {logoSrc && (
                                                    <CompanyLogo src={logoSrc} alt={`${card.name} logo`} $themeColor={`rgba(${themeRGB}, 0.6)`} />
                                                )}
                                            </HeaderTop>
                                            {/* overview of card, includes job title and project description */}
                                            <HeaderOverview>
                                                <JobTitle $theme={card.theme}>{card.jobTitle}</JobTitle>
                                                <ProjectDescription>{card.description}</ProjectDescription>
                                            </HeaderOverview>
                                            <Divider $themeColor={`rgb(${themeRGB})`} />
                                        </CardHeader>

                                        {/* body of card, includes achievements list */}
                                        <CardBody>
                                            <AchievementsList>
                                                {card.achievements.map((t, ai) => (
                                                    <Achievement key={ai} $themeColor={themeRGB}>
                                                        <AchievementIcon $themeColor={themeRGB} />
                                                        <AchievementText>{t}</AchievementText>
                                                    </Achievement>
                                                ))}
                                            </AchievementsList>
                                        </CardBody>

                                        {/* footer of card, includes tech connection */}
                                        <CardFooter>
                                            {/* divider between body and footer */}
                                            <Divider $themeColor={`rgb(${themeRGB})`} />
                                            {/* how i want to connect my software experience to my service experience */}
                                            <TechConnection>
                                                <TechConnectionTitle>{card.techConnectionTitle}</TechConnectionTitle>
                                                <TechConnectionItem $themeColor={themeRGB}>
                                                    <TechConnectionDot $themeColor={themeRGB} />
                                                    <TechConnectionText>{card.techConnectionText}</TechConnectionText>
                                                </TechConnectionItem>
                                            </TechConnection>
                                        </CardFooter>
                                    </ServiceExperienceCard>
                                </Slide>
                            );
                        })}
                    </Track>
                    
                    {/* navigation arrows */}
                    {index > 0 && <ArrowLeft aria-label="Previous experience" onClick={prev}>‹</ArrowLeft>}
                    {index < n - 1 && <ArrowRight aria-label="Next experience" onClick={next}>›</ArrowRight>}
                </Stage>
            </ContentWrapper>
            {/* Bottom seam softener to blend into Projects */}
            <BottomSeamFade />
        </ExperienceContainer>
    );
});

// entire container, sky gradient.
const ExperienceContainer = styled.div`
    /* layout */
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    flex-direction: column;
    min-height: 100vh;

    /* spacing */
    padding: 4rem 2rem;
    
    /* mobile */
    @media (max-width: 768px) {
        padding: 2rem 1rem;
        min-height: auto;
        overflow: visible; /* Ensure card isn't clipped by container */
    }

    /* styles */
    background: linear-gradient(
        to bottom,
        rgb(78 58 128) 0%,
        rgb(78 58 128) 10%,
        rgb(92 74 155) 32%,
        rgb(112 95 182) 54%,
        rgb(132 127 210) 78%,
        rgb(148 180 243) 100%
    );
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            rgb(78 58 128) 0%,
            #a8c2f6 100%
        );
    }
`;

// my clouds!
const CloudLayer = styled.div`
    /* layout */
    inset: 0;
    z-index: 1;
    position: absolute;

    /* GPU acceleration and aggressive containment */
    transform: translateZ(0);
    contain: layout style paint;
    content-visibility: auto;
    will-change: auto;
    isolation: isolate;

    /* styles */
    overflow: hidden;
    pointer-events: none;
`;

// Bottom seam fade to reduce perceived cutoff against Projects
const BottomSeamFade = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 14vh;
    z-index: 3;
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        rgba(148, 180, 243, 0) 0%,
        rgba(148, 180, 243, 0.6) 60%,
        rgba(148, 180, 243, 1) 100%
    );
    @supports (background: linear-gradient(in oklch, red, blue)) {
        background: linear-gradient(
            to bottom in oklch,
            transparent 0%,
            color-mix(in oklch, #a8c2f6 60%, transparent) 60%,
            #a8c2f6 100%
        );
    }
`;

// overall content wrapper for experience.
const ContentWrapper = styled.div`
    /* layout */
    z-index: 2;
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;

    /* spacing */
    margin: 0 auto;
    padding: 2rem;
    max-width: 1400px;

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        padding: 1.5rem;
        max-width: 1200px;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        padding: 0.5rem 0.5rem;
        max-width: 100%;
    }
`;

// section title w/ the gradient text.
const SectionTitle = styled.h1`
    /* spacing */
    margin: 0;
    margin-top: 2rem;

    /* styles */
    text-align: center;
    background: linear-gradient(135deg,
        rgba(255, 255, 255, 0.95) 0%,
        rgba(200, 180, 255, 0.9) 50%,
        rgba(150, 200, 255, 0.95) 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: 900;
    font-size: 5.5rem;

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 3.6rem;
        /* spacing */
        margin-bottom: 0.25rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(2.5rem, 8vw, 3.5rem);
        margin-top: 0.5rem;
        margin-bottom: 0.25rem;
    }
`;

// section subtitle "Where I've built..."
const SectionSubtitle = styled.div`
    /* layout */
    z-index: 3;
    position: relative;

    /* spacing */
    margin: 0;
    margin-top: 1rem;

    /* styles */
    text-align: center;
    font-style: italic;
    font-weight: 400;
    font-size: 1.75rem;
    color: rgba(255, 255, 255, 0.7);
    text-shadow:
        0 2px 8px rgba(0, 0, 0, 0.3),
        0 1px 4px rgba(0, 0, 0, 0.2);

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 1.25rem;
        /* spacing */
        margin-top: 0.5rem;
        margin-bottom: 1.25rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.95rem, 3vw, 1.15rem);
        margin-top: 0.25rem;
        margin-bottom: 0.75rem;
    }
`;

/* ========== animations ========== */

// Icon scale-in animation (for copy button checkmark)
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

/* ========== experience carousel ========== */

// carousel stage - container for the carousel.
const Stage = styled.div`
    /* layout */
    width: 100%;
    display: grid;
    position: relative;
    overflow: visible; /* Allow cards to overflow */
    place-items: center;

    /* GPU acceleration and containment */
    transform: translateZ(0);
    contain: layout style; /* Removed paint containment to allow overflow */
    isolation: isolate; /* Create new stacking context for better performance */

    /* spacing */
    margin: 0 auto;
    padding: 40px 0 60px 0; /* Extra bottom padding for card overflow */
    max-width: 1600px;
    min-height: 80vh;

    /* media queries */
    @media (min-width: 2000px) {
        /* spacing */
        padding-bottom: 80px; /* More space for larger cards */
    }
    @media (max-width: 2000px) {
        /* spacing */
        max-width: 1400px;
    }
    @media (max-width: 1600px) {
        /* spacing */
        max-width: 100%;
        padding: 0 0 60px 0; /* Maintain bottom padding */
        min-height: 64vh;
    }
    @media (max-width: 1200px) {
        /* spacing */
        padding: 20px 0 60px 0;
        min-height: 60vh;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        padding: 0.5rem 0 1rem 0;
        min-height: auto;
        height: auto;
        max-width: 100%;
        overflow: visible !important;
        contain: none;
        display: block;
    }
`;

// track - holds the slides.
const Track = styled.div`
    /* layout */
    position: relative;
    overflow: visible; /* Allow slides to overflow */
    perspective: 1200px;
    width: 90%;

    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    contain: layout style; /* Keep layout/style containment but allow overflow */

    /* spacing */
    margin: 0 auto;
    max-width: 1400px;
    height: clamp(600px, 70vh, 800px);
    min-height: clamp(600px, 70vh, 800px); /* Ensure minimum height */

    /* media queries */
    @media (max-width: 2000px) {
        /* layout */
        width: 85%;
        /* spacing */
        max-width: 1200px;
    }
    @media (max-width: 1600px) {
        /* layout */
        width: 88%;
        /* spacing */
        max-width: 980px;
        height: clamp(560px, 60vh, 680px);
    }
    @media (max-width: 1200px) {
        /* layout */
        width: 75vw;
        /* spacing */
        height: clamp(500px, 60vh, 700px);
    }
    
    /* mobile - size to biggest card, all cards at same position */
    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: auto;
        overflow: visible !important;
        contain: none;
        display: block;
        position: relative;
        perspective: none;
    }
`;

// slide - individual carousel item.
const Slide = styled.div.attrs(props => ({
    $isSlowDevice: props.$isSlowDevice || false
}))`
    /* layout */
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    position: absolute;
    display: grid;
    place-items: center;
    pointer-events: none;

    /* GPU acceleration */
    transform: translateZ(0);
    will-change: ${({ $isFocused, $distance }) => 
        ($isFocused || $distance <= 1) ? 'transform, opacity' : 'auto'};
    contain: layout style; /* Removed paint containment to allow overflow */
    
    /* styles */
    transition: transform 320ms cubic-bezier(0.22, 0.61, 0.36, 1),
                opacity 220ms ease;
    
    /* focused card (center) - highest z-index and allow overflow */
    ${({ $isFocused }) => $isFocused && `
        transform: translateX(0) translateZ(0) scale(1);
        opacity: 1;
        z-index: 100; /* Highest z-index to ensure it's on top */
        pointer-events: auto;
        will-change: transform;
        overflow: visible; /* Allow card content to overflow */
        contain: none; /* Remove containment for focused card to allow overflow */
    `}
    
    /* adjacent card */
    ${({ $distance, $position, $isSlowDevice }) => $distance === 1 && `
        transform: translateX(${$position > 0 ? '28%' : '-28%'}) scale(0.8) translateZ(-30px);
        opacity: 0.5;
        z-index: 5;
        ${!$isSlowDevice ? 'filter: blur(1.5px) saturate(0.75);' : 'filter: blur(0.5px) saturate(0.8);'}
        will-change: ${$isSlowDevice ? 'auto' : 'transform, opacity'};
    `}
    /* far cards (distance > 1) - keep off-stage and fully hidden */
    ${({ $distance, $position, $isSlowDevice }) => $distance > 1 && `
        transform: translateX(${$position > 0 ? '40%' : '-40%'}) scale(0.6) translateZ(-60px);
        opacity: 0;
        z-index: 1;
        ${!$isSlowDevice ? 'filter: blur(2px) saturate(0.6);' : 'filter: none;'}
        will-change: auto;
        content-visibility: auto; /* Skip rendering when off-screen */
    `}
    
    /* media queries */
    @media (min-width: 2000px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '25%' : '-25%'}) scale(0.85) translateZ(-30px);
            opacity: 0.6;
        `}
    }
    
    @media (max-width: 1600px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '30%' : '-30%'}) scale(0.75) translateZ(-30px);
            opacity: 0.4;
        `}
    }
    
    @media (max-width: 1200px) {
        ${({ $distance, $position }) => $distance === 1 && `
            transform: translateX(${$position > 0 ? '30%' : '-30%'}) scale(0.8) translateZ(-30px);
        `}
    }
    
    /* mobile - all cards at same position, only focused visible */
    @media (max-width: 768px) {
        /* Reset all positioning and sizing */
        height: auto !important;
        min-height: auto !important;
        width: 100%;
        overflow: visible;
        
        /* Reset all transforms and filters */
        scale: 1 !important;
        filter: none !important;
        
        ${({ $isFocused }) => !$isFocused && `
            opacity: 0 !important;
            visibility: hidden;
            pointer-events: none;
            position: absolute !important;
            left: 50% !important;
            top: 0 !important;
            transform: translateX(-50%) !important;
        `}
        
        ${({ $isFocused }) => $isFocused && `
            opacity: 1 !important;
            visibility: visible;
            z-index: 100;
            pointer-events: auto;
            contain: none;
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            margin: 0 auto;
        `}
    }
`;

// company logo - must be defined before ExperienceCard & ServiceExperienceCard
const CompanyLogo = styled.img`
    /* layout */
    top: 5%;
    right: 5%;
    position: absolute;
    width: 100px;
    height: 100px;

    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    contain: layout style paint;

    /* styles */
    cursor: pointer;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
                box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    
    /* media queries */
    @media (max-width: 1600px) {
        width: 84px;
        height: 84px;
        right: 4%;
        top: 4%;
    }
    
    &:hover {
        transform: scale(1.1) translateY(-6px) rotate(5deg) translateZ(0);
        filter: drop-shadow(0 8px 24px ${({ $themeColor }) => $themeColor || 'rgba(13, 173, 220, 0.5)'});
    }
`;

/* ========== experience card ========== */

// individual experience card - phone screen style with frosted glass
const ExperienceCard = styled.div.attrs(props => ({
    $isFocused: props.$isFocused || false,
    $isSlowDevice: props.$isSlowDevice || false
}))`
    /* layout */
    width: 500px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    position: relative; /* Ensure proper stacking context */
    z-index: inherit; /* Inherit from parent Slide */

    /* spacing */
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;

    /* GPU acceleration */
    transform: translateZ(0);
    will-change: ${({ $isFocused }) => $isFocused ? 'transform' : 'auto'};
    contain: layout style; /* Removed paint containment to allow overflow */
    overflow: visible; /* Allow card content to overflow */

    /* styles */
    --theme-rgb: 13, 173, 220; /* BitGo */
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    background: linear-gradient(135deg,
        rgba(17, 21, 75, 1.0) 0%,
        rgba(44, 49, 81, 0.98) 30%,
        rgba(68, 75, 182, 0.98) 60%,
        rgba(132, 159, 241, 0.97) 100%
    );
    /* Disable expensive backdrop-filter on slow devices */
    ${({ $isSlowDevice }) => !$isSlowDevice ? `
        backdrop-filter: blur(20px) saturate(110%);
        -webkit-backdrop-filter: blur(20px) saturate(110%);
    ` : ''}
    border: 1px solid rgba(13, 173, 220, 0.4);
    border-radius: 24px;
    box-shadow:
        0 8px 16px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(13, 173, 220, 0.3),
        inset 0 -1px 2px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(13, 173, 220, 0.2);
    
    /* media queries */
    @media (min-width: 2000px) {
        padding-bottom: 2.5rem;
        box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.15),
            0 16px 48px rgba(0, 0, 0, 0.1),
            0 24px 64px rgba(0, 0, 0, 0.05),
            inset 0 1px 2px rgba(13, 173, 220, 0.3),
            inset 0 -1px 2px rgba(0, 0, 0, 0.2),
            0 0 40px rgba(13, 173, 220, 0.2);
    }
    
    @media (max-width: 1200px) {
        width: 100%;
        max-width: 400px;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        width: 90%;
        max-width: 340px;
        padding: 1.25rem 1.25rem 0.5rem 1.25rem;
        margin: 0 auto;
    }
`;

// card sections - header, body, and footer.
const CardHeader = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
`;

// header top - company info and company logo.
const HeaderTop = styled.div`
    /* layout */
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    /* spacing */
    gap: 1rem;
    margin-bottom: 0.5rem;
`;

// header overview - job title and project description.
const HeaderOverview = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 0.5rem;
`;

// company info - company name and date range.
const CompanyInfo = styled.div`
    /* layout */
    display: flex;
    flex: 1;
    flex-direction: column;

    /* spacing */
    gap: 0.5rem;
`;

// company name - the name of the company.
const CompanyName = styled.h3`
    /* spacing */
    margin: 0;

    /* styles */
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    letter-spacing: -0.5px;
    line-height: 1.2;
    font-weight: 700;
    font-size: 3rem;

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 2.2rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(1.5rem, 6vw, 2rem);
    }
`;

// date range - how long i worked there.
const DateRange = styled.span`
    /* styles */
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.5px;
    font-weight: 500;
    font-size: 1rem;

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 0.9rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.75rem, 2.5vw, 0.85rem);
    }
`;

// divider.
const Divider = styled.div`
    /* layout */
    width: 100%;

    /* spacing */
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    /* styles */
    border-radius: 2px;
    opacity: 0.5;
    height: 2px;
    background: ${props => props.$themeColor || 'rgba(255, 255, 255, 0.2)'};
    box-shadow: 0 0 10px ${props => props.$themeColor || 'rgba(255, 255, 255, 0.2)'};

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        margin-top: 0.4rem;
        margin-bottom: 0.4rem;
    }
`;

// card body - achievements list.
const CardBody = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;
`;

// job title - gradient text based on theme.
const JobTitle = styled.div`
    /* styles */
    letter-spacing: 0.5px;
    font-weight: 700;
    font-size: 1.3rem;

    /* theme-based gradient */
    background: ${({ $theme }) => {
        if ($theme === 'barlouie') {
            return `linear-gradient(
                135deg,
                rgb(175, 96, 108) 0%,
                rgb(203, 192, 196) 25%,
                rgb(232, 70, 90) 50%,
                rgb(203, 192, 196) 75%,
                rgb(175, 96, 108) 100%
            )`;
        } else if ($theme === 'hawkers') {
            return `linear-gradient(
                135deg,
                rgb(245, 148, 40) 0%,
                rgb(255, 163, 97) 25%,
                rgb(255, 107, 58) 50%,
                rgb(255, 163, 97) 75%,
                rgb(245, 148, 40) 100%
            )`;
        } else {
            // Default BitGo gradient
            return `linear-gradient(
        135deg,
        rgb(180, 200, 230) 0%,
        rgb(220, 230, 245) 15%,
        rgb(140, 180, 230) 30%,
        rgb(100, 160, 220) 45%,
        rgb(180, 200, 230) 60%,
        rgb(220, 235, 250) 75%,
        rgb(160, 190, 230) 90%,
        rgb(120, 170, 225) 100%
            )`;
        }
    }};
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% 100%;
    
    /* Subtle depth with shadows */
    filter: ${({ $theme }) => {
        if ($theme === 'barlouie') {
            return `drop-shadow(0 2px 4px rgba(232, 70, 90, 0.3))
                    drop-shadow(0 1px 2px rgba(203, 192, 196, 0.2))`;
        } else if ($theme === 'hawkers') {
            return `drop-shadow(0 2px 4px rgba(255, 107, 58, 0.3))
                    drop-shadow(0 1px 2px rgba(255, 163, 97, 0.2))`;
        } else {
            return `drop-shadow(0 2px 4px rgba(100, 160, 220, 0.3))
                    drop-shadow(0 1px 2px rgba(180, 200, 230, 0.2))`;
        }
    }};
    
    /* Smooth animation */
    animation: shimmer 8s ease-in-out infinite;
    
    @keyframes shimmer {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }
    
    @media (max-width: 1600px) {
        font-size: 1.1rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.95rem, 3vw, 1.1rem);
    }
`;

// project description - the description of the project.
const ProjectDescription = styled.p`
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-weight: 400;
    font-style: italic;

    @media (max-width: 1600px) {
    font-size: 0.9rem;
        line-height: 1.45;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.8rem, 2.5vw, 0.9rem);
        line-height: 1.5;
    }
`;

// achievements list - bullet point + one-liner.
const AchievementsList = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 1rem;
    padding: 0;

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        gap: 0.6rem;
    }
`;

// achievement.
const Achievement = styled.div`
    /* layout */
    display: flex;
    align-items: center;

    /* spacing */
    gap: 1rem;
    padding: 0.75rem;

    /* styles */
    border-radius: 12px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        padding: 0.65rem;
    }

    &:hover {
        /* styles */
        transform: translateX(4px);
        background: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.1)` : 'rgba(13, 173, 220, 0.1)'};
        border-color: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.4)` : 'rgba(13, 173, 220, 0.4)'};
        box-shadow: 0 4px 12px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};
    }
`;

// bullet point.
const AchievementIcon = styled.div`
    /* layout */
    flex-shrink: 0;

    /* styles */
    border-radius: 50%;
    width: 12px;
    height: 12px;
    background: ${({ $themeColor }) => {
        if ($themeColor) {
            return `linear-gradient(135deg, 
                rgba(${$themeColor}, 1) 0%,
                rgba(${$themeColor}, 0.85) 50%,
                rgba(${$themeColor}, 0.7) 100%
            )`;
        }
        return `linear-gradient(135deg, 
            rgba(13, 173, 220, 1) 0%,
            rgba(13, 173, 220, 0.85) 50%,
            rgba(13, 173, 220, 0.7) 100%
        )`;
    }};
    position: relative;
    margin-top: 2px;
    box-shadow: 
        0 0 10px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.5)` : 'rgba(13, 173, 220, 0.5)'},
        inset 0 1px 2px rgba(255, 255, 255, 0.25);
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
    }
    
    transition: all 0.3s ease;
    
    ${Achievement}:hover & {
        transform: scale(1.25);
        box-shadow: 
            0 0 16px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.7)` : 'rgba(13, 173, 220, 0.7)'},
            inset 0 1px 2px rgba(255, 255, 255, 0.35);
    }
`;

// text for achievement.
const AchievementText = styled.p`
    /* layout */
    flex: 1;

    /* spacing */
    margin: 0;

    /* styles */
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.9);

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 0.85rem;
        line-height: 1.45;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.8rem, 2.5vw, 0.85rem);
        line-height: 1.5;
    }
`;

// card footer - tech connection.
const CardFooter = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 0.75rem;
    padding-top: 0.75rem;
    padding-bottom: 1rem;
    margin-top: auto;
`;

/* ========== tech connection ========== */

const TechConnection = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 0.75rem;
`;

const TechConnectionTitle = styled.h4`
    /* spacing */
    margin: 0;

    /* styles */
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
    letter-spacing: 0.8px;
    font-weight: 600;
    font-size: 0.85rem;

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 0.8rem;
        letter-spacing: 0.7px;
    }
`;

const TechConnectionItem = styled.div`
    /* layout */
    display: flex;
    align-items: center;

    /* spacing */
    gap: 1rem;
    padding: 0.75rem;

    /* styles */
    border-radius: 12px;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        padding: 0.65rem;
    }

    &:hover {
        /* styles */
        transform: translateX(4px);
        background: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.1)` : 'rgba(13, 173, 220, 0.1)'};
        border-color: ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.4)` : 'rgba(13, 173, 220, 0.4)'};
        box-shadow: 0 4px 12px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.2)` : 'rgba(13, 173, 220, 0.2)'};
    }
`;

const TechConnectionDot = styled.div`
    /* layout */
    flex-shrink: 0;

    /* styles */
    border-radius: 50%;
    width: 12px;
    height: 12px;
    background: ${({ $themeColor }) => {
        if ($themeColor) {
            return `linear-gradient(135deg, 
                rgba(${$themeColor}, 1) 0%,
                rgba(${$themeColor}, 0.85) 50%,
                rgba(${$themeColor}, 0.7) 100%
            )`;
        }
        return `linear-gradient(135deg, 
            rgba(13, 173, 220, 1) 0%,
            rgba(13, 173, 220, 0.85) 50%,
            rgba(13, 173, 220, 0.7) 100%
        )`;
    }};
    position: relative;
    box-shadow: 
        0 0 10px ${({ $themeColor }) => $themeColor ? `rgba(${$themeColor}, 0.5)` : 'rgba(13, 173, 220, 0.5)'},
        inset 0 1px 2px rgba(255, 255, 255, 0.25);
    
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
    }
`;

const TechConnectionText = styled.p`
    margin: 0;
    text-align: justify;
    font-size: 0.9rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.88);
    font-weight: 400;
    font-style: italic;
    flex: 1;

    @media (max-width: 1600px) {
        font-size: 0.85rem;
        line-height: 1.45;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.8rem, 2.5vw, 0.85rem);
        line-height: 1.5;
    }
`;

/* ========== skills carousel ========== */

// carousel container.
const SkillsCarousel = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 0.6rem;

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        gap: 0.45rem;
    }
`;

// a single row = label + viewport.
const CarouselRow = styled.div`
    /* layout */
    display: flex;
    align-items: center;

    /* spacing */
    gap: 0.5rem;
`;

// row label (category name)
const RowLabel = styled.div`
    /* layout */
    flex-shrink: 0;

    /* styles */
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
    letter-spacing: 0.5px;
    font-weight: 700;
    font-size: 0.75rem;

    /* spacing */
    min-width: 70px;

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 0.7rem;
        letter-spacing: 0.4px;
        /* spacing */
        min-width: 62px;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.65rem, 2vw, 0.7rem);
        min-width: 55px;
        letter-spacing: 0.3px;
    }
`;

// viewport with soft edge fade (smooth in/out of frame)
const RowViewport = styled.div`
    /* layout */
    position: relative;
    overflow: hidden;
    flex: 1;

    /* spacing */
    height: 34px;

    /* styles */
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        height: 30px;
    }
`;

// animation for scrolling - GPU accelerated
const scroll = keyframes`
    from { transform: translateX(0) translateZ(0); }
    to   { transform: translateX(-33.333%) translateZ(0); } /* one-third of track width = one sequence */
`;

// the moving track (three identical sequences inside for almost seamless loop)
const RowTrack = styled.div.attrs(props => ({
    $isCardFocused: props.$isCardFocused || false,
    $isSlowDevice: props.$isSlowDevice || false
}))`
    /* layout */
    display: flex;
    align-items: center;
    width: max-content; /* shrink to content */

    /* spacing */
    gap: 0.4rem;

    /* GPU acceleration */
    transform: translateZ(0);
    will-change: ${({ $isCardFocused, $isSlowDevice }) => 
        ($isCardFocused && !$isSlowDevice) ? 'transform' : 'auto'};
    contain: layout style;

    /* styles */
    /* Disable skills carousel entirely on slow devices - major performance boost */
    /* On fast devices, only run when card is focused */
    ${({ $isCardFocused, $isSlowDevice }) => 
        ($isCardFocused && !$isSlowDevice) 
            ? css`animation: ${scroll} var(--dur, 20s) linear infinite;`
            : css`animation: none;`}
    animation-delay: var(--delay, 0s);
    animation-direction: ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};
    animation-play-state: ${({ $isCardFocused, $isSlowDevice }) => 
        ($isCardFocused && !$isSlowDevice) ? 'running' : 'paused'};
    
    /* On slow devices, hide the carousel entirely to save rendering */
    ${({ $isSlowDevice }) => $isSlowDevice ? `
        display: none;
    ` : ''}
    
    /* Pause animations during loading */
    [data-loading="true"] & {
        animation-play-state: paused;
    }

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        gap: 0.32rem;
    }

    /* interactions */
    ${RowViewport}:hover & { animation-play-state: paused; }

    @media (prefers-reduced-motion: reduce) {
        animation: none !important;
        transform: none !important;
    }
`;

// one sequence of pills (duplicated for seamless loop)
const Sequence = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    white-space: nowrap;

    /* spacing */
    gap: 0.4rem;

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        gap: 0.32rem;
    }
`;

/* ========== skill pill ========== */

const SkillPill = styled.div`
    /* layout */
    overflow: hidden;
    position: relative;
    align-items: center;
    display: inline-flex;

    /* spacing */
    gap: 0.5rem;
    padding: 0.45rem 0.85rem;

    /* styles */
    cursor: default;
    font-weight: 600;
    font-size: 0.8rem;
    border-radius: 999px;
    backdrop-filter: blur(8px);
    color: rgba(255, 255, 255, 0.95);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    /* brand-specific styling */
    background: ${({ $skillName }) => {
        const colors = getBrandColors($skillName);
        return colors.gradient;
    }};
    
    border: 1.5px solid ${({ $skillName }) => {
        const colors = getBrandColors($skillName);
        return colors.border;
    }};
    
    box-shadow:
        0 2px 8px ${({ $skillName }) => {
            const colors = getBrandColors($skillName);
            return colors.shadow;
        }},
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    
    /* subtle shine effect */
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.5s ease;
    }
    
    &:hover {
        box-shadow: 
            0 6px 16px ${({ $skillName }) => {
                const colors = getBrandColors($skillName);
                return colors.hoverShadow;
            }},
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 20px ${({ $skillName }) => {
                const colors = getBrandColors($skillName);
                return colors.hoverGlow;
            }};
        border-color: ${({ $skillName }) => {
            const colors = getBrandColors($skillName);
            return colors.hoverBorder;
        }};
        
        &::before {
            left: 100%;
        }
    }
    
    &:active {
        transform: translateY(-1px) scale(1);
    }
    
    @media (max-width: 1600px) {
        padding: 0.35rem 0.7rem;
        font-size: 0.75rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        padding: 0.3rem 0.6rem;
        font-size: clamp(0.7rem, 2vw, 0.75rem);
        gap: 0.4rem;
    }
`;

const SkillPillIcon = styled.img`
    /* layout */
    width: 1.05rem;
    height: 1.05rem;
    display: flex;
    align-items: center;

    /* styles */
    object-fit: contain;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));

    /* media queries */
    @media (max-width: 1600px) {
        width: 0.95rem;
        height: 0.95rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        width: clamp(0.85rem, 2vw, 0.95rem);
        height: clamp(0.85rem, 2vw, 0.95rem);
    }

    ${SkillPill}:hover & {
        transform: scale(1.1) rotate(5deg);
    }
`;

const SkillPillName = styled.span`
    /* styles */
    line-height: 1;
    font-weight: 600;
    font-size: 0.8rem;
    white-space: nowrap;
    letter-spacing: 0.3px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 0.75rem;
        letter-spacing: 0.25px;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.7rem, 2vw, 0.75rem);
        letter-spacing: 0.2px;
    }
`;

/* ========== service experience cards ========== */

const ServiceExperienceCard = styled.div.attrs(props => ({
    $isSlowDevice: props.$isSlowDevice || false
}))`
    /* styles */
    --theme-rgb: ${({ $theme }) =>
        $theme === 'barlouie' ? '203, 192, 196'
        : $theme === 'hawkers' ? '245, 148, 40'
        : '255,255,255'};

    /* layout */
    width: 500px;
    display: flex;
    height: fit-content;
    flex-direction: column;
    
    /* GPU acceleration */
    transform: translateZ(0);
    will-change: transform;
    contain: layout style paint;
    
    /* optimized transition */
    transition: transform 0.4s ease, box-shadow 0.4s ease;

    /* spacing */
    padding: 2rem 1.5rem 0rem 1.5rem;

    /* styles */
    background: ${({ $theme }) => {
        if ($theme === 'barlouie') {
            return `linear-gradient(135deg,
                rgba(17, 0, 8, 1.0) 0%,
                rgba(30, 10, 15, 0.98) 30%,
                rgba(80, 20, 35, 0.98) 60%,
                rgba(134, 33, 49, 0.97) 100%
            )`;
        } else if ($theme === 'hawkers') {
            return `linear-gradient(135deg,
                rgba(40, 30, 15, 1.0) 0%,
                rgba(40, 60, 35, 0.98) 30%,
                rgba(30, 80, 45, 0.98) 60%,
                rgba(40, 118, 97, 0.97) 100%
            )`;
        }
    }};
    /* Disable expensive backdrop-filter on slow devices */
    ${({ $isSlowDevice }) => !$isSlowDevice ? `
        backdrop-filter: blur(20px) saturate(110%);
    ` : ''}
    border: 1px solid ${({ $theme }) => {
        if ($theme === 'barlouie') return 'rgba(203, 192, 196, 0.4)';
        if ($theme === 'hawkers') return 'rgba(245, 148, 40, 0.4)';
        return 'rgba(255, 255, 255, 0.3)';
    }};
    border-radius: 24px;
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        inset 0 1px 2px rgba(255, 255, 255, 0.1);
    
    @media (min-width: 2000px) {
        width: 500px;
    }
    
    @media (max-width: 1600px) {
        /* layout */
        width: 450px;
        /* spacing */
        padding: 1.5rem 1.25rem;
    }
    
    @media (max-width: 1200px) {
        /* layout */
        width: 100%;
        /* spacing */
        max-width: 400px;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        width: 90%;
        max-width: 340px;
        padding: 1.5rem 1.25rem 0.5rem 1.25rem;
        margin: 0 auto;
    }
`;

/* ========== nav arrows ========== */

// arrow bounce animations.
const leftBounce = keyframes`
    0%, 100% { transform: translateY(-50%) translateX(0); }
    25% { transform: translateY(-50%) translateX(-3px); }
    75% { transform: translateY(-50%) translateX(3px); }
`;

const rightBounce = keyframes`
    0%, 100% { transform: translateY(-50%) translateX(0); }
    25% { transform: translateY(-50%) translateX(3px); }
    75% { transform: translateY(-50%) translateX(-3px); }
`;

const ArrowBase = styled.button`
    /* layout */
    position: absolute;
    display: grid;
    place-items: center;
    top: 50%;
    z-index: 20;

    /* spacing */
    width: 56px;
    height: 56px;

    /* styles */
    color: #fff;
    opacity: 0.95;
    line-height: 1;
    font-size: 32px;
    cursor: pointer;
    font-weight: bold;
    border-radius: 16px;
    backdrop-filter: blur(12px);
    transform: translateY(-50%);
    border: 2px solid rgba(255,255,255,0.3);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15));
    box-shadow:
        0 4px 16px rgba(0,0,0,0.15),
        0 0 20px rgba(255,255,255,0.1),
        inset 0 1px 2px rgba(255,255,255,0.2);

    &:hover {
        /* styles */
        transform: translateY(-50%) scale(1.1);
        background: linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.25));
        border-color: rgba(255,255,255,0.5);
        box-shadow:
            0 6px 24px rgba(0,0,0,0.2),
            0 0 30px rgba(255,255,255,0.2),
            inset 0 1px 3px rgba(255,255,255,0.3);
    }

    &:active {
        /* styles */
        transform: translateY(-50%) scale(0.95);
    }
    
    /* mobile */
    @media (max-width: 768px) {
        width: 44px;
        height: 44px;
        font-size: 28px;
        border-radius: 12px;
    }
`;

const ArrowLeft = styled(ArrowBase)`
    /* layout */
    left: max(12px, 4vw);
    
    /* mobile - position relative to centered card */
    @media (max-width: 768px) {
        left: calc(50% - 170px - 60px); /* Center minus half card width (340px/2) minus arrow width and gap */
    }

    /* styles */
    animation: ${leftBounce} 2s ease-in-out infinite;
    animation-delay: 0.5s;
`;

const ArrowRight = styled(ArrowBase)`
    /* layout */
    right: max(12px, 4vw);
    
    /* mobile - position relative to centered card */
    @media (max-width: 768px) {
        right: auto;
        left: calc(50% + 170px + 12px); /* Center plus half card width (340px/2) plus gap */
    }

    /* styles */
    animation: ${rightBounce} 2s ease-in-out infinite;
    animation-delay: 1s;
`;

/* ========== aurora wrapper ========== */

const AuroraWrapper = styled.div`
    /* layout */
    left: 0;
    right: 0;
    top: -2%;
    z-index: 1;
    position: absolute;

    /* spacing */
    height: 42vh; /* give room so blur/overscan isn't clipped */

    /* styles */
    overflow: hidden;
    pointer-events: none;

    /* media queries */
    @media (max-width: 1600px) {
        /* spacing */
        height: 40vh;
    }
`;

/* ========== hire me intro card ========== */

const HireCard = styled.div`
    /* layout */
    width: 380px;
    display: flex;
    align-items: stretch;
    flex-direction: column;

    /* spacing */
    gap: 0.65rem;
    max-width: 90vw;
    padding: 1.25rem 1.1rem 1rem 1.1rem;

    /* styles */
    text-align: left;
    border-radius: 20px;
    background: linear-gradient(135deg,
        rgba(76, 54, 134, 0.98) 0%,
        rgba(108, 85, 181, 0.96) 50%,
        rgba(170, 150, 235, 0.95) 100%
    );
    border: 1.5px solid rgba(200, 180, 255, 0.45);
    box-shadow:
        0 8px 18px rgba(0, 0, 0, 0.25),
        0 0 24px rgba(180, 160, 255, 0.25),
        inset 0 1px 2px rgba(255, 255, 255, 0.08);

    /* media queries */
    @media (max-width: 1600px) {
        /* layout */
        width: 340px;
        /* spacing */
        padding: 1rem 1rem 0.9rem 1rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        width: 90%;
        max-width: 320px;
        padding: 1rem 0.9rem 0.8rem 0.9rem;
        margin: 0 auto;
    }
`;

const HireHeader = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    flex-direction: column;

    /* spacing */
    gap: 0.25rem;

    /* styles */
    text-align: center;
`;

const HireTitle = styled.h3`
    /* spacing */
    margin: 0;

    /* styles */
    background: linear-gradient(135deg, #fff, rgba(210,190,255,.95));
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: 900;
    font-size: 1.9rem;

    /* media queries */
    @media (max-width: 1600px) {
        /* styles */
        font-size: 1.5rem;
    }
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(1.3rem, 5vw, 1.5rem);
    }
`;

const HireSubtitle = styled.div`
    /* styles */
    font-size: 0.95rem;
    color: rgba(255,255,255,0.78);
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.85rem, 2.5vw, 0.95rem);
    }
`;

const HireBody = styled.div`
    /* layout */
    display: flex;
    flex-direction: column;

    /* spacing */
    gap: 0.9rem;
`;

const HireBlurb = styled.p`
    /* spacing */
    margin: 0;

    /* styles */
    text-align: center;
    color: rgba(255,255,255,0.9);
    font-size: 0.9rem;
    line-height: 1.6;
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.85rem, 2.5vw, 0.9rem);
        line-height: 1.5;
    }
`;

const HireActions = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    /* spacing */
    gap: 0.5rem;
`;

const HireAvatar = styled.img`
    /* layout */
    align-self: center;

    /* styles */
    object-fit: cover;
    border-radius: 50%;
    width: 50%;
    height: 50%;
    border: 2px solid rgba(230,210,255,0.7);
    box-shadow: 0 4px 14px rgba(180,160,255,0.25);
`;

const HireButton = styled.button`
    /* spacing */
    padding: 0.65rem 1rem;

    /* styles */
    text-decoration: none;
    transition: all 200ms ease;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(180, 160, 255, 0.3);
    background: linear-gradient(135deg, rgba(200,180,255,0.38), rgba(150,120,255,0.25));
    border: 1.5px solid rgba(200, 180, 255, 0.65);
    border-radius: 12px;
    color: rgba(255,255,255,0.98);
    font-weight: 700;

    &:hover {
        /* styles */
        transform: translateY(-1px);
        background: linear-gradient(135deg, rgba(210,190,255,0.5), rgba(160,130,255,0.35));
        border-color: rgba(200, 180, 255, 0.9);
        box-shadow: 0 10px 24px rgba(180, 160, 255, 0.4);
    }
    
    /* mobile */
    @media (max-width: 768px) {
        padding: 0.55rem 0.85rem;
        font-size: clamp(0.85rem, 2.5vw, 0.95rem);
    }
`;

const HireReach = styled.div`
    /* styles */
    letter-spacing: 0.3px;
    color: rgba(230, 220, 255, 0.9);
    font-size: 0.85rem;
    
    /* mobile */
    @media (max-width: 768px) {
        font-size: clamp(0.75rem, 2.5vw, 0.85rem);
    }
`;

// Email row container for email button and copy button
const EmailRow = styled.div`
    /* layout */
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    justify-content: center;
    
    /* mobile */
    @media (max-width: 768px) {
        gap: 0.4rem;
        flex-wrap: wrap;
    }
`;

// Copy button
const CopyButton = styled.button`
    /* spacing */
    padding: 0.65rem 0.85rem;
    
    /* styles */
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
    border-radius: 12px;
    transition: all 200ms ease;
    background: linear-gradient(135deg, rgba(200,180,255,0.38), rgba(150,120,255,0.25));
    border: 1.5px solid rgba(200, 180, 255, 0.65);
    color: rgba(255,255,255,0.98);
    box-shadow: 0 6px 16px rgba(180, 160, 255, 0.3);
    
    /* Copy feedback state */
    ${({ $copied }) => $copied && `
        background: linear-gradient(135deg, rgba(150,255,150,0.5), rgba(100,255,100,0.4));
        border-color: rgba(150, 255, 150, 0.8);
        box-shadow: 0 6px 16px rgba(150, 255, 150, 0.4);
    `}
    
    &:hover {
        transform: translateY(-1px);
        background: linear-gradient(135deg, rgba(210,190,255,0.5), rgba(160,130,255,0.35));
        border-color: rgba(200, 180, 255, 0.9);
        box-shadow: 0 10px 24px rgba(180, 160, 255, 0.4);
    }
    
    &:active {
        transform: translateY(0) scale(0.95);
    }
    
    /* Ensure emoji/checkmark is centered */
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    height: 44px;
    
    /* mobile */
    @media (max-width: 768px) {
        min-width: 40px;
        height: 40px;
        padding: 0.55rem 0.75rem;
        font-size: 1rem;
    }
`;

// Icon wrapper for checkmark animation
const CopyIconWrapper = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${({ $copied }) => $copied && css`
        animation: ${iconScaleIn} 0.3s ease-out;
    `}
`;

// export component.
ActualExperience.displayName = 'ActualExperience';
export default ActualExperience;
