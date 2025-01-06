import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Skills = ({ content }) => {
  const [activeCategory, setActiveCategory] = useState('programming');
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <SkillsContainer>
      <CategoryNav>
        {Object.keys(content).map((category) => (
          <CategoryButton
            key={category}
            $active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            <span>{content[category].icon}</span>
            {content[category].category}
          </CategoryButton>
        ))}
      </CategoryNav>

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CategoryDescription>
            {content[activeCategory].description}
          </CategoryDescription>

          <SkillsGrid>
            {content[activeCategory].skills.map((skill, index) => (
              <SkillCard
                key={index}
                onClick={() => setSelectedSkill(skill)}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <SkillIcon src={skill.icon} alt={skill.name} />
                <SkillInfo>
                  <h4>{skill.name}</h4>
                  <ProgressBar>
                    <Progress $level={skill.level} $color={skill.color} />
                  </ProgressBar>
                  <ExperienceTag>{skill.experience}</ExperienceTag>
                </SkillInfo>
              </SkillCard>
            ))}
          </SkillsGrid>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <ModalContent
              onClick={e => e.stopPropagation()}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              <CloseButton onClick={() => setSelectedSkill(null)}>×</CloseButton>
              <ModalHeader style={{ color: selectedSkill.color }}>
                <img src={selectedSkill.icon} alt={selectedSkill.name} />
                <h3>{selectedSkill.name}</h3>
              </ModalHeader>
              <ModalBody>
                <StatGrid>
                  <StatCard>
                    <h4>Proficiency</h4>
                    <p>{selectedSkill.level}%</p>
                  </StatCard>
                  <StatCard>
                    <h4>Experience</h4>
                    <p>{selectedSkill.experience}</p>
                  </StatCard>
                  <StatCard>
                    <h4>Projects</h4>
                    <p>{selectedSkill.projects}</p>
                  </StatCard>
                </StatGrid>
                <DetailsSection>
                  <h4>Expertise</h4>
                  <p>{selectedSkill.details}</p>
                </DetailsSection>
              </ModalBody>
            </ModalContent>
          </SkillModal>
        )}
      </AnimatePresence>
    </SkillsContainer>
  );
};

// Styled Components
const SkillsContainer = styled.div`
  padding: 2rem;
`;

const CategoryNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryButton = styled.button`
  background: ${props => props.$active ? props.theme.primary : props.theme.surface};
  color: ${props => props.$active ? props.theme.background : props.theme.text};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1.2rem;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

const CategoryDescription = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  margin-bottom: 2rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.cardShadow};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.modalShadow};
  }
`;

const SkillIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const SkillInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0 0 0.5rem;
    color: #fff;
  }
`;

const ProgressBar = styled.div`
  background: ${({ theme }) => theme.skillBar};
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.$level}%;
  height: 100%;
  background: ${props => props.$color};
  transition: width 1s ease;
`;

const ExperienceTag = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const SkillModal = styled(motion.div)`
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
  max-width: 600px;
  width: 100%;
  position: relative;
  color: ${({ theme }) => theme.text};
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  img {
    width: 48px;
    height: 48px;
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
  }
`;

const ModalBody = styled.div`
  color: #fff;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;

  h4 {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.primary};
    font-size: 0.9rem;
  }

  p {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const DetailsSection = styled.div`
  h4 {
    color: #ffce00;
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    line-height: 1.6;
  }
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
  line-height: 1;
  
  &:hover {
    color: #ffce00;
  }
`;

export default Skills; 