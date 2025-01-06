import React from 'react';
import Education from './Education';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import styled from 'styled-components';

const StyledSection = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.background};
  transition: all 0.3s ease;

  .section-title {
    color: ${({ theme }) => theme.text};
    text-align: center;
    margin-bottom: 3rem;
  }

  .content-block {
    background: ${({ theme }) => theme.card};
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    transition: all 0.3s ease;

    h3 {
      color: ${({ theme }) => theme.primary};
      margin-bottom: 1rem;
    }

    p {
      color: ${({ theme }) => theme.textSecondary};
    }

    ul {
      color: ${({ theme }) => theme.text};
      margin-top: 1rem;
    }
  }
`;

const Section = ({ id, title, content }) => {
  if (id === 'education') {
    return (
      <StyledSection id={id}>
        <h2 className="section-title">{title}</h2>
        <Education content={content} />
      </StyledSection>
    );
  }

  if (id === 'projects') {
    return (
      <StyledSection id={id}>
        <h2 className="section-title">{title}</h2>
        <Projects content={content} />
      </StyledSection>
    );
  }

  if (id === 'skills') {
    return (
      <StyledSection id={id}>
        <h2 className="section-title">{title}</h2>
        <Skills content={content} />
      </StyledSection>
    );
  }

  if (id === 'experience') {
    return (
      <StyledSection id={id}>
        <h2 className="section-title">{title}</h2>
        <Experience content={content} />
      </StyledSection>
    );
  }

  // Regular section rendering
  return (
    <StyledSection id={id}>
      <h2 className="section-title">{title}</h2>
      <div className="section-content">
        {content.map((item, idx) => (
          <div key={idx} className="content-block">
            <h3>{item.heading}</h3>
            <p>{item.description}</p>
            {item.details && (
              <ul>
                {item.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </StyledSection>
  );
};

export default Section;