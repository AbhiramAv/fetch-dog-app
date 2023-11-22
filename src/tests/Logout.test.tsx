// /* eslint-disable testing-library/no-wait-for-multiple-assertions */
// /* eslint-disable testing-library/prefer-presence-queries */
// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import { AuthProvider } from '../components/AuthContext';
// import Logout from '../components/Logout';
// import '@testing-library/jest-dom/extend-expect';

// const sampleUser = { name: 'John Doe', email: 'john@example.com' };

// test('renders Logout component correctly', async () => {
//   // Mock the useAuth hook to provide sample authentication context
//   const authProviderProps = {
//     isAuthenticated: true,
//     user: sampleUser,
//     login: jest.fn(),
//     logout: jest.fn(),
//   };

//   render(
//     <AuthProvider isAuthenticated={authProviderProps.isAuthenticated} user={authProviderProps.user} login={authProviderProps.login} logout={authProviderProps.logout}>
//       <Logout />
//     </AuthProvider>
//   );

//   // Check if user information is displayed
//   expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
//   expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
//   expect(screen.queryByText('Add dogs to favorites to generate a match!')).toBeInTheDocument();

//   // Simulate logout button click
//   fireEvent.click(screen.getByText('Logout'));

//   // Wait for the component to update after logout
//   await waitFor(() => {
//     expect(screen.queryByText('Name: John Doe')).toBeNull();
//     expect(screen.queryByText('Logout')).toBeNull();
//   });

//   // Check for the 'Login' text after logout
//   expect(screen.getByText('Login')).toBeInTheDocument();
// });
