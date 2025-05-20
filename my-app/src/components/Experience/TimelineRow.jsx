import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaFontAwesome, FaFontAwesomeAlt } from 'react-icons/fa';

// Local Imports;
import MapPin from './MapPin';
import CalendarHeatMap from './CalendarHeatMap';

// Animation Variants 4 Reference.
const expandVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0},
    exit: { opacity: 0, y:-10 },
};

function getTenureDuration(startStr, endStr = "Present") {
    const startDate = new Date(startStr);
    const endDate = endStr.toLowerCase() === "present" ? new Date() : new Date(endStr);

    const diffInMs = endDate - startDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInYears = diffInDays / 365.25;

    const years = Math.floor(diffInYears);
    const days = Math.floor(diffInDays % 365.25);

    return { years, days };
};


const ExperienceCardComponent = ({ item, isExpanded, onToggle, index }) => {

    const rowRef = useRef(null);
    const bulletRef = useRef(null);
    const [fillHeight, setFillHeight] = useState(0);

    const {years, days} = getTenureDuration(item.duration.start, item.duration.end);

    useEffect(() => {

        const bullet = bulletRef.current;
        const row = rowRef.current;

        if(!bullet || !row) return;

        const handleScroll = () => { 
            const rect = rowRef.current.getBoundingClientRect();
            const screenHeight = window.innerHeight;
            const rowCenter = rect.top + rect.height / 2;
            const screenCenter = window.innerHeight / 2;

            let newHeight;
            if (rowCenter < screenCenter) {
                newHeight = 100;
            } else {
                const distanceToCenter = Math.abs(rowCenter - screenCenter);
                const maxDistance = screenHeight / 2;
                newHeight = (1 - Math.min(distanceToCenter / maxDistance, 1)) * 100;
            }

            setFillHeight(prev => {
                if (Math.abs(prev - newHeight) > 0.5) {
                    return newHeight;
                }

                return prev;
            })
            
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <TimelineRow ref={rowRef} className="timeline-row" data-index={index}>
            <Bullet ref={bulletRef} $height={fillHeight} $color={item.theme.primary}/>

            <MotionExperienceCard
                $bg={item.theme.background}
                $text={item.theme.text}
                $accent={item.theme.accent}
                $primary={item.theme.primary}
                $isExpanded={isExpanded}

                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0}}
                transition={{ duration: 0.5, ease: "easeOut"}}
                viewport={{ once: true, amount: 0.3 }}
            >
                <MotionLogo 
                    src={item.logoUrl} 
                    alt={`${item.company} logo`} 
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ type: 'spring', stiffness: 300 }}    
                />

                <Job>
                    <JobTitle>{item.heading} @ {item.company}</JobTitle>
                    <JobSummary>{item.summary}</JobSummary>
                    <MotionExpandIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(index);
                        }}
                        $isExpanded={isExpanded}
                        animate={{rotate: isExpanded ? 180 : 0}}
                        transition={{ type: "spring", stiffness: 50 }}
                    >
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </MotionExpandIcon>
                    <AnimatePresence mode="wait">
                        {isExpanded && (
                            <MotionExpandedCard
                                key={index}
                                variants={expandVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.4 }}
                                layout
                            >
                                <LocationAndDate>
                                    <LocationCard
                                        $bg={item.theme.card}
                                    >
                                        <LocationHeader>
                                            {item.company !== "BitGo" ? (
                                                <OtherHeader>
                                                    Where I Worked.
                                                </OtherHeader>
                                            ) : (
                                               <BitgoHeader>
                                                    Where {item.company} Is Based.
                                               </BitgoHeader> 
                                            )}

                                        </LocationHeader>
                                        <LocationText> {item.address} </LocationText>
                                        {item.locationCoords && (
                                            <MapPin
                                                item={item}
                                                coords={item.locationCoords}
                                                address={item.address}
                                                link={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`}
                                                logo={item.logoUrl}
                                            />
                                        )}
                                    </LocationCard>

                                    <DateCard
                                        $bg={item.theme.card}
                                    >
                                        <DateHeader>
                                            My Time At The Company.
                                        </DateHeader>
                                        <DateDescription>
                                            {years > 0 ? `${years} year${years > 1 ? 's' : ''}, ` : ''}
                                            {days} day{days !== 1 ? 's' : ''}
                                        </DateDescription>
                                        <CalendarHeatMap 
                                            item={item}
                                        />
                                    </DateCard>
                                </LocationAndDate>
                                <RespHeader>Responsibilities of My Role</RespHeader>
                                <RespCards>
                                    {item.responsibilities.map((resp, rIndex) => (
                                        <RespCard 
                                            key={rIndex}
                                            $bgColor={item.theme.accent}    
                                        >
                                            <RespTitle>{resp.title}</RespTitle>
                                            <RespDesc>{resp.description}</RespDesc>
                                            <RespImpact>{resp.impact}</RespImpact>
                                        </RespCard>
                                        ))}
                                </RespCards>
                                <SkillSet>
                                    <div>
                                        <TechHeader>
                                            Technical Skills
                                        </TechHeader>
                                        <TechSkills>
                                            {item.skills.technical.map((tech, tIndex) => (
                                                    <TechSkill 
                                                        $border={item.theme.primary}
                                                        key={tIndex}    
                                                    >{tech}</TechSkill>
                                            ))}
                                        </TechSkills>
                                    </div>
                                    <div>
                                        <SoftHeader>
                                            Soft Skills
                                        </SoftHeader>
                                        <SoftSkills>
                                            {item.skills.soft.map((soft, sIndex) =>
                                                <SoftSkill key={sIndex}>{soft}</SoftSkill>
                                            )}
                                        </SoftSkills>
                                    </div>
                                </SkillSet>
                            </MotionExpandedCard>
                        )}  
                    </AnimatePresence>
                </Job>  
            </MotionExperienceCard>
        </TimelineRow>
    );
};

// ------------ Timeline Container ------------

// Styles 4 Timeline Row.
const TimelineRow = styled.li`
    display: grid;                                      /* CSS Grid Style Display. */
    align-items: flex-start;                            /* Start Content From Beginning of Container. */
    grid-template-columns: clamp(24px, 4vw, 48px) 1fr;  /* Clamp Bullet Point to Adjust w/ Size */

`
// Styles 4 Bullet Column.
const Bullet = styled.div.attrs(props => ({
    style: {
        '--bullet-fill-height': `${props.$height}%`,
        '--bullet-color': props.$color
    }
}))`
    position: relative;                                             /* Bullet Container Ref Pt For Before & After. */
    height: 100%;                                                   /* Takes Up Entire Timeline Row. */

    /* Draw White Circle At Top Of Line. */

    &::before {
        content: '';                                                /* Required. */
        position: absolute;                                         /* Takes Out Of Normal Flow. */
        left: 50%;                                                  /* Move To Horizontal Center. */
        top: 0;                                                     /* At Top Of Container. */
        transform: translate(-50%, 0);                              /* Centered Exactly. */

        width: 12px;                                                /* Circle Width. */
        height: 12px;                                               /* Circle Height. */
        border-radius: 50%;                                         /* Perfect Circle Radius. */

        background: #ffffff;                                      /* Circle Color. */
        z-index: 2;                                                 /* Above Base. */
    }

    /* Draw Line From Circle. */
        
    &::after {
        content: '';                                                           
        position: absolute;                                                    
        left: 50%;                                                           
        top: 12px;                                                      
        transform: translateX(-50%);
        height: var(--bullet-fill-height);                             
        transition: height 1.0s ease-in-out;
        width: 4px;                                                          
        background: var(--bullet-color);                                           
        opacity: 1;                                                  
        z-index: 1;                                                         
    }

`

// ------------ Experience Card ------------

const ExperienceCard = styled.div`
    /* LAYOUT */
    display: grid;                                          
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    column-gap: 1rem;
    padding: 1rem;                                          
    margin: 1rem;
    z-index: 6;

    /* STYLING */
    background-color: ${(props) => props.$bg};                      
    border-radius: 12px;                                    
    border: 3px solid ${(props) => props.$accent};                                
    transition: transform 0.2s ease, box-shadow 0.2s ease;  
    color: ${(props) => props.$text}
    
    /* HOVER ANIMATION */
    &:hover {                                               
        cursor: pointer;
        box-shadow: 0 6px 20px ${(props) => props.$primary}55;
        transform: ${(props) => (props.$isExpanded ? 'none' : 'scale(1.02)')};                             
    }
`
const MotionExperienceCard = motion(ExperienceCard);

const Job = styled.div`
    display: flex;
    flex-direction: column;
`
const Logo = styled.img`
    align-self: center;
    justify-self: center;
    display: flex;
    width: 48px;
    height: 48px;
    object-fit: contain;
    flex-shrink: 0;
`
const MotionLogo = motion(Logo);

const JobTitle = styled.h1`
    display: flex;              /* Flex Layout. */
    margin: 0;                  /* No Interior Margin. */
    font-size: 2em;             /* Font Size. */
`
const JobSummary = styled.p`
    font-size: 1em;
`
const ExpandIcon = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg: {
        width: 1.2em;
        height: 1.2em;
        transform: rotate(${(props) => (props.$isExpanded ? '180deg' : '0deg')});
        transition: transform 0.3s ease;
    }

    &:hover {
        color:rgb(199, 183, 183);
    }
`
const MotionExpandIcon = motion(ExpandIcon);

// ------------ Expanded Experience Card ------------

const ExpandedCard = styled.div`
    cursor: default;
    padding: 1em
`
const MotionExpandedCard = motion(ExpandedCard);

// ------------ Location & Date Grid ------------

const LocationAndDate = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`
// ------------ Location ------------

const LocationCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-right: 1rem;
    padding: 1rem;
    border-radius: 16px;
    border: 3px solid white;
    background: ${(props) => props.$bg};
    color: ${(props) => props.$text};
    transition: box-shadow 0.3s ease;
    max-width: 50%;

    &:hover {
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
    }
`
const LocationHeader = styled.div`
    margin: 0;
    font-size: 1.2rem;
`
const OtherHeader = styled.h2`
    display: flex;
    margin: 0;
`
const BitgoHeader = styled.h2`
    display: flex;
    margin: 0;
`
const LocationText = styled.p`
    margin: 0;
    font-size: 0.9em;
    opacity: 0.9;
    display: flex;
    justify-content: center;
`
// ------------ Date ------------

const DateCard = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-right: 1rem;
    padding: 1rem;
    border-radius: 16px;
    border: 3px solid white;
    background: ${(props) => props.$bg};
    color: ${(props) => props.$text};
    transition: box-shadow 0.3s ease;
    min-width: 50%;

    &:hover {
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.4);
    }
`
const DateHeader = styled.h2`
    display: flex;
    margin: 0;
    margin-bottom: 0.25em;
`

const DateDescription = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0;
    margin-bottom: 0.5em;
    font-size: 1.25em;
`
// ------------ Responsibilities ------------

const RespHeader = styled.h2`
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 1em;
`
const RespCards = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
`
const RespCard = styled.div`
    background-color: ${(props) => props.$bgColor};
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid white;
    padding: 0.5em;
    margin: 0.5em;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: scale(1.02);
    }
`
const RespTitle = styled.h1`
    text-align: center;
    font-size: 1.5em;
    margin: 0.25em 0em 0.25em 0em;
`
const RespDesc = styled.p`
    font-size: 0.75em;
    text-align: justify;
    margin: 0 0.25em 0 0.25em;
`
const RespImpact = styled.p`
    font-size: 0.5em;
`

// ------------ Skills  ------------

const SkillSet = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
`
// ------------ Technical Skills  ------------

const TechHeader = styled.h2`

`
const TechSkills = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
    margin: 0.5rem 0;
    list-style: none;
`
const TechSkill = styled.li`
    border-radius: 24px;
    border: 1px solid white;
    padding: 0.5em;
    white-space: nowrap;
    border: 2px solid ${(props) => props.$border };
    transition: transform 0.3 ease;

    &:hover {
        transform: scale(1.04);
    }
`
// ------------ Soft Skills  ------------

const SoftHeader = styled.h2`

`
const SoftSkills = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0;
    margin: 0.5rem 0;
    list-style: none;
`
const SoftSkill = styled.li`
    border-radius: 24px;
    border: 1px solid white;
    padding: 0.5em;
    white-space: nowrap;
    border: 2px solid ${(props) => props.$border };
    transition: transform 0.3 ease;

    &:hover {
        transform: scale(1.04);
    }
`
const MemoExperienceCard = React.memo(ExperienceCardComponent);

export default MemoExperienceCard;