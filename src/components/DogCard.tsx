import React from 'react';
import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import { Dog } from '../types';

// Define the properties expected by the DogCard component
interface DogCardProps {
  dog: Dog;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

// Styled components for styling the DogCard
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

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
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

const StarIconWrapper = styled.span<{ active: boolean }>`
  color: ${({ active }) => (active ? '#ffc107' : '#ccc')};
  cursor: ${({ active }) => (active ? 'pointer' : 'pointer')};
  margin-left: 8px;
`;

const CardDetails = styled.p`
  margin: 4px 0;
  font-size: 14px;
  color: #555;

  strong {
    font-weight: bold;
    color: #333;
  }
`;

// DogCard component definition
const DogCard: React.FC<DogCardProps> = ({ dog, onAddToFavorites, isFavorite }) => {
  // Handle click on the star icon to add/remove from favorites
  const handleFavoriteClick = () => {
    onAddToFavorites();
  };

  return (
    <CardContainer className="dog-card">
      <CardImage src={dog.img} alt={dog.name} />
      <CardContent>
        <NameAndStarContainer>
          <CardTitle>
            {dog.name}
            <StarIconWrapper active={isFavorite}>
              <StarIcon onClick={handleFavoriteClick} />
            </StarIconWrapper>
          </CardTitle>
        </NameAndStarContainer>
        <CardDetails>
          <strong>Breed:</strong> {dog.breed}
        </CardDetails>
        <CardDetails>
          <strong>Age:</strong> {dog.age} years old
        </CardDetails>
        <CardDetails>
          <strong>Zip Code:</strong> {dog.zip_code}
        </CardDetails>
      </CardContent>
    </CardContainer>
  );
};

export default DogCard;
