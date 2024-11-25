import React from 'react';
import styled from 'styled-components';

const TestimonialsSection = styled.section`
  background-color: #333; /* Dark background */
  color: #fff;
  padding: 50px 0;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #f0f0f0;
  text-transform: uppercase;
`;

const TestimonialContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  background-color: #444;
  padding: 20px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const QuoteIcon = styled.span`
  font-size: 2em;
  color: #ff9800;
  position: absolute;
  top: -10px;
  left: 10px;
`;

const ClientName = styled.p`
  font-weight: bold;
  margin-top: 15px;
  font-size: 1.1em;
`;

const TestimonialText = styled.p`
  font-size: 1em;
  line-height: 1.5;
  color: #ddd;
`;

const Testimonials = () => {
  const testimonials = [
    {
        name: "CLIENT",
        text: "I am extremely pleased with the transformation of my yard! The landscaping service exceeded my expectations, creating a beautiful outdoor space that I can enjoy year-round. Thank you for your exceptional work and dedication. I look forward to visiting your website once it’s live. Wishing you a wonderful winter—take care!"
    }
    // {
    //   name: 'Allison',
    //   text: 'Jonah, Justin et l’équipe de constructeurs étaient professionnels. Ils ont été très réactifs à nos préoccupations.',
    // },
    // {
    //   name: 'Gaspard',
    //   text: 'Ace of Decks a remplacé notre terrasse sur le toit. Très satisfait et recommande sans hésitation.',
    // },
    // {
    //   name: 'Mike',
    //   text: 'Expérience incroyable avec l’équipe, très facile à communiquer et le travail parle de lui-même.',
    // },
  ];

  return (
    <TestimonialsSection>
      <Title>Témoignages</Title>
      <h4>aywa lfanid some test to say smtg like here's some satified clients. kayn ghir lkheir inchaalah </h4>
      <TestimonialContainer>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <QuoteIcon>❝</QuoteIcon>
            <TestimonialText>{testimonial.text}</TestimonialText>
            <ClientName>{testimonial.name}</ClientName>
          </TestimonialCard>
        ))}
      </TestimonialContainer>
    </TestimonialsSection>
  );
};

export default Testimonials;
