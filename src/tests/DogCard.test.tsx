// import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// import { render, screen } from '@testing-library/react';
// import DogCard from '../components/DogCard';

// test('renders DogCard component with dog data', () => {
//   const dog = {
//     id: '1',
//     img: 'dog-image-url',
//     name: 'Buddy',
//     age: 3,
//     breed: 'Golden Retriever',
//     zip_code: '22202',
//   };

//   render(<DogCard dog={dog} onAddToFavorites={function (): void {
//       throw new Error('Function not implemented.');
//   } } isFavorite={false} />);

//   // Check if the component renders with the correct dog data
//   expect(screen.getByAltText('Buddy')).toBeInTheDocument();
//   expect(screen.getByText('Buddy')).toBeInTheDocument();
//   expect(screen.getByText('Age: 3')).toBeInTheDocument();
//   expect(screen.getByText('Breed: Golden Retriever')).toBeInTheDocument();
// });

// test('renders DogCard component with "Add to Favorites" button', () => {
//   const dog = {
//     id: '1',
//     img: 'dog-image-url',
//     name: 'Buddy',
//     age: 3,
//     breed: 'Golden Retriever',
//   };

//   render(<DogCard dog={dog} onAddToFavorites={() => {}} isFavorite={false} />);

//   // Check if the "Add to Favorites" button is rendered
//   expect(screen.getByText('Add to Favorites')).toBeInTheDocument();
// });

// test('renders DogCard component with "Remove from Favorites" button', () => {
//   const dog = {
//     id: '1',
//     img: 'dog-image-url',
//     name: 'Buddy',
//     age: 3,
//     breed: 'Golden Retriever',
//   };

//   render(<DogCard dog={dog} onAddToFavorites={() => {}} isFavorite={true} />);

//   // Check if the "Remove from Favorites" button is rendered
//   expect(screen.getByText('Remove from Favorites')).toBeInTheDocument();
// });

// test('invokes onAddToFavorites when "Add to Favorites" button is clicked', () => {
//   const dog = {
//     id: '1',
//     img: 'dog-image-url',
//     name: 'Buddy',
//     age: 3,
//     breed: 'Golden Retriever',
//   };

//   const onAddToFavoritesMock = jest.fn();

//   render(<DogCard dog={dog} onAddToFavorites={onAddToFavoritesMock} isFavorite={false} />);

//   // Click the "Add to Favorites" button
//   screen.getByText('Add to Favorites').click();

//   // Check if onAddToFavoritesMock is called
//   expect(onAddToFavoritesMock).toHaveBeenCalledTimes(1);
// });
