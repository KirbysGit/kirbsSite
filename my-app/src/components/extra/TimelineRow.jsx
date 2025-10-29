// Imports.
import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { animate, motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaFontAwesome, FaFontAwesomeAlt } from 'react-icons/fa';

// Local Imports.
import MapPin from './MapPin';
import SkillSet from './SkillSet';
import CalendarHeatMap from './CalendarHeatMap';
import ResponsibilityGrid from './ResponsibilityGrid';

// Animation Variants 4 Reference.
const expandVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0},
    exit: { opacity: 0, y:-10 },
};

// Function For Getting Duration Of Company In Years & Days.
function getTenureDuration(startStr, endStr = "Present") {
    const startDate = new Date(startStr);                                                   // Get Start Date Of Company Tenure.
    const endDate = endStr.toLowerCase() === "present" ? new Date() : new Date(endStr);     // Get End Date of Company Tenure.

    const diffInMs = endDate - startDate;                                                   // Take Difference Of Dates. Result in Milliseconds.
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));                        // Calculate The Ms Value Into Days.
    const diffInYears = diffInDays / 365.25;                                                // Calculate the Days Value Into Years.

    const years = Math.floor(diffInYears);                                                  // Takes Rounded Down Value of Years.
    const days = Math.floor(diffInDays % 365.25);                                           // Calculates The Days Remaining After Years.

    return { years, days };                                                                 // Return Values For # Of Years & Days At Company.
};

