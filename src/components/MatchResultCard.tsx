import React from 'react';
import styled from 'styled-components';
import { Dog } from '../types';

// Styled components for MatchResultCard
const MatchResultCardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const NameAndStarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  text-align: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px; /* Set a fixed height for the images */
  object-fit: cover;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const MatchCardDetails = styled.p`
  margin: 8px 0; /* Add more space between details */
  font-size: 14px;
  color: #555; /* Set the color of the details text */

  strong {
    font-weight: bold;
    color: #333; /* Set the color of the strong text */
  }
`;

// Props interface for MatchResultCard
interface MatchResultCardProps {
  dog: Dog;
}

// MatchResultCard component definition
const MatchResultCard: React.FC<MatchResultCardProps> = ({ dog }) => {
  return (
    <MatchResultCardWrapper>
      <CardContainer className="dog-card">
        <CardImage src={dog.img} alt={dog.name} />
        <CardContent>
          <NameAndStarContainer>
            <CardTitle>{dog.name}</CardTitle>
          </NameAndStarContainer>
          <MatchCardDetails>
            <strong>Breed:</strong> {dog.breed}
          </MatchCardDetails>
          <MatchCardDetails>
            <strong>Age:</strong> {dog.age} years old
          </MatchCardDetails>
          <MatchCardDetails>
            <strong>Zip Code:</strong> {dog.zip_code}
          </MatchCardDetails>
        </CardContent>
      </CardContainer>
    </MatchResultCardWrapper>
  );
};

export default MatchResultCard;