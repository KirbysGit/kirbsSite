import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useInView } from 'framer-motion';
import styled from 'styled-components';
import { loadFull } from 'tsparticles';
import Particles from 'react-tsparticles';
import { FaChevronDown, FaServer, FaAws, FaDatabase, FaCode, FaUsers, FaCircle } from 'react-icons/fa';

const TIMELINE_POSITIONS = {
  0: { top: '32%', bottom: '6.5%' },
  1: { top: '8.5%', bottom: '8.5%' },
  2: { top: '8.5%', bottom: '26%' }
};

const getTimelinePosition = (isExpanded, activeIndex) => {
  if (!isExpanded || activeIndex === -1) {
    return { top: '14%', bottom: '14%' };
  }
  return TIMELINE_POSITIONS[activeIndex] || { top: '14%', bottom: '14%' };
};

const Experience = ({ content }) => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const tlRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: tlRef,
    offset: ["start 0.3", "end 0.8"]
  });

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const getResponsibilityIcon = (title) => {
    if (title.toLowerCase().includes('backend') || title.toLowerCase().includes('database')) return <FaServer />;
    if (title.toLowerCase().includes('devops') || title.toLowerCase().includes('aws')) return <FaAws />;
    if (title.toLowerCase().includes('data') || title.toLowerCase().includes('sql')) return <FaDatabase />;
    if (title.toLowerCase().includes('development') || title.toLowerCase().includes('full-stack')) return <FaCode />;
    return <FaUsers />;
  };

  return (
    <SectionWrapper>
      <ParticlesOverlay>
        <Particles
          id="experience-particles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 40, density: { enable: true, value_area: 800 } },
              color: { value: "#cceeff" },
              shape: { type: "circle" },
              opacity: {
                value: 0.2,
                random: true,
                anim: { enable: true, speed: 0.1, opacity_min: 0.1, sync: false }
              },
              size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 0.2, size_min: 0.1, sync: false }
              },
              move: {
                enable: true,
                speed: 0.2,
                direction: "top",
                random: true,
                straight: false,
                out_mode: "out"
              }
            },
            interactivity: {
              events: {
                onhover: { enable: false },
                onclick: { enable: false }
              }
            },
            retina_detect: true
          }}
        />
      </ParticlesOverlay>
      <ExperienceContainer>
        <SectionTitle>My Experience</SectionTitle>
        <TimelineWrapper ref={tlRef}>
          <TimelineTrack
            initial={{ scaleY: 0 }}
            style={{ scaleY: scrollYProgress }}
            $isExpanded={selectedExperience !== null}
            $activeIndex={selectedExperience ? content.findIndex(exp => exp === selectedExperience) : -1}
          />
          <ExperienceGrid>
            {content.map((experience, index) => {
              const isCurrentRole = experience.duration.end === "Present";
              const hasOverlap = content.some((other, otherIndex) => 
                otherIndex !== index && 
                other.duration.end === experience.duration.end && 
                experience.duration.end === "Present"
              );

              const entryRef = useRef(null);
              const inView = useInView(entryRef, { margin: "-25% 0px -75% 0px" });
              const isActive = selectedExperience === experience;

              return (
                <React.Fragment key={index}>
                  <EntryDot
                    ref={entryRef}
                    $theme={experience.theme}
                    style={{ gridRow: index + 1 }}
                    animate={{
                      scale: inView ? 1.3 : 1,
                      boxShadow: inView
                        ? `0 0 8px 4px ${experience.theme.primary}`
                        : "0 0 0 0 rgba(0,0,0,0)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    $isActive={isActive}
                  />
                  <ExperienceEntry
                    ref={entryRef}
                    style={{ gridRow: index + 1 }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    onClick={() => setSelectedExperience(isActive ? null : experience)}
                  >
                    <ExperienceDate>
                      {experience.duration.start} - {experience.duration.end}
                      {hasOverlap && (
                        <ConcurrentBadge>
                          <FaCircle size={8} />
                          Concurrent Role
                        </ConcurrentBadge>
                      )}
                    </ExperienceDate>
                    
                    <ExperienceCard
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      $theme={experience.theme}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LogoPanel $theme={experience.theme}>
                        <CompanyLogo 
                          src={experience.logoUrl} 
                          alt={experience.company}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </LogoPanel>
                      <ContentPanel>
                        <RolePill $color={experience.theme.primary}>{experience.type}</RolePill>
                        <CardHeader>
                          <HeaderInfo $theme={experience.theme}>
                            <h3>{experience.heading}</h3>
                            <h4>{experience.company}</h4>
                            <Location>{experience.location}</Location>
                          </HeaderInfo>
                        </CardHeader>

                        <Summary>{experience.summary}</Summary>

                        <ExpandButton
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          $theme={experience.theme}
                        >
                          <FaChevronDown />
                        </ExpandButton>

                        <AnimatePresence>
                          {isActive && (
                            <DetailsSection
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ResponsibilitiesGrid>
                                {experience.responsibilities.map((resp, idx) => (
                                  <ResponsibilityCard key={idx} $theme={experience.theme}>
                                    <h4>
                                      {getResponsibilityIcon(resp.title)}
                                      {resp.title}
                                    </h4>
                                    <p>{resp.description}</p>
                                    <Impact $theme={experience.theme}>
                                      {resp.impact}
                                    </Impact>
                                  </ResponsibilityCard>
                                ))}
                              </ResponsibilitiesGrid>

                              <SkillsSection>
                                <h4>Skills & Expertise</h4>
                                <SkillsGrid>
                                  <SkillCategory>
                                    <h5>Technical Skills</h5>
                                    <SkillTags>
                                      {experience.skills.technical.map((skill, idx) => (
                                        <SkillTag key={idx} $theme={experience.theme}>
                                          {skill}
                                        </SkillTag>
                                      ))}
                                    </SkillTags>
                                  </SkillCategory>
                                  <SkillCategory>
                                    <h5>Soft Skills</h5>
                                    <SkillTags>
                                      {experience.skills.soft.map((skill, idx) => (
                                        <SkillTag key={idx} $theme={experience.theme}>
                                          {skill}
                                        </SkillTag>
                                      ))}
                                    </SkillTags>
                                  </SkillCategory>
                                </SkillsGrid>
                              </SkillsSection>
                            </DetailsSection>
                          )}
                        </AnimatePresence>
                      </ContentPanel>
                    </ExperienceCard>
                  </ExperienceEntry>
                </React.Fragment>
              );
            })}
          </ExperienceGrid>
        </TimelineWrapper>
      </ExperienceContainer>
    </SectionWrapper>
  );
};

// Styled Components
const SectionWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg,
    #004d6e 0%,
    #005a7e 15%,
    #006a8e 30%,
    #007a9e 45%,
    #0089ae 60%,
    #0098be 75%,
    #00a7ce 90%,
    #00b6de 100%
  );
  overflow-x: hidden;
  overflow-y: visible;
  padding: 6rem 0 4rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 300px;
    background: linear-gradient(180deg,
      #004d6e 0%,
      rgba(0, 77, 110, 0.6) 40%,
      rgba(0, 77, 110, 0) 100%
    );
    pointer-events: none;
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  opacity: 0.9;
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const ParticlesOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.6;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 20%,
    black 80%,
    transparent
  );
