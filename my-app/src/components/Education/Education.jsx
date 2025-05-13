import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Local Imports.
import education from '../../data/education';

const Education = () => {

    const [expandedCard, setExpandedCard] = useState([]);

    return (
        <EducationContainer>
            <EducationTitle>My Education History</EducationTitle>
            {education.map((edu, i) => (
                <University key={i}>
                    <UniversityCard onClick={() => setExpandedCard(expandedCard === i ? null : i)}>
                        <UniversityTitle>{edu.heading}</UniversityTitle>
                        <UniversityDegree>{edu.degree}</UniversityDegree>
                        <UniversityDuration>{edu.duration.start} - {edu.duration.end}</UniversityDuration>
                        <AchievementsTitle>My Achievements @ UCF</AchievementsTitle>
                        {edu.highlights.map((highlight, hIndex) => (
                            <div key={hIndex}>
                                <AchievementsList>
                                    {highlight.items.map((done, aIndex) => (
                                        <Achievement key={aIndex}>{done}</Achievement>
                                    ))}
                                </AchievementsList>
                            </div>
                        ))}
                        <ExpandIcon>
                            {expandedCard === i ? <FaChevronUp /> : <FaChevronDown />}
                        </ExpandIcon>
                        { expandedCard === i && (
                            <ExpandedCard>
                                <CourseListTitle>Course List</CourseListTitle>
                                <CourseList>
                                   {edu.coursework.completed.map((course, courseIdx) => (
                                        <Course key={courseIdx}>{course.code}</Course>
                                    ))} 
                                </CourseList>
                                
                            </ExpandedCard>
                        )}
                    </UniversityCard>
                </University>
            ))}
                
        </EducationContainer>
        
    )
}

const EducationContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100vw;
    height: auto;

    background: linear-gradient(to bottom,
        rgb(6, 12, 58) 0%,
        rgb(6, 12, 58) 12.5%,
        rgb(6, 12, 58) 25%,
        rgb(6, 12, 58) 37.5%,
        rgb(6, 12, 58) 50%,
        rgb(6, 12, 58) 62.5%,
        rgb(6, 12, 58) 75%,
        rgb(6, 12, 58) 87.5%,
        rgb(6, 12, 58) 100%);
`
const EducationTitle = styled.h1`
    display: flex;
    font-size: 3em;
    text-align: center;
    justify-content: center;
`

const University = styled.div`
`

const UniversityCard = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    border: 1px solid white;
    margin: 0 10vw;
    padding: 1em;
`

const UniversityTitle = styled.h1`
    text-align: center;
    margin: 0.25em 0;
`

const UniversityDegree = styled.h2`
    text-align: center;
    margin: 0.25em 0;
`

const UniversityDuration = styled.h3`
    text-align: center;
    maring: 0;
`

const AchievementsTitle = styled.h1`
    text-align: center;
`

const AchievementsList = styled.ul`
    margin-top: 0;
    font-size: 1em;
    text-align: center;
    list-style: none;
`

const Achievement = styled.li`
`

// Styles 4 Arrow Icon 4 Expansion.
const ExpandIcon = styled.span`
    display: flex;
    justify-content: center;
    
    svg: {
        width: 1em;
        height: 1em;
    }
`

const ExpandedCard = styled.div`
    max-height: 1000px;
    overflow: hidden;
    animation: expandCard 0.5s ease-out forwards;

    @keyframes expandCard {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

`

const CourseListTitle = styled.h1`
    font-size: 2em;
    display: flex;
    justify-content: center;
`

const CourseList = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 80vw;
`

const Course = styled.p`
    margin: 0.25em 0.75em;
    border: 1px solid white;
    border-radius: 12px;
    padding: 0.5em;
`
export default Education;