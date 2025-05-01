import React from 'react';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StyledSection = styled(motion.section)`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 2;
`;

const Section = ({ id, content }) => {
  const renderContent = () => {
    switch (id) {
      case 'experience':
        return <Experience content={content} />;
      case 'skills':
        return <Skills content={content} />;
      default:
        return null;
    }
  };

  return (
    <StyledSection
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <SectionContent>
        {renderContent()}
      </SectionContent>
    </StyledSection>
  );
};

export default Section;