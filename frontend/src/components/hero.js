import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Hero() {
  return (
    <div className="hero-section" style={{ backgroundImage: `url('your-image-url')`, height: '100vh', backgroundSize: 'cover' }}>
      <Container>
        <div className="hero-text">
          <h1>Building Your Dream Outdoor Spaces</h1>
          <p>We offer the best in patio and landscaping services</p>
          <Button variant="primary">Get Started</Button>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
