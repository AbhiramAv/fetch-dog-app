// // Import necessary testing libraries and mock necessary dependencies
// import React from 'react';
// import '@testing-library/jest-dom/extend-expect';
// import { render, waitFor, screen } from '@testing-library/react';
// import DogSearchComponent from '../components/DogSearchComponent';
// import * as api from '../api';


// // Mock the api module to control its behavior in tests
// jest.mock('../api', () => ({
//     ...jest.requireActual('../api'),
//     get: jest.fn(),
//   }));
  
// // Sample data for testing
// const sampleDogs = [
//   { id: '1', name: 'Dog1', breed: 'Breed1', age: 3, zip_code: '12345', img: 'dog1.jpg' },
//   { id: '2', name: 'Dog2', breed: 'Breed2', age: 2, zip_code: '54321', img: 'dog2.jpg' },
// ];

// test('renders DogSearchComponent correctly', async () => {
//   // Mock the api.get method to return sample data
//   api.get.mockResolvedValueOnce({ data: sampleDogs });

//   render(<DogSearchComponent />);

//   // Wait for the component to fetch data
//   await waitFor(() => expect(api.get).toHaveBeenCalled());

//   // Check if rendered components match the sample data
//   expect(screen.getByText('Dog1')).toBeInTheDocument();
//   expect(screen.getByText('Breed1')).toBeInTheDocument();
//   expect(screen.getByText('3 years old')).toBeInTheDocument();
//   expect(screen.getByText('12345')).toBeInTheDocument();
//   expect(screen.getByText('Dog2')).toBeInTheDocument();
//   expect(screen.getByText('Breed2')).toBeInTheDocument();
//   expect(screen.getByText('2 years old')).toBeInTheDocument();
//   expect(screen.getByText('54321')).toBeInTheDocument();
// });

// // You can add more test cases for other functionalities of DogSearchComponent
