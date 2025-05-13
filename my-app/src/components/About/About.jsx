import React from 'react';
import styled from 'styled-components';

const About = () => {
    return (
        <AboutContainer>
            About Me
        </AboutContainer>
    );
}

const AboutContainer = styled.div`
    display: flex;
    flex_direction: column;
    height: 100vh;
`

export default About;