`;

const ExperienceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  row-gap: 4rem;
  grid-column: 1 / 3;
`;

const ExperienceEntry = styled(motion.div)`
  grid-column: 2 / 3;
  position: relative;
  width: 100%;
`;

const ExperienceDate = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExperienceCard = styled(motion.div)`
  grid-column: 2 / 3;
  display: flex;
  background: ${({ $theme }) => $theme.background};
  color: ${({ $theme }) => $theme.text};
  border-left: 6px solid ${({ $theme }) => $theme.primary};
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 30px rgba(0,0,0,0.4);
  }
`;

const LogoPanel = styled.div`
  flex-shrink: 0;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle at center,
    ${({ $theme }) => $theme.primary} 0%,
    ${({ $theme }) => $theme.background} 120%
  );
  padding: 1rem;
`;

const CompanyLogo = styled(motion.img)`
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.3));
`;

const ContentPanel = styled.div`
  flex: 1;
  padding: 1.5rem;
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const HeaderInfo = styled.div`
  h3 {
    font-size: 1.2rem;
    color: ${({ $theme }) => $theme.text};
    margin: 0 0 0.5rem;
  }

  h4 {
    font-size: 1rem;
    color: ${({ $theme }) => $theme.primary};
    margin: 0 0 0.5rem;
  }
