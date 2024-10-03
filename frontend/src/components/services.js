import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Services() {
  const services = [
    { title: "Deck Building", description: "High-quality custom decks", imageUrl: "path_to_image" },
    { title: "Landscaping", description: "Beautiful landscaping designs", imageUrl: "path_to_image" }
  ];

  return (
    <Container id="services">
      <h2>Our Services</h2>
      <Row>
        {services.map((service, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={service.imageUrl} />
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Services;
