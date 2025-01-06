import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Move the custom hook outside of any component
const useScrollProgress = (ref) => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  });
  
  return useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
};

// Add these animation variants near the top of the file
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, 0.05, 0.01, 0.99] // Custom easing
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const timelineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const Education = ({ content }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [completedViewMode, setCompletedViewMode] = useState('grid'); // 'grid' or 'timeline'
  const [isTimelineView, setIsTimelineView] = useState(false);

  return content.map((edu, index) => (
    <StyledEducation key={index}>
      <motion.div
        className="edu-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{edu.heading}</h2>
        <h3>{edu.degree}</h3>
        {edu.minor && <h4>{edu.minor}</h4>}

        <div className="edu-meta">
          <MetaItem>
            <span role="img" aria-label="location">📍</span> {edu.location}
          </MetaItem>
          <MetaItem>
            <span role="img" aria-label="calendar">📅</span> {edu.duration.start} - {edu.duration.expected}
          </MetaItem>
          <MetaItem>
            <span role="img" aria-label="graduation cap">🎓</span> GPA: {edu.gpa}
          </MetaItem>
        </div>
      </motion.div>

      <TabContainer role="tablist">
        <TabButton
          role="tab"
          aria-selected={activeTab === 'current'}
          $active={activeTab === 'current'}
          onClick={() => setActiveTab('current')}
        >
          Current Courses
        </TabButton>
        <TabButton
          role="tab"
          aria-selected={activeTab === 'completed'}
          $active={activeTab === 'completed'}
          onClick={() => setActiveTab('completed')}
        >
          Completed Courses
        </TabButton>
        <TabButton
          role="tab"
          aria-selected={activeTab === 'achievements'}
          $active={activeTab === 'achievements'}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </TabButton>
      </TabContainer>

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'completed' && (
            <>
              <ViewToggle>
                <ViewToggleButton
                  $active={completedViewMode === 'grid'}
                  onClick={() => setCompletedViewMode('grid')}
                >
                  <span role="img" aria-label="grid">📑</span> Card View
                </ViewToggleButton>
                <ViewToggleButton
                  $active={completedViewMode === 'timeline'}
                  onClick={() => setCompletedViewMode('timeline')}
                >
                  <span role="img" aria-label="timeline">📅</span> Timeline View
                </ViewToggleButton>
              </ViewToggle>

              {completedViewMode === 'grid' ? (
                <CourseGrid>
                  {edu.coursework.completed.map((course, idx) => (
                    <CourseCard
                      key={idx}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      layoutId={`course-${idx}`}
                      onClick={() => setExpandedCourse(expandedCourse === idx ? null : idx)}
                      $isExpanded={expandedCourse === idx}
                    >
                      <CourseHeader>
                        <h4>{course.name}</h4>
                        <GradeBadge $grade={course.grade}>{course.grade}</GradeBadge>
                      </CourseHeader>
                      <span className="course-code">{course.code}</span>

                      <AnimatePresence>
                        {expandedCourse === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              transition: {
                                height: {
                                  duration: 0.3,
                                  ease: "easeOut"
                                },
                                opacity: {
                                  duration: 0.2,
                                  ease: "easeIn"
                                }
                              }
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: {
                                height: {
                                  duration: 0.2,
                                  ease: "easeIn"
                                },
                                opacity: {
                                  duration: 0.1
                                }
                              }
                            }}
                            className="course-details"
                          >
                            <p>{course.description}</p>
                            <div className="skills">
                              {course.skills.map((skill, i) => (
                                <SkillBadge key={i} title={skill}>{skill}</SkillBadge>
                              ))}
                            </div>
                            {course.github && (
                              <div className="github-links">
                                {Array.isArray(course.github) ? (
                                  course.github.map((link, i) => (
                                    <GitHubButton 
                                      key={i}
                                      href={link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      title={`View Project ${i + 1}`}
                                      $isExpanded={expandedCourse === idx}
                                    >
                                      <GitHubIcon />
                                    </GitHubButton>
                                  ))
                                ) : (
                                  <GitHubButton 
                                    href={course.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    title="View on GitHub"
                                    $isExpanded={expandedCourse === idx}
                                  >
                                    <GitHubIcon />
                                  </GitHubButton>
                                )}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CourseCard>
                  ))}
                </CourseGrid>
              ) : (
                <TimelineView 
                  semesters={[
                    {
                      semester: 'Fall 2021',
                      courses: edu.coursework.completed.filter(course => 
                        course.code === "COP2500C"
                      )
                    },
                    {
                      semester: 'Spring 2023',
                      courses: edu.coursework.completed.filter(course => 
                        course.code === "EGN3211"
                      )
                    },
                    {
                      semester: 'Summer 2023',
                      courses: edu.coursework.completed.filter(course => 
                        course.code === "EEL3801C"
                      )
                    },
                    {
                      semester: 'Fall 2023',
                      courses: edu.coursework.completed.filter(course => 
                        ["COP3502C", "COP3330"].includes(course.code)
                      )
                    },
                    {
                      semester: 'Spring 2024',
                      courses: edu.coursework.completed.filter(course => 
                        ["COP3503C", "EEL4742C"].includes(course.code)
                      )
                    },
                    {
                      semester: 'Summer 2024',
                      courses: edu.coursework.completed.filter(course => 
                        ["EEL3926L", "COP4331C"].includes(course.code)
                      )
                    },
                    {
                      semester: 'Fall 2024',
                      courses: edu.coursework.completed.filter(course => 
                        ["CAP4611", "CAP4720", "COP4600"].includes(course.code)
                      )
                    }
                  ]}
                  expandedCourse={expandedCourse}
                  setExpandedCourse={setExpandedCourse}
                />
              )}
            </>
          )}

          {activeTab === 'current' && (
            <CourseGrid>
              {edu.coursework.current.map((course, idx) => (
                <CurrentCourseCard key={idx}>
                  <h4>{course.name}</h4>
                  <span className="course-code">{course.code}</span>
                  <p className="course-description">{course.description}</p>
                  {course.github && (
                    <GitHubButton 
                      href={course.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="View on GitHub"
                      $isExpanded={expandedCourse === idx}
                    >
                      <GitHubIcon />
                    </GitHubButton>
                  )}
                  <ProgressBar />
                </CurrentCourseCard>
              ))}
            </CourseGrid>
          )}

          {activeTab === 'achievements' && (
            <div className="achievements">
              {edu.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-section">
                  <h4>{highlight.title}</h4>
                  <ul>
                    {highlight.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </StyledEducation>
  ));
};

// Styled Components
const StyledEducation = styled.div`
  padding: 3rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  margin: 3rem 0;
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;

  .edu-header {
    text-align: center;
    margin-bottom: 3rem;
    
    h2 {
      margin-bottom: 1rem;
      font-size: 2rem;
    }
    
    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
    }
    
    h4 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.textSecondary};
    }
  }

  .edu-meta {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    color: ${({ theme }) => theme.textSecondary};
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .achievements {
    padding: 1.5rem;
    
    .highlight-section {
      margin-bottom: 2rem;
      
      h4 {
        margin-bottom: 1rem;
      }
      
      ul {
        list-style-type: none;
        
        li {
          margin-bottom: 0.5rem;
          padding-left: 1rem;
          position: relative;
          
          &:before {
            content: "•";
            position: absolute;
            left: 0;
            color: ${({ theme }) => theme.primary};
          }
        }
      }
    }
  }

  .course-description {
    margin-top: 1rem;
    color: ${({ theme }) => theme.textSecondary};
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 3rem 0;
`;

const TabButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.$active ? props.theme.primary : props.theme.surface};
  color: ${props => props.$active ? props.theme.background : props.theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$active ? props.theme.primary : props.theme.cardHover};
  }
`;

const CourseGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1.5rem;
`;

const CourseCard = styled(motion.div)`
  position: relative;
  background: ${({ theme }) => `linear-gradient(
    145deg,
    ${theme.card} 0%,
    ${theme.cardHover} 100%
  )`};
  padding: 2rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadow},
             0 1px 3px ${({ theme }) => theme.shadow}20;
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.border};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(
      145deg,
      ${({ theme }) => theme.primary}20,
      transparent
    );
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    background: linear-gradient(
      45deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.text}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CurrentCourseCard = styled(CourseCard)`
  cursor: default;
  
  .github-links {
    margin-top: 1rem;
  }
`;

const ProgressBar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.primary}30;
  border-radius: 3px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 60%;
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }
`;

// Optional QuickStats section
const QuickStats = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.surface};
  border-radius: 8px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const SkillBadge = styled.span`
  background: ${({ theme }) => theme.primary}20;
  color: ${({ theme }) => theme.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const GradeBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: bold;
  background: ${props => {
    if (props.$grade === 'A') return props.theme.success + '20';
    if (props.$grade === 'B') return props.theme.warning + '20';
    return props.theme.error + '20';
  }};
  color: ${props => {
    if (props.$grade === 'A') return props.theme.success;
    if (props.$grade === 'B') return props.theme.warning;
    return props.theme.error;
  }};
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SemesterTimeline = styled.div`
  position: relative;
  padding: 2rem;
  margin: 0 auto;
  max-width: 900px;

  &:before {
    content: '';
    position: absolute;
    left: 180px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ theme }) => theme.primary};
    opacity: 0.3;
  }
`;

const TimelineProgress = styled(motion.div)`
  position: fixed;
  left: 120px;
  top: 100px;
  width: 2px;
  height: 80vh;
  background: #B2A4D4;
  transform-origin: top;
  opacity: 0.3;
`;

const SemesterLabel = styled.div`
  position: absolute;
  left: 0;
  width: 160px;
  text-align: right;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  padding-right: 2rem;
  
  &:after {
    content: '';
    position: absolute;
    right: -11px;
    top: 50%;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.background};
    border: 3px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
`;

const TimelineCourseCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;

  &:before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    width: 20px;
    height: 2px;
    background: ${({ theme }) => theme.primary};
    opacity: 0.3;
    transform: translateY(-50%);
  }

  &:hover {
    transform: translateX(10px);
    background: ${({ theme }) => theme.cardHover};
    box-shadow: 0 4px 8px ${({ theme }) => theme.shadow};
  }

  h4 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.text};
  }

  .course-code {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

// Modify the timeline section
const TimelineView = ({ semesters, expandedCourse, setExpandedCourse }) => {
  return (
    <SemesterTimeline>
      {semesters.map(({ semester, courses }) => (
        <SemesterBlock key={semester}>
          <SemesterLabel>{semester}</SemesterLabel>
          <CourseList>
            {courses.map((course, idx) => (
              <TimelineCourseCard
                key={idx}
                variants={timelineVariants}
                initial="hidden"
                animate="visible"
                custom={idx}
                $isExpanded={expandedCourse === `${semester}-${idx}`}
                onClick={() => setExpandedCourse(
                  expandedCourse === `${semester}-${idx}` ? null : `${semester}-${idx}`
                )}
              >
                <h4>{course.name}</h4>
                <span className="course-code">{course.code}</span>
                {expandedCourse === `${semester}-${idx}` && (
                  <motion.div
                    className="course-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>{course.description}</p>
                    {course.skills && (
                      <div className="skills">
                        {course.skills.map((skill, i) => (
                          <SkillBadge key={i}>{skill}</SkillBadge>
                        ))}
                      </div>
                    )}
                    {course.github && (
                      <GitHubButton
                        href={course.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        $isExpanded={false}
                      >
                        <GitHubIcon />
                      </GitHubButton>
                    )}
                  </motion.div>
                )}
              </TimelineCourseCard>
            ))}
          </CourseList>
        </SemesterBlock>
      ))}
    </SemesterTimeline>
  );
};

// Add these styled components
const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ViewToggleButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: ${props => props.$active ? 
    `linear-gradient(145deg, ${props.theme.primary}, ${props.theme.primary}dd)` : 
    props.theme.surface};
  color: ${props => props.$active ? props.theme.background : props.theme.text};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$active ?
    `0 4px 12px ${props.theme.primary}40` :
    'none'};

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$active ?
      props.theme.primary :
      props.theme.cardHover};
  }

  span {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: scale(1.1);
  }
`;

const CourseList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: 200px;
`;

const SemesterBlock = styled.div`
  display: flex;
  margin-bottom: 3rem;
  position: relative;
`;

const GitHubButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$isExpanded ? 0 : 0.8};
  transform: ${props => props.$isExpanded ? 'scale(0.8)' : 'scale(1)'};

  &:hover {
    transform: ${props => props.$isExpanded ? 'scale(0.8)' : 'scale(1.1) rotate(8deg)'};
    background: ${({ theme }) => theme.cardHover};
    opacity: 1;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
`;

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default Education;