`;

const Location = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  opacity: 0.7;
`;

const Summary = styled.p`
  color: ${({ theme }) => theme.text};
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
`;

const DetailsSection = styled(motion.div)`
  overflow: hidden;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const ResponsibilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ResponsibilityCard = styled.div`
  background: ${({ $theme }) => `${$theme.background}CC`};
  padding: 1.25rem;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  border: 1px solid ${({ $theme }) => `${$theme.primary}30`};

  h4 {
    color: ${({ $theme }) => $theme.text};
    margin: 0 0 0.75rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: ${({ $theme }) => `${$theme.text}CC`};
    margin: 0 0 1rem;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

const Impact = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background: ${({ $theme }) => $theme.primary};
  color: ${({ $theme }) => $theme.text};
`;

const SkillsSection = styled.div`
  h4 {
    color: ${({ theme }) => theme.text};
    margin: 0 0 1rem;
    opacity: 0.9;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled.div`
  h5 {
    color: ${({ theme }) => theme.primary};
    margin: 0 0 0.75rem;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background: ${({ $theme }) => `${$theme.background}CC`};
  color: ${({ $theme }) => $theme.text};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid ${({ $theme }) => `${$theme.primary}30`};
`;

const RolePill = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 1rem;
  background: ${({ $color }) => $color};
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0.9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const ExpandButton = styled(motion.div)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: ${({ $theme }) => $theme.accent};
  opacity: 0.6;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: ${({ $theme }) => $theme.primary};
  }
`;

const ConcurrentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primary};
  margin-left: 0.8rem;
  opacity: 0.8;
  
  svg {
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }
`;

// New Timeline Components
const TimelineWrapper = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  position: relative;
`;

const TimelineTrack = styled(motion.div)`
  grid-column: 1 / 2;
  position: absolute;
  top: ${props => getTimelinePosition(props.$isExpanded, props.$activeIndex).top};
  bottom: ${props => getTimelinePosition(props.$isExpanded, props.$activeIndex).bottom};
  left: 47.5%;
  transform: translateX(-50%);
  width: ${props => props.$isExpanded ? '6px' : '4px'};
  background: ${props => props.$isExpanded 
    ? `linear-gradient(
        to bottom,
        ${props.theme.primary} 0%,
        ${props.theme.accent} 100%
      )`
    : props.theme.primary
  };
  border-radius: ${props => props.$isExpanded ? '3px' : '2px'};
  transform-origin: top;
  z-index: 0;
  transition: all 0.3s ease;

  ${props => props.$isExpanded && `
    &::before {
      content: '';
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 100%;
      background: ${props.theme.primary}20;
      border-radius: inherit;
      filter: blur(4px);
      z-index: -1;
    }
  `}
`;

const EntryDot = styled(motion.div)`
  grid-column: 1 / 2;
  justify-self: center;
  align-self: center;
  width: 12px;
  height: 12px;
  border: 3px solid ${({ $theme }) => $theme.background};
  background: ${({ $theme, $isActive }) => $isActive ? $theme.primary : $theme.background};
  border-radius: 50%;
  box-shadow: 0 0 0 0 ${({ $theme }) => $theme.primary};
  z-index: 1;
  transition: all 0.3s ease;

  ${props => props.$isActive && `
    box-shadow: 0 0 8px 4px ${props.$theme.primary};
    transform: scale(1.3);
  `}
`;

export default Experience;
