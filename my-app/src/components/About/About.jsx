import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MapPin from '../Experience/MapPin';
import naturalAthlete from '@/images/naturalAthlete.jpg';
import alwaysChillin from '@/images/alwaysChillin.jpg';
import engineeringGuy from '@/images/engineeringGuy.jpg';
import ucf4 from '@/images/ucf4.jpg';
import secondHome from '@/images/secondHome.jpg';
import campingTrip from '@/images/campingTrip.jpg';
import lilG from '@/images/lilG.jpg';
import mySetUp from '@/images/mySetUp.jpg';
import sanduskySunset from '@/images/sanduskySunset.jpg';

const About = () => {
    const [activeParagraph, setActiveParagraph] = useState(0);
    const paragraphRefs = useRef([]);

    // Optimized scroll tracking for Early Years section only
    useEffect(() => {
        let lastScrollTime = 0;
        let cachedViewportHeight = window.innerHeight;
        let currentActiveParagraph = 0;

        const handleScroll = () => {
            const now = Date.now();
            
            // Only run every 100ms to reduce calculations
            if (now - lastScrollTime < 100) return;
            lastScrollTime = now;

            // Cache viewport height to avoid repeated calculations
            cachedViewportHeight = window.innerHeight;
            const centerThreshold = cachedViewportHeight * 0.5;
            const bottomThreshold = cachedViewportHeight * 0.4;

            let newActiveParagraph = currentActiveParagraph;

            paragraphRefs.current.forEach((ref, index) => {
                if (!ref) return;
                
                const rect = ref.getBoundingClientRect();
                const isVisible = rect.top < centerThreshold && rect.bottom > bottomThreshold;
                
                if (isVisible) {
                    newActiveParagraph = index;
                }
            });

            // Only update state if the active paragraph actually changed
            if (newActiveParagraph !== currentActiveParagraph) {
                currentActiveParagraph = newActiveParagraph;
                setActiveParagraph(newActiveParagraph);
            }
        };

        // Handle window resize to update cached viewport height
        const handleResize = () => {
            cachedViewportHeight = window.innerHeight;
        };

        // Use passive scroll listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        handleScroll(); // Initial call
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <AboutContainer>
            <StorySection>
                <OverlappingImageContainer>
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
                <TextContainer>
                    <StoryTitle>The Early Years ~<StoryDate>03' to 21'</StoryDate></StoryTitle>
                    <StoryText>
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[0] = el}
                            $isActive={activeParagraph === 0}
                        >
                            🏠 So... back to day one, I was born and raised in Windermere, Florida. Outside of school, I spent basically all of my time doing one of the following: playing sports or video games, drawing, or just hanging out with my friends doing literally anything that sounded fun.
                        </StoryParagraph>
                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[1] = el}
                            $isActive={activeParagraph === 1}
                        >
                            📚 School wasn't really my favorite, mostly because of the early mornings and boring homework. I kept my A's to stay out of trouble. Math and science were my strong suits. English definitely was NOT, and honestly I still understand where to use em-dashes.
                        </StoryParagraph>

                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[2] = el}
                            $isActive={activeParagraph === 2}
                        >
                            🎨 I was always drawn to art, probably from my parents. I’d doodle in class and loved the design side of projects because it let me be creative. That same creative streak pulled me into music, too.
                        </StoryParagraph>
                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[3] = el}
                            $isActive={activeParagraph === 3}
                        >
                            🎓 By the time I hit high school, my schedule was packed with sports, classes, and a couple of clubs. I didn't really have a big plan for college at first. I just knew I would go, and I picked a school a few days before applying based on my scholarships.
                        </StoryParagraph>
                    </StoryText>
                </TextContainer>
            </StorySection>

            <StorySection reverse>
                <OverlappingImageContainer>

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
                <TextContainer $isReversed={true}>
                    <StoryTitle>My College Years ~<StoryDate>21' to 25'</StoryDate></StoryTitle>
                    <StoryText>
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[4] = el}
                            $isActive={activeParagraph === 4}
                            $isReversed={true}
                        >
                            🏫 I wasn't really set on any university, but UCF felt like the right fit. I came into UCF as a Mechanical Engineer just because I was good at STEM stuff and didn't stop until after I got through Statics and realized that I wasn't really in the mood for any more free-body diagrams.
                        </StoryParagraph>
                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[5] = el}
                            $isActive={activeParagraph === 5}
                            $isReversed={true}
                        >
                            🛠️ Freshman year flew by, but one Python class grabbed my attention. Then in my sophomore year I switched over to Computer Engineering so I could keep some hands-on work while learning to code.
                        </StoryParagraph>

                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[6] = el}
                            $isActive={activeParagraph === 6}
                            $isReversed={true}
                        >
                            🔒 College felt a lot like high school in terms of the routine. I was in class, studying, working, or at the gym most days. I joined a few clubs for the networking. It was a constant grind, but honestly I was addicted to it.
                        </StoryParagraph>
                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[7] = el}
                            $isActive={activeParagraph === 7}
                            $isReversed={true}
                        >
                            🚀 These years were where I grew the most. But with my packed schedule, I realized I had lost track of what I was working towards. I was getting hooked on the dopamine of "I got stuff done today". I realized I needed to take a step back before I jumped into a job that didn't align with me.
                        </StoryParagraph>
                    </StoryText>
                </TextContainer>

            </StorySection>

            <StorySection>
                <OverlappingImageContainer>
                    <ImageCard 
                        $position="top-left" 
                        $image={campingTrip} 
                        $alt="Camping Trip" />


                    <ImageCard 
                        $position="bottom-right" 
                        $image={lilG}
                        $alt="Lil G"
                    >
                        <BubbleContainer $position="bottom-right">
                            <SpeechBubble $parentPosition="bottom-right">
                                a
                            </SpeechBubble>
                            <SpeechBubble $parentPosition="bottom-right">
                                a
                            </SpeechBubble>
                        </BubbleContainer>
                    </ImageCard>
            
                    <ImageCard
                        $position="diagonal-down-left"
                        $image={mySetUp}
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
                <TextContainer>
                    <StoryTitle>Post-Grad Life ~<StoryDate>25' to Today</StoryDate></StoryTitle>
                    <StoryText>
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[8] = el}
                            $isActive={activeParagraph === 8}
                        >
                            Honestly, thus far post-grad has been weird. The momentum shift from full-time classes, internships, and part-time work to setting my own pace took adjusting. Having no built-in to-do list felt odd but also kind of freeing.
                        </StoryParagraph>
                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[9] = el}
                            $isActive={activeParagraph === 9}
                        >
                            I took the Summer of 2025 to get clear on what I want for myself. I slowed down, cleaned up the mental clutter, and kept skills sharp by working on past projects, polishing my portfolio, and grinding that god awful LeetCode all while still working my serving job.
                        </StoryParagraph>

                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[10] = el}
                            $isActive={activeParagraph === 10}
                        >
                            Now getting back into it, I’m in the job search. I don’t have it all mapped out (barely any of it, honestly), but I do know that I am drawn to software and I want to stay close to people, so maybe Tech Sales? Who knows.
                        </StoryParagraph>
                        
                        <StoryParagraph 
                            ref={el => paragraphRefs.current[11] = el}
                            $isActive={activeParagraph === 11}
                        >
                            I do however know that I have big goals that I know I will achieve. So for now I’m taking my time, working on myself, and looking for a team I can grow with. Until I find it, I’ll keep getting better.
                        </StoryParagraph>
                    </StoryText>
                </TextContainer>
            </StorySection>
            
        </AboutContainer>
    );
}

const AboutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(to bottom,
        rgb(13, 7, 27) 0%,
        rgb(13, 7, 27) 25%,
        rgb(45, 30, 80) 75%,
        rgb(100, 70, 150) 100%);
    width: 100vw;
    padding-top: 4rem;
    overflow-x: hidden;

    @media (max-width: 1600px) {
        gap: 3rem;
        padding-bottom: 4rem;
    }
`;

const StorySection = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 3rem 2rem;
    gap: 3rem;
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
`;

const OverlappingImageContainer = styled.div`
    flex: 3;
    position: relative;
    min-height: 500px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MapPinWrapper = styled.div`
    position: absolute;
    z-index: 1;
    
    /* Make the wrapper responsive */
    transform: scale(1);
    
    /* Default positioning for left side */
    ${props => props.$side === 'left' && `
        /* For large screens (≥1900px) */
        @media (min-width: 1900px) {
            transform: scale(1.1);
            top: 0px;
            left: 57.5px;
        }
        
        /* For smaller screens (<1600px) */
        @media (max-width: 1599px) {
            transform: scale(0.9);
            left: 20px;
            top: 0px;
        }
    `}
    
    /* Positioning for right side */
    ${props => props.$side === 'right' && `
        /* For large screens (≥1900px) */
        @media (min-width: 1900px) {
            transform: scale(1.1);
            top: 0px;
            right: 57.5px;
            left: auto;
        }
        
        /* For smaller screens (<1600px) */
        @media (max-width: 1599px) {
            transform: scale(0.9);
            right: 20px;
            left: auto;
            top: 0px;
        }
    `}
