import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg" >
      <Container>
        {/* <Navbar.Brand href="/home">Gazon Nordic</Navbar.Brand> */}
        <Navbar.Brand href="/home" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/img/LOGO.JPG"
            alt="Logo"
            style={{
              width: '120px', // Increased size
              height: '120px',
              objectFit: 'cover', // Ensures the image covers the circle
              objectPosition: 'center', // Centers the image inside the circle
              marginRight: '15px', // Added more spacing from text
              border: '2px solid #e9ecef', // Added a border
              borderRadius: '50%', // Circular border
              backgroundColor: 'white', // Optional background
              padding: '5px' // Space between border and image
            }}
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>
            Gazon Nordic
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <Nav.Link href="/projects/portfolio">Projects finished</Nav.Link>

            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/admin/login">Admin</Nav.Link>
          </Nav>
          <Button variant="success" className="ml-2">Free Estimate</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
