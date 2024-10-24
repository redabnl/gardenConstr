import React from 'react';
import styled from 'styled-components';

const BannerContainer = styled.div`
  background: url('path/to/your/background-image.jpg') no-repeat center center;
  background-size: cover;
  padding: 50px 20px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BannerText = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const BannerSubText = styled.p`
  font-size: 16px;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <BannerText>GAZON NORDIC</BannerText>
      <BannerSubText>Commercial and Residential Services</BannerSubText>
    </BannerContainer>
  );
};

export default Banner;
