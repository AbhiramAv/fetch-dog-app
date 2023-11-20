// DogCard.tsx

import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  /* Styles for your card container */
`;

interface DogCardProps {
  dog: {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
  };
  onAddToFavorites: () => void;
  isFavorite: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onAddToFavorites, isFavorite }) => {
  return (
    <CardContainer>
      {/* Your card content */}
      <h3>{dog.name}</h3>
      <p>{dog.breed}</p>
      <p>{dog.age} years old</p>
      {/* Add more details as needed */}
      <img src={dog.img} alt={dog.name} />

      {/* Add to Favorites button */}
      <button onClick={onAddToFavorites}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </CardContainer>
  );
};

export default DogCard;
