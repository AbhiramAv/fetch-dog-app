import React from 'react';
import styled from 'styled-components';
import { Dog } from '../types';

const CardContainer = styled.div`
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
  height: 200px; /* Set a fixed height for the images */
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const CardDetails = styled.p`
  margin: 5px 0;
  font-size: 14px;
`;

const FavoriteButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

interface DogCardProps {
  dog: Dog;
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onAddToFavorites, isFavorite }) => {
  const handleFavoriteClick = () => {
    onAddToFavorites();
  };

  return (
    <CardContainer className="dog-card">
      <CardImage src={dog.img} alt={dog.name} />
      <CardContent>
        <CardTitle>{dog.name}</CardTitle>
        <CardDetails>{dog.breed}</CardDetails>
        <CardDetails>{dog.age} years old</CardDetails>
        <CardDetails>{dog.zip_code}</CardDetails>
        <FavoriteButton className={isFavorite ? 'remove-favorite' : 'add-favorite'} onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </FavoriteButton>
      </CardContent>
    </CardContainer>
  );
};

export default DogCard;