const formatDate = (dateStr) => {
    if (dateStr.toLowerCase() === "present") return "Present";
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

// ExperienceCard Component Declaration.
// Takes In :
//      - 'item' : Company.
//      - 'isExpanded' : If Card Is Toggled.
//      - 'onToggle' : For Animation Of Expanding Card Toggle.
//      - 'index' : Index Per Card.

const ExperienceCardComponent = ({ item, isExpanded, onToggle, index }) => {
    const rowRef = useRef(null);                                                        // Creates Current Reference Point To Entire Row Per Experience Element.
    const bulletRef = useRef(null);                                                     // Creates Current Reference Point To Bullet Element.
    const [fillHeight, setFillHeight] = useState(0);                                    // Use State For Fill Height Of Progressive Scroll Bar.

    const [countedYears, setCountedYears] = useState(0);                              // Use State For Counted Years in Date Card.
    const [countedDays, setCountedDays] = useState(0);                                // Use State For Counted Days in Date Card.

    const [isCompleted, setIsCompleted] = useState(false);

    // Used For The Counting Days Feature.
    useEffect(() => {
        if (!isExpanded) {                                                                  // If Experience Card Is Not Expanded.
            setCountedYears(0);                                                             // Reset Year Counter.
            setCountedDays(0);                                                              // Reset Day Counter.
            setIsCompleted(false);                                                          // Set Is Counter Completed To False.
            return;                                                                         // Escape Counter.
        }

        const { years, days } = getTenureDuration(item.duration.start, item.duration.end);  // Gets Tenure Duration Per Company.
        
        let totalDays = years * 365 + days;                                                 // Gets Total Days To Count.

        animate(0, totalDays, {                                                             // Animate Count, Starting At 0 To Total Days.
            duration: 6,                                                                    // 6 Seconds To Count Up.
            ease: "easeOut",                                                                // Count Starts Fast & Slows Down.
            onUpdate: (latest) => {                                                         // Callback That Occurs On Every Animation Frame.
                const total = Math.floor(latest);                                           // Round Current Val Down To Whole #.
                const newYears = Math.floor(total/365);                                     // Convert Total Days Into Full Years.
                const newDays = total % 365;                                                // Get Remaining Days After Years.

                setCountedYears(newYears);                                                  // Set Counted Years Every Update.
                setCountedDays(newDays);                                                    // Set Counted Days Every Update.

                if (totalDays === total) {                                                  // If Counted All Days.
                    setIsCompleted(true);                                                   // Set 'isCompleted' Value To True.
                }
            },
        });

    }, [isExpanded, item.duration.start, item.duration.end]);

    // Used For Calculating Fill Of Bullet Scroll Bar.
    useEffect(() => {
        const bullet = bulletRef.current;                                               // Creates Current Reference Point To Bullet Element.
        const row = rowRef.current;                                                     // Creates Current Reference Point To Entire Row Per Experience Element.

        if(!bullet || !row) return;                                                     // If No Bullet Or Row Reference, Exit Early.

        const handleScroll = () => { 
            const rect = rowRef.current.getBoundingClientRect();                        // Calculates Bounding Box Of Row Element.
            const screenHeight = window.innerHeight;                                    // Gets Full Height Of Viewport.
            const rowCenter = rect.top + rect.height / 2;                               // Gets Center Of Row Element.
            const screenCenter = window.innerHeight / 2;                                // Gets Center of Viewport.

            let newHeight;                                                              // New Height Variable.
            if (rowCenter < screenCenter) {                                             // If 'rowCenter' Is Above 'screenCenter',
                newHeight = 100;                                                        // Fill Bar.
            } else {                                                                    // Else,
                const distanceToCenter = Math.abs(rowCenter - screenCenter);            // Find 'rowCenter' Distance Below 'screenCenter'.
                const maxDistance = screenHeight / 2;                                   // Calculate Max Distance Of 'rowCenter' For Reference.
                newHeight = (1 - Math.min(distanceToCenter / maxDistance, 1)) * 100;    // Set 'newHeight' To Percentage Of Bar Depending On Distance From Row Center.
            }

            setFillHeight(prev => {                                                     // Set Fill Height For Row.
                if (Math.abs(prev - newHeight) > 0.5) {                                 // If Difference Of New Height Is Above 0.5,
                    return newHeight;                                                   // Update Bar Fill.
                }                                                                       // Do This To Prevent Constant Re-renders.
                return prev;                                                            // Return Bar Fill.
            })
            
        }

        handleScroll();                                                                 // Call Handle Scroll Func.
        window.addEventListener("scroll", handleScroll);                                // Update on Scroll.
        return () => window.removeEventListener("scroll", handleScroll);                // Remove On Component Unmount.
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
                                        {item.company === "BitGo" && (
                                            <RemoteFlag>
                                                For this role I was Remote & Based In Orlando, Florida.
                                            </RemoteFlag>
                                        )}
                                    </LocationCard>

                                    <DateCard
                                        $bg={item.theme.card}
                                    >
                                        <DateHeader>
                                            My Time At The Company.
                                        </DateHeader>
                                        <MotionDateDescription
                                            animate={isCompleted ? { scale: 1.25, color: item.theme.highlight } : {}}
                                            transition={{ type:"spring", stiffness: 500, damping: 10 }}
                                        >
                                            {countedYears > 0 ? `${countedYears} year${countedYears > 1 ? 's' : ''}, ` : ''}
                                            {countedDays} day{countedDays !== 1 ? 's' : ''}
                                        </MotionDateDescription>
                                        <Start2End>
                                            {formatDate(item.duration.start)} - {formatDate(item.duration.end)}
                                        </Start2End>
                                        <CalendarHeatMap item={item} />
                                    </DateCard>
                                </LocationAndDate>
                                <ResponsibilityGrid item={item} />
                                <SkillSet item={item} />
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

// ------------ Expanded Experience Card ------------

const ExpandedCard = styled.div`
    cursor: default;
    padding: 1em;
`

// ------------ Location & Date Grid ------------

const LocationAndDate = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
`
// ------------ Location ------------

const LocationCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-right: 0.5em;
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
const RemoteFlag = styled.div`
    display: flex;
    margin-top: 0.5em;
    justify-content: center;
`
// ------------ Date ------------

const DateCard = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-left: 0.5em;
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
    margin-bottom: 0.1em;
    font-size: 1.5em;
`
const Start2End = styled.h2`
    display: flex;
    letter-spacing: 0.5px;
    justify-content: center;
    margin: 0;
    margin-bottom: 0.25em;
    font-size: 1.1em;
`



// ------------ Motion Sets.  ------------

const MotionExperienceCard = motion(ExperienceCard);
const MotionLogo = motion(Logo);
const MotionExpandIcon = motion(ExpandIcon);
const MotionExpandedCard = motion(ExpandedCard);
const MotionDateDescription = motion(DateDescription);


const MemoExperienceCard = React.memo(ExperienceCardComponent);

export default MemoExperienceCard;