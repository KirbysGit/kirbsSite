import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
// Import your images
import bitgoLogo from '../images/bitgo.jpg';
import barLouieLogo from '../images/barlouie.jpg';
import hawkersLogo from '../images/hawkers.jpg';

const logoMap = {
  bitgo: bitgoLogo,
  barlouie: barLouieLogo,
  hawkers: hawkersLogo
};

const Experience = ({ content }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <ExperienceContainer>
      <Timeline>
        {content.map((job, index) => (
          <TimelineItem
            key={index}
            onClick={() => setSelectedJob(job)}
            whileHover={{ x: 10 }}
            whileTap={{ scale: 0.98 }}
          >
            <TimelineDot style={{ background: job.color }} />
            <TimelineContent>
              <CompanyLogo src={logoMap[job.logo]} alt={job.company} />
              <div>
                <h3>{job.heading}</h3>
                <h4>{job.company}</h4>
                <Duration>
                  {job.duration.start} - {job.duration.end}
                </Duration>
                <JobType style={{ background: job.color }}>
                  {job.type}
                </JobType>
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <AnimatePresence>
        {selectedJob && (
          <JobModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedJob(null)}
          >
            <ModalContent
              onClick={e => e.stopPropagation()}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              <CloseButton onClick={() => setSelectedJob(null)}>×</CloseButton>
              
              <ModalHeader style={{ borderColor: selectedJob.color }}>
                <CompanyLogo src={logoMap[selectedJob.logo]} alt={selectedJob.company} />
                <div>
                  <h2>{selectedJob.heading}</h2>
                  <h3>{selectedJob.company}</h3>
                  <Location>{selectedJob.location}</Location>
                </div>
              </ModalHeader>

              <ResponsibilitiesGrid>
                {selectedJob.responsibilities.map((resp, idx) => (
                  <ResponsibilityCard key={idx}>
                    <h4>{resp.title}</h4>
                    <p>{resp.description}</p>
                    <Impact style={{ background: selectedJob.color }}>
                      {resp.impact}
                    </Impact>
                  </ResponsibilityCard>
                ))}
              </ResponsibilitiesGrid>

              <SkillsSection>
                <h4>Skills Developed</h4>
                <SkillsGrid>
                  <SkillCategory>
                    <h5>Technical</h5>
                    <SkillTags>
                      {selectedJob.skills.technical.map((skill, idx) => (
                        <SkillTag key={idx}>{skill}</SkillTag>
                      ))}
                    </SkillTags>
                  </SkillCategory>
                  <SkillCategory>
                    <h5>Soft Skills</h5>
                    <SkillTags>
                      {selectedJob.skills.soft.map((skill, idx) => (
                        <SkillTag key={idx}>{skill}</SkillTag>
                      ))}
                    </SkillTags>
                  </SkillCategory>
                </SkillsGrid>
              </SkillsSection>
            </ModalContent>
          </JobModal>
        )}
      </AnimatePresence>
    </ExperienceContainer>
  );
};

// Styled Components
const ExperienceContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Timeline = styled(motion.div)`
  position: relative;
  padding-left: 3rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: ${({ theme }) => theme.primary};
    border-radius: 3px;
  }
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding: 2rem;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px ${({ theme }) => theme.shadow};

  &:hover {
    background: ${({ theme }) => theme.cardHover};
    transform: translateX(10px);
    box-shadow: 0 6px 8px ${({ theme }) => theme.shadow};
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -2.4rem;
  top: 2rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.background};
`;

const TimelineContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.text};
  }

  h4 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 0.5rem;
  }
`;

const CompanyLogo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  background: ${({ theme }) => theme.surface};
  padding: 0.5rem;
  box-shadow: 0 2px 4px ${({ theme }) => theme.shadow};
`;

const Duration = styled.span`
  display: block;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

const JobType = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  color: #000;
`;

const JobModal = styled(motion.div)`
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

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.modal};
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  color: ${({ theme }) => theme.text};
`;

const ModalHeader = styled.div`
  display: flex;
  gap: 2rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid;

  h2 {
    margin: 0;
    color: #fff;
  }

  h3 {
    margin: 0.5rem 0;
    color: #ccc;
  }
`;

const Location = styled.span`
  display: block;
  color: #888;
  font-size: 0.9rem;
`;

const ResponsibilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ResponsibilityCard = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  border-radius: 8px;

  h4 {
    margin: 0 0 1rem;
    color: ${({ theme }) => theme.primary};
  }

  p {
    margin: 0 0 1rem;
    color: ${({ theme }) => theme.textSecondary};
    line-height: 1.6;
  }
`;

const Impact = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  color: #000;
`;

const SkillsSection = styled.div`
  h4 {
    color: #fff;
    margin: 0 0 1rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled.div`
  h5 {
    color: #ffce00;
    margin: 0 0 1rem;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.9rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export default Experience; 