`;

const ImageCard = styled.div`
    position: absolute;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    z-index: ${props => {
        switch(props.$position) {
            case 'bottom-right': return 1;
            case 'diagonal-down-left': return 1;
            case 'bottom-left': return 2;
            default: return 1;
        }
    }};
    overflow: visible;
    cursor: pointer;
    
    /* Image or Emoji styling */
    background: ${props => props.$image 
        ? `url(${props.$image}) center/cover` 
        : 'rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${props => props.$image ? 'none' : 'blur(10px)'};
    font-size: ${props => props.$image ? '0' : '3.5rem'};
    
    /* Positioning based on $position prop */
    ${props => props.$position === 'top-left' && `
        top: 0;
        left: 0;
        transform: translate(-20px, -20px);
    `}
    
    ${props => props.$position === 'bottom-right' && `
        bottom: 0;
        right: 0;
        transform: translate(20px, 50px);
    `}
    
    ${props => props.$position === 'bottom-left' && `
        bottom: 0;
        left: 0;
        transform: translate(-20px, 20px);
    `}
    
    ${props => props.$position === 'diagonal-down-left' && `
        top: 75%;
        left: 0;
        transform: translate(35px, 30px);
    `}
    
    ${props => props.$position === 'diagonal-down-right' && `
        top: 75%;
        right: 0;
        transform: translate(-35px, 30px);
    `}
    
    ${props => props.$position === 'diagonal-down-left-from-right' && `
        top: 100%;
        left: 0;
        transform: translate(-20px, 40px);
    `}

    @media (max-width: 2000px) {
        width: 24rem;
        height: 24rem;
    }

    @media (max-width: 1600px) {
        width: 20rem;
        height: 20rem;
    }
`;

const BubbleContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 10;
    transform: translateY(10px);
    transition: all 0.3s ease;
    pointer-events: none;
    
    /* Container scales everything inside it */
    transform: scale(0.8);
    
    /* Responsive scaling for the entire container */
    @media (min-width: 1900px) {
        transform: scale(1);
    }
    
    @media (max-width: 1599px) {
        transform: scale(0.85);
    }
    
    /* Positioning based on $position prop */
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
        
        @media (min-width: 1900px) {
            bottom: -10px;
            right: -130px;
        }
        
        @media (max-width: 1599px) {
            bottom: -20px;
            right: -150px;
        }
    `}
`;

const SpeechBubble = styled.div`
    background: #007AFF;
    color: white;
    width: ${props => props.$width ? props.$width : '75%'};
    padding: 8px 16px 6px 16px;
    border-radius: 18px;
    font-size: 1.15rem;
    font-weight: 500;
    line-height: 1.2;
    text-align: justify;
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 20px rgba(0, 122, 255, 0.3);
    position: relative;
    
    /* Right-align bubbles when parent is top-right */
    ${props => props.$parentPosition === 'top-right' && `
        margin-left: auto;
    `}
    
    /* Speech bubble tail using SVG like iPhone - only on last bubble */
    &:last-child::after {
        position: absolute;
        content: "";
        bottom: -1px;
        width: 15.515px;
        height: 17.5px;
        z-index: 1;
        background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15.515px' height='17.5px' viewBox='32.484 17.5 15.515 17.5' enable-background='new 32.484 17.5 15.515 17.5'><path fill='%23007AFF' d='M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'/></svg>") no-repeat;
        background-size: 15.515px 17.5px;
        
        /* Tail positioning based on parent BubbleContainer position */
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

const TextContainer = styled.div`
    height: 100%;
    flex: 4;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0rem 2rem 2rem 2rem;
    color: white;
    
    
    ${props => props.$isReversed && `
        padding: 0rem 0rem 2rem 2rem;
    `}
`;

const StoryTitle = styled.div`
    margin-top: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, 
        rgba(255, 255, 255, 0.9) 0%,
        rgba(200, 180, 255, 0.8) 50%,
        rgba(150, 200, 255, 0.9) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 2000px) {
        font-size: 5rem; 
    }

    @media (max-width: 1600px) {
        font-size: 3rem;
    }
`;

const StoryDate = styled.span`
    font-weight: 400;
    margin-left: 0.5rem;
    display: inline-block;
    vertical-align: middle;
    color: rgba(255, 255, 255, 1);

    @media (max-width: 2000px) {
        font-size: 3.5rem; 
    }

    @media (max-width: 1600px) {
        font-size: 2.25rem;
    }
`;

const StoryText = styled.div`
    padding: 0 3rem 0 0;
    text-align: left;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    max-width: 100%;

    @media (max-width: 2000px) {
        font-size: 1.5rem; 
    }

    @media (max-width: 1600px) {
        font-size: 1.2rem;
    }
`;

const StoryParagraph = styled.p`
    margin-bottom: 2rem;
    text-indent: 0rem;
    position: relative;
    padding-left: ${props => props.$isReversed ? '0' : '3rem'};
    padding-right: ${props => props.$isReversed ? '3rem' : '0'};
    font-weight: 400;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    text-align: justify;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: ${props => props.$isActive ? 1 : 0.7};
    transform: ${props => props.$isActive ? 'translateX(0)' : 'translateX(-5px)'};
    
    /* Active paragraph gets a glowing left border */
    ${props => props.$isActive && `
        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: linear-gradient(to bottom, 
                rgba(200, 180, 255, 0.8) 0%,
                rgba(150, 200, 255, 0.8) 50%,
                rgba(100, 150, 255, 0.8) 100%);
            border-radius: 2px;
            box-shadow: 0 0 10px rgba(200, 180, 255, 0.5);
            animation: border-glow 0.3s ease-in-out;
        }
    `}
    
    /* For reversed sections, move the border to the right side */
    ${props => props.$isReversed && props.$isActive && `
        &::before {
            left: auto;
            right: 0;
        }
    `}
    
    @keyframes border-glow {
        from { 
            opacity: 0;
            transform: scaleY(0);
        }
        to { 
            opacity: 1;
            transform: scaleY(1);
        }
    }
    
`;

export default About;
