import React from 'react';
import styled from 'styled-components';


const IntroSection = styled.section`
    text-align: center;
    margin-bottom: 20px;

`

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
`;

const IntroText = styled.p`
    font-size: 1rem;
    color: #555;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
`;

function PortfolioIntro() {
    return (
        <IntroSection>
            <Title>Nos Projets</Title>
            <IntroText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula enim a libero gravida, et facilisis nunc tristique.
            </IntroText>
        </IntroSection>
    );
}

export default PortfolioIntro;
