import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './hero';  // Your existing Hero component

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />
      
      {/* Welcome Message */}
      <section className="welcome-section">
        <div className="container">
          <h1>Welcome to Our Website</h1>
          <p>We provide top-quality services in garden and deck construction. Explore our services and let us help you transform your outdoor spaces.</p>
          <Link to="/services" className="btn btn-primary">View Our Services</Link>
        </div>
      </section>

      {/* Featured Services */}
      <section className="featured-services">
        <div className="container">
          <h2>Our Featured Services</h2>
          <div className="services-grid">
            <div className="service-item">
              <h3>Deck Building</h3>
              <p>Custom-designed decks that are perfect for outdoor living.</p>
            </div>
            <div className="service-item">
              <h3>Landscaping</h3>
              <p>Beautiful landscapes designed and built to fit your home.</p>
            </div>
            <div className="service-item">
              <h3>Garden Construction</h3>
              <p>We create custom gardens tailored to your vision.</p>
            </div>
          </div>
          <Link to="/services" className="btn btn-secondary">Explore All Services</Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today to get a free consultation on your next garden or deck construction project.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
