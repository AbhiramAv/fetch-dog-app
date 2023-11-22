//  import React from 'react';
//  import { render, fireEvent, screen } from '@testing-library/react';
// import Login from '../components/Login';
 
// import '@testing-library/jest-dom/extend-expect';



//  test('calls login function with correct name and email on button click', () => {
//      const mockLogin = jest.fn();
  
//      render(<Login login={mockLogin} />);
  
// //     // Simulate user input
//      fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'John' } });
//      fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
  
// //     // Simulate button click using getByRole
//     fireEvent.click(screen.getByRole('button', { name: 'Login' }));
  
// //     // Check if the login function is called with the correct arguments
//      expect(mockLogin).toHaveBeenCalledWith('John', 'john@example.com');
//    });
  