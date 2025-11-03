// src / components / Experience / Experience.jsx

// Imports.
import React from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import { useEffect, useState } from 'react';
import { loadStarsPreset } from 'tsparticles-preset-stars';

// Local Imports.
import experience from '../../data/extra/experience'
import MemoExperienceCard from './TimelineRow';

const Experience = () => {

    // State 4 Expanded Experience Cards.
    const [expandedCard, setExpandedCard] = useState(null);

    // Initialize Particles Effect. The Stars You See On The Site.
    const particlesInit = async (main) => {
        await loadStarsPreset(main);
    }

    return (
        <ExperienceContainer>
            <ParticlesContainer>
                <Particles
                    id="expParticles"
                    init={particlesInit}
                    height="40vh"
                    width="100vw"
                    options={{
                        preset: 'stars',
                        fullScreen: {
                            enable: false,
                            zIndex: -1
                        },
                        background: {
                            color: 'transparent'
                        },
                        particles: {
                            number: {
                                value: 50,
                                density: {
                                    enable: true,
                                    area: 1000
                                }
                            },
                            color: {
                                value: ['#ffffff']
                            },
                            move: {
                                enable: true,
                                speed: 0.4,
                            },
                            size: {
                                value: {min: 1.0, max: 3.0}
                            }
                        }
                    }}
                />
            </ParticlesContainer>

            <ExperienceTitle>
                My Experience
            </ExperienceTitle>

            <TimelineGrid id="timeline-container">
                {experience.map((item, i) => (
                    <MemoExperienceCard
                        key={i}
                        item={item}
                        index={i}
                        isExpanded={expandedCard === i}
                        onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
                    />
                ))}
            </TimelineGrid>


        </ExperienceContainer>
    )

}

// ------------ Main Container ------------

// Styles 4 Experience Container.
const ExperienceContainer = styled.div`
    position: relative;                     /* Container Stays in Normal Flow. */
    overflow: hidden;                       /* Clips Any Overflow Content. */
    min-height: 100vh;                      /* Ensures Min Height is 100% Of Viewport Height. */    
    display: flex;                          /* FlexBox Layout. */
    flex-direction: column;                 /* Set Up Children Vertically. */
    background: linear-gradient(to bottom,  /* Linear Gradient For Background Color. */
        rgb(67, 30, 114) 0%, 
        rgb(67, 30, 114) 25%,
        rgb(56, 31, 116) 37.5%,
        rgb(44, 36, 134) 50%,
        rgb(35, 25, 141) 62.5%,
        rgb(30, 21, 126) 75%,
        rgb(6, 12, 58) 100%);
    height: auto;                          /* Height is 100% Of Viewport. */
    width: 100%;                           /* Width is 100% of Viewport. */
`
// Styles 4 Particles Container 4 Experience Section.
const ParticlesContainer = styled.div`
    position: absolute;                     /* Sets Absolute Position. */
    width: 100%;                            /* Width Is 100% Of Container. */
    height: 100%;                           /* Heigh Is 100% Of Container. */
    top: 0;                                 /* No Margin From Top. */
    left: 0;                                /* No Margin From Left. */
    z-index: 5;                             /* Sets Above Base. (Z = 5) */
`
// Styles 4 Experience Title. 
const ExperienceTitle = styled.h1`
    display: flex;                          /* FlexBox Container. */
    justify-content: center;                /* Sets Text In Middle. */
    font-size: 4em;                         /* Title Font Size. */
`

// ------------ Time Line ------------

// Styles 4 Timeline Grid.
const TimelineGrid = styled.div`
    width: calc(100% - 20vw);
    align-self: flex-start;                 /* Sets Item to Start of Container. */
    margin-left: 10vw;                      /* Left Margin 10% View Port. */
    list-style: none;                       /* No List Style. */
    padding: 0;                             /* No Padding. */
`
// Export Experience Section.
export default Experience;