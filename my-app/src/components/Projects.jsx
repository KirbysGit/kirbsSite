import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Projects = ({ content }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProjectsContainer>
      <ProjectGrid>
        {content.map((project, index) => (
          <ProjectCard
            key={index}
            layoutId={`project-${index}`}
            onClick={() => setSelectedProject(project)}
          >
            <motion.img 
              src={project.thumbnail} 
              alt={project.heading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <ProjectInfo>
              <h3>{project.heading}</h3>
              <p>{project.shortDescription}</p>
              <TechStack>
                {Object.entries(project.stack).slice(0, 2).map(([category, techs]) => (
                  techs.slice(0, 3).map(tech => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))
                ))}
              </TechStack>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            layoutId={`project-${content.indexOf(selectedProject)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent>
              <CloseButton onClick={() => setSelectedProject(null)}>×</CloseButton>
              
              <TabContainer>
                {['overview', 'features', 'technical', 'challenges'].map(tab => (
                  <TabButton
                    key={tab}
                    $active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </TabButton>
                ))}
              </TabContainer>

              <TabContent>
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h2>{selectedProject.heading}</h2>
                    <p>{selectedProject.shortDescription}</p>
                    <MetricsGrid>
                      {selectedProject.metrics?.map((metric, idx) => (
                        <MetricCard key={idx}>{metric}</MetricCard>
                      ))}
                    </MetricsGrid>
                    <Links>
                      {selectedProject.links?.github && (
                        <LinkButton href={selectedProject.links.github} target="_blank">
                          View on GitHub
                        </LinkButton>
                      )}
                      {selectedProject.links?.demo && (
                        <LinkButton href={selectedProject.links.demo} target="_blank">
                          Live Demo
                        </LinkButton>
                      )}
                    </Links>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <FeaturesGrid>
                    {selectedProject.keyFeatures?.map((feature, idx) => (
                      <FeatureCard key={idx}>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                        <TechStack>
                          {feature.tech.map(tech => (
                            <TechTag key={tech}>{tech}</TechTag>
                          ))}
                        </TechStack>
                      </FeatureCard>
                    ))}
                  </FeaturesGrid>
                )}

                {activeTab === 'technical' && (
                  <TechnicalDetails>
                    <StackSection>
                      {Object.entries(selectedProject.stack).map(([category, techs]) => (
                        <div key={category}>
                          <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                          <TechStack>
                            {techs.map(tech => (
                              <TechTag key={tech}>{tech}</TechTag>
                            ))}
                          </TechStack>
                        </div>
                      ))}
                    </StackSection>
                  </TechnicalDetails>
                )}

                {activeTab === 'challenges' && (
                  <ChallengesGrid>
                    {selectedProject.challenges?.map((challenge, idx) => (
                      <ChallengeCard key={idx}>
                        <h4>{challenge.problem}</h4>
                        <p>{challenge.solution}</p>
                        <ImpactTag>{challenge.impact}</ImpactTag>
                      </ChallengeCard>
                    ))}
                  </ChallengesGrid>
                )}
              </TabContent>
            </ModalContent>
          </ProjectModal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

// Styled Components
const ProjectsContainer = styled.div`
  position: relative;
  padding: 2rem;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.cardShadow};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.modalShadow};
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;

  h3 {
    margin: 0 0 1rem;
    color: ${({ theme }) => theme.primary};
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    margin-bottom: 1rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const ProjectModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.modalOverlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.modal};
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  color: ${({ theme }) => theme.text};
  box-shadow: ${({ theme }) => theme.modalShadow};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #ffce00;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #333;
  padding-bottom: 1rem;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.$active ? '#ffce00' : '#fff'};
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 2px solid ${props => props.$active ? '#ffce00' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: #ffce00;
  }
`;

const TabContent = styled.div`
  padding: 1rem 0;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const MetricCard = styled.div`
  background: #333;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  color: #ffce00;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const LinkButton = styled.a`
  background: #ffce00;
  color: #000;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background: #e6b800;
    transform: translateY(-2px);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  border-radius: 8px;

  h4 {
    color: ${({ theme }) => theme.primary};
    margin: 0 0 1rem;
  }
`;

const TechnicalDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StackSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;

  h4 {
    color: #ffce00;
    margin: 0 0 1rem;
  }
`;

const ChallengesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ChallengeCard = styled.div`
  background: #333;
  padding: 1.5rem;
  border-radius: 8px;

  h4 {
    color: #ffce00;
    margin: 0 0 1rem;
  }
`;

const ImpactTag = styled.div`
  background: #ffce00;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  display: inline-block;
  font-weight: bold;
`;

export default Projects; 