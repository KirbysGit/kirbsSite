// Imports.
import Typed from 'typed.js';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMoon, FaPaintBrush, FaSun } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import React, { useEffect, useRef } from 'react';
import { loadStarsPreset } from 'tsparticles-preset-stars';

// Style 4 Hero.
const Hero = () => {
    const particlesInit = async (main) => {
        await loadStarsPreset(main);
    }

    // Typed Use Ref.
    const rolesEl = useRef(null);

    // Typed Use Effect.
    /*
    useEffect(() => {
        const rolesTyped = new Typed(rolesEl.current, {
            strings: ['Software Developer', 'UI/UX Enthusiast', 'Lifelong Learner', 'Creative Technologist', 'Problem Solver', 'Builder of Thoughtful Systems'],
            typeSpeed: 70,
            backSpeed: 40,
            loop: true,
            showCursor: true,
            cursorChar: "_",
            startDelay: 1000,
            smartBackspace: true,
        })

        return () => {
            rolesTyped.destroy();
        };
    }, []);
    */

    const container = {
        hidden: { opacity: 0},
        show: {
            opacity: 1,
            transition: {staggerChildren: 1.0 }
        }
    };

    const item = {
        hidden : { opacity: 0, y: 20},
        show : { opacity: 1, y: 0}
    };

    return (
        <HeroContainer>

            <ParticlesContainer>
                <Particles
                    id="heroParticles"
                    init={particlesInit}
                    height="100vh"
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
            
            <Link to="/ui-cheatsheet">
                <BrushBtn
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    whileTap={{ scale:0.9 }}
                >
                    <FaPaintBrush />
                </BrushBtn>
            </Link>
            <MoonButton
                whileHover={{ rotate: 20, scale: 1.2}}
                whileTap={{ rotate: -20}}
            >
                <FaMoon />
            </MoonButton>

            <HeroText as={motion.div} variants={container} initial="hidden" animate="show">
                <HeroTitleMotion variants={item}>
                    Hey, I'm Colin!
                </HeroTitleMotion>
                <HeroTitleMotion variants={item}> Welcome to My Portfolio!
                </HeroTitleMotion>
                { 
                /*
                    <HeroSubtitleTyped variants={item}>
                    I'm a <TypedRoles ref={rolesEl}></TypedRoles>
                    </HeroSubtitleTyped>
                */ 
                }
                
                <HeroSubtitle>
                    This portfolio highlights my growth as a developer through projects, experiences, and skills — while also offering a glimpse into my life beyond work.
                </HeroSubtitle>
            </HeroText>
            
        </HeroContainer>
    )
}
  
// Style 4 Particles Container.
const ParticlesContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 5;
`

// Style 4 Container.
const HeroContainer = styled.div`
    position: relative;
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, 
        rgb(13, 1, 31) 0%, 
        rgb(35, 12, 68) 25%, 
        rgb(55, 26, 94) 50%, 
        rgb(60, 25, 105) 75%, 
        rgb(67, 30, 114) 100%);
    height: 100vh;
    width: 100vw;
`

// Style 4 Text.
const HeroText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    z-index: 2;
`
// Style 4 Title Motion.
const HeroTitleMotion = styled(motion.h1)`
    font-size: 5rem;
    text-align: center;
    margin: 0;
`
// Style 4 Subtitle.
const HeroSubtitleTyped = styled(motion.div)`
    text-align: center;
    font-size: 2rem;
    margin: 0;
`

// Style 4 The Typed Roles Subtitle.
const TypedRoles = styled.span`

    font-size: 2rem;
    margin: 0;
`
const HeroSubtitle = styled(motion.div)`
    text-align: center;
    font-size: 2rem;
    margin: 0;
    padding-right: 10rem;
    padding-left: 10rem;
`

// Style 4 The Moon Icon.
const MoonButton = styled(motion.button)`
    position: absolute;
    top: 10rem;
    right: 10rem;
    padding: 0.5rem;
    border: none;
    background: none;
    color: #fff;
    cursor: pointer;
    z-index: 999;
    display: flex;
    align-items: center;
    font-size: 5rem;

`

const BrushBtn = styled(motion.button)`
    position: absolute;
    top: 10rem;
    left: 10rem;
    padding: .5rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 3rem;
    cursor: pointer;
    z-index: 999;
`
export default Hero;