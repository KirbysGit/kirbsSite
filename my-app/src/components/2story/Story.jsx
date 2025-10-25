// basic imports.
import styled from 'styled-components';
import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';

// map pin component.
import MapPin from '../Experience/MapPin';

// aurora component
import Aurora from './Aurora';

// meteor shower component
import MeteorShower from './MeteorShower';

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
import asteroid1 from '@/images/story/asteroid1.png';
import asteroid2 from '@/images/story/asteroid2.png';
import asteroid3 from '@/images/story/asteroid3.png';
import asteroid4 from '@/images/story/asteroid4.png';

const Story = memo(() => {
    
    // states.
    const [activeParagraph, setActiveParagraph] = useState(0);
    const paragraphRefs = useRef([]);

    // optimized scroll tracking with IntersectionObserver (no layout reads)
    useEffect(() => {
        const els = paragraphRefs.current.filter(Boolean);
        els.forEach((el, i) => el.setAttribute('data-idx', i));

        const io = new IntersectionObserver(
            (entries) => {
                // pick the most visible paragraph
                const best = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (best) setActiveParagraph(Number(best.target.dataset.idx));
            },
            { threshold: [0.3, 0.6] } // tune as desired
        );

        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);

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

    // memoized paragraph component with stable ref callback
    const MemoizedStoryParagraph = useMemo(() => {
        return React.memo(function Para({ children, paragraphIndex, isReversed, isActive }) {
            const setRef = useCallback((el) => {
                paragraphRefs.current[paragraphIndex] = el || null;
            }, [paragraphIndex]);

            return (
                <StoryParagraph
                    ref={setRef}
                    $isActive={isActive}
                    $isReversed={isReversed}
                >
                    {children}
                </StoryParagraph>
            );
        });
    }, []);

    return (
        <StoryContainer>
            {/* Background effects - positioned absolutely to avoid layout shifts */}
            <BackgroundEffectsLayer>
                {/* <Aurora /> */}
                { /* <MeteorShower images={[asteroid1, asteroid2, asteroid3, asteroid4]} /> */}
            </BackgroundEffectsLayer>
            
            {/* main story title */}
            <StoryMainTitle>My Story</StoryMainTitle>
            
            {/* early years */}
            <StorySection>

                {/* space station - static in top right */}
                <SpaceStation />
                
                {/* satellites floating through background */}
                <Satellite1 />
                <Satellite2 />

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

                    {/* image of lebron james (me) */}
                    <ImageCard
                        $position="diagonal-down-left"
                        $image={alwaysChillin}
                        $alt="Always Chillin"
                    >
                        <BubbleContainer $position="bottom-left">
                            <SpeechBubble $parentPosition="bottom-left"
                            $width="100%">
                                Calm and collected under pressure. 🧘‍♂️
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-left"
                            $width="59%">
                                Just called game. 🏀
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>
                </OverlappingImageContainer>
                
                {/* early years story telling */}
                <TextContainer>
                    <StoryTitle>The Early Years ~<StoryDate>03' to 21'</StoryDate></StoryTitle>
                    <StoryText>
                        <MemoizedStoryParagraph 
                            paragraphIndex={0}
                            isActive={activeParagraph === 0}
                            isReversed={false}
                        >
                            🏠 So... back to <span className="special-moment">day one</span>, I was born and raised in <span className="location">Windermere, Florida</span>. Outside of <span className="activity">school</span>, I spent basically all of my time doing one of the following: <span className="activity">playing sports</span>, <span className="activity">video games</span>, <span className="activity">drawing</span>, or just hanging out with my <span className="subject-good">friends</span> doing literally <span className="emphasis">anything that sounded fun</span>.
                        </MemoizedStoryParagraph>
                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={1}
                            isActive={activeParagraph === 1}
                            isReversed={false}
                        >
                            📚 School wasn't really my favorite, mostly because of the <span className="negative">early mornings</span> and <span className="negative">boring homework</span>. I kept my <span className="subject-good">A's</span> to stay out of trouble. <span className="subject-good">Math</span> and <span className="subject-good">science</span> were my strong suits. <span className="subject-bad">English</span> definitely was <span className="emphasis">NOT</span>, and honestly I still don't understand where to use <span className="skill">em-dashes</span>.
                        </MemoizedStoryParagraph>

                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={2}
                            isActive={activeParagraph === 2}
                            isReversed={false}
                        >
                            🎨 I was always drawn to <span className="activity">art</span>, probably from my <span className="subject-good">parents</span>. I'd <span className="activity">doodle</span> in class and loved the <span className="activity">design</span> side of projects because it let me be <span className="emphasis">creative</span>. That same <span className="emphasis">creative</span> streak pulled me into <span className="activity">music</span> too.
                        </MemoizedStoryParagraph>
                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={3}
                            isActive={activeParagraph === 3}
                            isReversed={false}
                        >
                            🎓 By the time I hit <span className="special-moment">high school</span>, my schedule was packed with <span className="activity">sports</span>, <span className="activity">classes</span>, and a couple of <span className="activity">clubs</span>. I didn't really have a big plan for <span className="special-moment">college</span> at first. I just knew I would go, and I picked a school <span className="emphasis">a few days</span> before applying based on my <span className="subject-good">scholarships</span>.
                        </MemoizedStoryParagraph>
                    </StoryText>
                </TextContainer>

            </StorySection>

            {/* my college years */}
            <StorySection $reverse>

                <OverlappingImageContainer>
                    {/* pin of ucf */}
                    <MapPinWrapper $side="right">
                        <MapPin 
                            item={{ theme: { primary: '#ff6b6b' } }}
                            coords={[28.6024, -81.2001]}
                            address="University of Central Florida"
                            link="https://www.google.com/maps/place/University+of+Central+Florida/@28.6024,-81.2001,15z"
                            style="outdoors-v12"
                            size="400x350"
                            pitch={55}
                            bearing={-40}
                            zoom={13.8}
                            pinSize="7rem"
                            pinPosition={{ bottom: "44%", left: "31%" }}
                            pulsePosition={{ top: "50%", left: "50.5%" }}
                            showPulse={true}
                            mapFilters="grayscale(20%) brightness(85%) contrast(110%)"
                            borderRadius="20px"
                        />
                    </MapPinWrapper>

                    {/* image of me in front of engienering building */}
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

                    {/* ucf aesthetic photo */}
                    <ImageCard
                        $position="diagonal-down-right"
                        $image={ucf4}
                        $alt="UCF4"
                    >
                        <BubbleContainer $position="top-right">
                            <SpeechBubble $parentPosition="top-right"  $width="85%">
                                GKCO ⚔️
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="top-right" $width="100%">
                                SPACE U 🚀
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>

                    {/* the john */}
                    <ImageCard 
                        $position="diagonal-down-left-from-right" 
                        $image={secondHome}
                        $alt="Second Home"
                    >
                        <BubbleContainer $position="bottom-left">
                            <SpeechBubble $parentPosition="bottom-left" $width="85%">
                                My second home 😍 🏡
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-left" $width="100%">
                                Too many long nights here 😴
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>
                    
                </OverlappingImageContainer>

                {/* my college years story telling */}
                <TextContainer $isReversed={true}>
                    <StoryTitle>My College Years ~<StoryDate>21' to 25'</StoryDate></StoryTitle>
                    <StoryText>
                        <MemoizedStoryParagraph 
                            paragraphIndex={4}
                            isActive={activeParagraph === 4}
                            isReversed={true}
                        >
                            🏫 I wasn't really set on any university, but <span className="ucf">UCF</span> felt like the right fit. I came into <span className="ucf">UCF</span> majoring in <span className="major">Mechanical Engineering</span> just because I was good at <span className="subject-good">STEM</span> stuff and didn't stop until after I got through <span className="emphasis">Statics</span> and realized that I wasn't really in the mood for any more free-body diagrams.
                        </MemoizedStoryParagraph>
                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={5}
                            isActive={activeParagraph === 5}
                            isReversed={true}
                        >
                            🛠️ <span className="special-moment">Freshman year</span> flew by, but I do remember one <span className="python">Intro to Python</span> class being really <span className="subject-good">interesting</span> to me. Then in my <span className="special-moment">sophomore year</span> I switched over to <span className="major">Computer Engineering</span> so I could keep some <span className="skill">hands-on</span> work while learning to <span className="skill">code</span>.
                        </MemoizedStoryParagraph>

                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={6}
                            isActive={activeParagraph === 6}
                            isReversed={true}
                        >
                            🔒 College for me felt a lot like high school in terms of the <span className="skill">routine</span>. I was in <span className="activity">class</span>, <span className="activity">studying</span>, <span className="activity">working</span>, or at the <span className="activity">gym</span> most days. I joined a few <span className="activity">clubs</span> for the <span className="skill">networking</span>. It was a <span className="emphasis">constant grind</span>, but honestly I was <span className="emphasis">addicted</span> to it.
                        </MemoizedStoryParagraph>
                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={7}
                            isActive={activeParagraph === 7}
                            isReversed={true}
                        >
                            🚀 These <span className="special-moment">years</span> were where I <span className="emphasis">grew</span> the most. But with my <span className="emphasis">packed schedule</span>, I realized I had <span className="negative">lost track</span> of what I was working towards. I was getting hooked on the <span className="emphasis">dopamine</span> of "I got stuff done today". I realized I needed to take a <span className="emphasis">step back</span> before I jumped into a <span className="major">job</span> that didn't <span className="subject-good">align</span> with me.
                        </MemoizedStoryParagraph>
                    </StoryText>
                </TextContainer>

            </StorySection>

            {/* post-grad life */}
            <StorySection>


                <OverlappingImageContainer>

                    {/* image of the camp site */}
                    <ImageCard 
                        $position="top-left" 
                        $image={campingTrip} 
                        $alt="Camping Trip" >
                        <BubbleContainer $position="top-left">
                            <SpeechBubble $parentPosition="bottom-left" $width="75%">
                                Got some time to go camping with friends 🚗🏕️
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-left" $width="max-content">
                                St. George Island, FL 🌊
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>

                    {/* image of lil g */}
                    <ImageCard 
                        $position="bottom-right" 
                        $image={lilG}
                        $alt="Lil G"
                    >
                        <BubbleContainer $position="bottom-right">
                            <SpeechBubble $parentPosition="bottom-right" $width="max-content">
                                My lil bro 🐕
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-right" $width="max-content">
                                His name is Guinness 🍺
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
                            <SpeechBubble $parentPosition="bottom-left"
                            $width="max-content">
                                A look into my setup ⌨️🖱️
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-left"
                            $width="max-content">
                                Where the magic happens 🪄
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>

                    {/* sandusy sunset image*/}
                    <ImageCard
                        $position="sunset"
                        $image={sanduskySunset}
                        $alt="Sandusky Sunset"
                    >
                        <BubbleContainer $position="bottom-right" $width="75%">
                            <SpeechBubble $parentPosition="bottom-right" $width="max-content">
                                Sandusky, Ohio 📍
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-right" $width="65%">
                                Finally got some time to visit family 😄
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>
                    
                </OverlappingImageContainer>

                {/* post-grad life story telling */}
                <TextContainer>
                    <StoryTitle>Post-Grad Life ~<StoryDate>25' to Today</StoryDate></StoryTitle>
                    <StoryText>
                        <MemoizedStoryParagraph 
                            paragraphIndex={8}
                            isActive={activeParagraph === 8}
                            isReversed={false}
                        >
                            🧑‍🎓 Honestly, thus far <span className="special-moment">post-grad</span> has been weird. The <span className="emphasis">momentum</span> shift from <span className="activity">full-time classes</span>, <span className="activity">internships</span>, and <span className="activity">part-time work</span> to setting my own pace took some <span className="emphasis">adjusting</span>. Having no built-in to-do list felt odd but also kind of <span className="subject-good">freeing</span>.
                        </MemoizedStoryParagraph>
                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={9}
                            isActive={activeParagraph === 9}
                            isReversed={false}
                        >
                            ☀️ I took the <span className="special-moment">Summer of 2025</span> to get clear on what I want for myself. I <span className="emphasis">slowed down</span>, cleaned up the <span className="negative">mental clutter</span>, and kept <span className="skill">skills</span> sharp by working on <span className="activity">past projects</span>, polishing my <span className="activity">portfolio</span>, and grinding that <span className="negative">god awful LeetCode</span> all while still working my <span className="activity">serving job</span>.
                        </MemoizedStoryParagraph>

                        <MemoizedStoryParagraph 
                            paragraphIndex={10}
                            isActive={activeParagraph === 10}
                            isReversed={false}
                        >
                            🔍 Now getting back into it, I'm in the <span className="emphasis">job search</span>. I don't have it all <span className="negative">mapped out</span> (barely any of it, honestly), but I do know that I am drawn to <span className="skill">software</span> and I want to stay close to <span className="subject-good">people</span>, so maybe <span className="major">Tech Sales</span>? Who knows.
                        </MemoizedStoryParagraph>
                        
                        <MemoizedStoryParagraph 
                            paragraphIndex={11}
                            isActive={activeParagraph === 11}
                            isReversed={false}
                        >
                            🎯 I do however know that I have <span className="emphasis">big goals</span> that I know I will <span className="subject-good">achieve</span>. So for now I'm <span className="emphasis">taking my time</span>, working on <span className="skill">myself</span>, and looking for a <span className="subject-good">team</span> I can <span className="emphasis">grow</span> with. Until I find it, I'll keep <span className="emphasis">getting better</span>.
                        </MemoizedStoryParagraph>
                    </StoryText>
                </TextContainer>

            </StorySection>
        </StoryContainer>
    );
});

// -------------------------------------------------------------- main container.
const StoryContainer = styled.div`
    /* layout */
    display: flex;
    overflow: hidden;
    position: relative;
    flex-direction: column;

    /* spacing */
    gap: 0rem;
    width: 100%;
    min-height: 100vh;
    padding-top: 2rem;
    padding-bottom: 6rem;

    /* styles */
    background: linear-gradient(to bottom,
        rgb(13, 7, 27) 0%,
        rgb(13, 7, 27) 25%,
        rgb(30, 20, 55) 50%,
        rgb(45, 30, 80) 65%,
        rgb(65, 45, 110) 80%,
        rgb(85, 60, 135) 90%,
        rgb(100, 70, 150) 100%);

    /* smooth scrolling optimizations */
    overscroll-behavior: contain;

    /* media queries */
    @media (max-width: 1600px) {
        padding-bottom: 3rem;
    }
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

// main story title at the top
const StoryMainTitle = styled.div` 
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
const StorySection = styled.div`
    /* layout */
    display: flex;
    align-items: flex-start;
    flex-direction: ${props => props.$reverse ? 'row-reverse' : 'row'};

    /* spacing */
    gap: 3rem;
    padding: 3rem 2rem;
`;

// images throughout the "story".
const OverlappingImageContainer = styled.div`
    /* layout */
    flex: 3;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    
    /* spacing */
    padding: 1rem;
    min-height: 500px;
    
    /* ok to defer images; avoid on text */
    content-visibility: auto;
    contain-intrinsic-size: 600px;
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
    /* set up of the positioning for the zig zag is pretty brute force, don't judge me. */

    /* layout */
    display: flex;
    overflow: visible;
    position: absolute;
    align-items: center;
    justify-content: center;
    z-index: ${props => {
        switch(props.$position) {
            case 'bottom-right': return 1;
            case 'diagonal-down-left': return 1;
            case 'bottom-left': return 2;
            default: return 1;
        }
    }};

    /* spacing */
    /* we're handling width / height in the media queries */

    /* styles */
    cursor: pointer;
    border-radius: 20px;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
    font-size: ${props => props.$image ? '0' : '3.5rem'};
    background: ${props => props.$image 
        ? `url(${props.$image}) center/cover` 
        : 'rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${props => props.$image ? 'none' : 'blur(10px)'};
    
    /* --- layout by $position prop --- */

    /* top-left position like camping trip */
    ${props => props.$position === 'top-left' && `
        top: 0;
        left: 0;
        transform: translate(40px, 40px);
    `}
    
    /* bottom-right position like lil g & me playing baseball */
    ${props => props.$position === 'bottom-right' && `
        bottom: 0;
        right: 0;
        transform: translate(20px, 50px);
    `}
    
    /* bottom-left position like me in front of engineering building */
    ${props => props.$position === 'bottom-left' && `
        bottom: 0;
        left: 0;
        transform: translate(-20px, 20px);
    `}
    
    /* diagonal-down-left position like for me playing basketball or the set up pic */
    ${props => props.$position === 'diagonal-down-left' && `
        top: 75%;
        left: 0;
        transform: translate(35px, 30px);

        @media (max-width: 2000px) {
            transform: translate(35px, 75px);
        }
    `}
    
    /* diagonal-down-right for the ucf aesthetic photo */
    ${props => props.$position === 'diagonal-down-right' && `
        top: 75%;
        right: 0;
        transform: translate(-35px, 30px);
    `}

    /* sunset position like sandusky sunset */
    ${props => props.$position === 'sunset' && `
        top: 100%;
        right: 0;
        transform: translate(20px, 80px);
    `}
    
    /* diagonal-down-left-from-right for the library pic */
    ${props => props.$position === 'diagonal-down-left-from-right' && `
        top: 100%;
        left: 0;
        transform: translate(-20px, 40px);
    `}

    /* media queries */
    @media (max-width: 2000px) {
        width: 24rem;
        height: 24rem;
    }

    @media (max-width: 1600px) {
        width: 20rem;
        height: 20rem;
    }
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
    /* layout */
    flex: 4;
    height: 100%;    
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    /* spacing */
    padding: 0rem 2rem 2rem 2rem;
       
    /* styles */
    color: white;
    
    /* --- positioning based on $isReversed prop --- */
    ${props => props.$isReversed && `
        padding: 0rem 0rem 2rem 2rem;
    `}
`;

// ttile of the story section, like "early years" or "college".
const StoryTitle = styled.div`
    /* layout */
    display: flex;
    align-items: center;

    /* spacing */
    margin-top: 1.5rem;
    margin-bottom: 1rem;

    /* styles */
    font-weight: 700;

    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.9) 0%,
        rgba(200, 180, 255, 0.8) 50%,
        rgba(150, 200, 255, 0.9) 100%);

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* media queries */

    @media (max-width: 2000px) {
        font-size: 5rem; 
    }

    @media (max-width: 1600px) {
        font-size: 3rem;
    }
`;

// date of the story section, like "03' to 21'".
const StoryDate = styled.span`
    /* layout */
    display: inline-block;
    vertical-align: middle;

    /* spacing */
    margin-left: 0.5rem;

    /* styles */
    font-weight: 400;
    color: rgba(255, 255, 255, 1);

    /* media queries */

    @media (max-width: 2000px) {
        font-size: 3.5rem; 
    }

    @media (max-width: 1600px) {
        font-size: 2.25rem;
    }
`;

// wrapper for the actual text of the story.
const StoryText = styled.div`
    /* layout */
    max-width: 100%;

    /* spacing */
    padding: 0 3rem 0 0;

    /* styles */
    text-align: left;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);

    /* media queries */
    @media (max-width: 2000px) {
        font-size: 1.5rem; 
    }

    @media (max-width: 1600px) {
        font-size: 1.2rem;
    }
`;

const StoryParagraph = styled.p`
    
    /* layout */
    position: relative;

    /* spacing */
    margin-bottom: 2rem;
    padding-left: ${props => props.$isReversed ? '0' : '3rem'};
    padding-right: ${props => props.$isReversed ? '3rem' : '0'};

    /* styles */
    font-weight: 400;
    text-indent: 0rem;
    text-align: justify;
    letter-spacing: 0.3px;
    
    /* Subtle active paragraph highlighting */
    color: ${props => (props.$isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.82)')};
    text-shadow: ${props => (props.$isActive ? '0 0 .5px rgba(255,255,255,.25)' : 'none')};
    transition: color 180ms ease;
    
    /* Subtle background highlight for active paragraph */
    background: ${props => (props.$isActive 
        ? 'linear-gradient(90deg, rgba(150,200,255,0.08) 0%, transparent 20%, transparent 80%, rgba(150,200,255,0.08) 100%)'
        : 'transparent'
    )};
    transition: background 200ms ease;

    /* Enhanced emphasis highlight for active paragraph */
    & .emphasis {
        background: ${props => (props.$isActive 
            ? 'linear-gradient(120deg, rgba(150,200,255,0.4) 0%, rgba(200,180,255,0.3) 50%, rgba(150,200,255,0.4) 100%)'
            : 'linear-gradient(120deg, transparent 0, rgba(150,200,255,0.2) 30%, transparent 60%)'
        )};
        background-size: 100% 100%;
        background-repeat: no-repeat;
        transition: background 220ms ease;
        border-radius: 2px;
        padding: 1px 2px;
    }
    
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
export default Story;
