import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Animation Variants 4 Reference.
const expandVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0},
    exit: { opacity: 0, y:-10 },
};


const ExperienceCardComponent = ({ item, isExpanded, onToggle, index }) => {

    const rowRef = useRef(null);
    const bulletRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => { 
            if(!rowRef.current || !bulletRef.current) return;

            const rect = rowRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const visibleHeight = Math.min(Math.max(windowHeight - rect.top, 0), rect.height);

            const progress = visibleHeight / rect.height;
            bulletRef.current.style.setProperty("--progress", progress);
        }

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <TimelineRow ref={rowRef} className="timeline-row" data-index={index}>
            <Bullet ref={bulletRef}/>

            <ExperienceCard
                $bg={item.theme.background}
                $text={item.theme.text}
                $accent={item.theme.accent}
                $isExpanded={isExpanded}
            >
                <Logo src={item.logoUrl} alt={`${item.company} logo`} />

                <Job>
                    <JobTitle>{item.heading} @ {item.company}</JobTitle>
                    <JobSummary>{item.summary}</JobSummary>
                    <ExpandIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(index);
                        }}
                        $isExpanded={isExpanded}
                    >
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </ExpandIcon>
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
                                <RespHeader>
                                Responsibilities of My Role :
                                </RespHeader>
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
                                    <TechHeader>
                                        Technical Skills
                                    </TechHeader>
                                    <TechSkills>
                                        {item.skills.technical.map((tech, tIndex) => (
                                                <TechSkill key={tIndex}>{tech}</TechSkill>
                                        ))}
                                    </TechSkills>
                                    <SoftHeader>
                                        Soft Skills
                                    </SoftHeader>
                                    <SoftSkills>
                                        {item.skills.soft.map((soft, sIndex) =>
                                            <SoftSkill key={sIndex}>{soft}</SoftSkill>
                                        )}
                                    </SoftSkills>
                                </SkillSet>
                            </MotionExpandedCard>
                        )}  
                    </AnimatePresence>
                </Job>  
            </ExperienceCard>
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
const Bullet = styled.div`
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
        content: '';                                                            /* Required. */
        position: absolute;                                                     /* Takes Out of Normal Flow. */
        left: 50%;                                                              /* Move to Horizontal Center. */
        top: 12px;                                                              /* One Circle Away From Top. */
        transform: translateX(-50%);                                            /* Centered Exactly on X-Axis. */
        width: 4px;                                                             /* Line Width. */
        height: calc(var(--progress, 0) * 100%);    /* Check 'isActive' To Determine Height Of Line. */
        background: #fff;                                                       /* Line Color. */
        opacity: 1;                                                             /* Sligthly Transparent. */
        transition: height 1.0s ease-out;       
        z-index: 1;                                                             /* Animate Height Smoothly W/ Growth. */
    }

`

// ------------ Experience Card ------------

// Styles 4 Experience Card Container.
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
    border: 3px solid white;                                
    transition: transform 0.2s ease, box-shadow 0.2s ease;  
    
    /* HOVER ANIMATION */
    &:hover {                                               
        cursor: pointer;                                    
        transform: ${(props) => (props.$isExpanded ? 'none' : 'scale(1.02)')};                             
    }
`
// Styles 4 Overall Job Entry.
const Job = styled.div`
    display: flex;
    flex-direction: column;
`
// Styles 4 Logo.
const Logo = styled.img`
    align-self: center;
    justify-self: center;
    display: flex;
    width: 48px;
    height: 48px;
    object-fit: contain;
    flex-shrink: 0;
`
// Styles 4 Job Title.
const JobTitle = styled.h1`
    display: flex;              /* Flex Layout. */
    margin: 0;                  /* No Interior Margin. */
    font-size: 2em;             /* Font Size. */
`
// Styles 4 Job Summary.
const JobSummary = styled.p`
    font-size: 1em;
`
// Styles 4 Arrow Icon 4 Expansion.
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

// ------------ Expanded Experience Card ------------

const ExpandedCard = styled.div`
    padding: 1em
`
const MotionExpandedCard = motion(ExpandedCard);

const JobLocation = styled.p`
    font-size: 0.5em;
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
`

const MemoExperienceCard = React.memo(ExperienceCardComponent);

export default MemoExperienceCard;