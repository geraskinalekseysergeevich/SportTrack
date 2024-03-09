// import React from 'react';
// import { render, screen, fireEvent, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import MealsForm from '../MealsForm';

// // Mock the useNavigate hook
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

// // Mock the fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     ok: true,
//     json: () => Promise.resolve({ userId: 'mockUserId' }),
//   })
// );

// describe('MealsForm', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders MealsForm component', () => {
//     render(<MealsForm userId="mockUserId" />);
//     // Add your assertions for initial rendering
//   });

//   test('handles adding and removing food items', () => {
//     render(<MealsForm userId="mockUserId" />);
//     // Add your assertions for initial rendering

//     // Trigger the toggleAddItemMenu function
//     fireEvent.click(screen.getByAltText('plus icon'));

//     // Add your assertions for the openAddItem state

//     // Enter values in the MealItemAddForm and trigger onSave
//     userEvent.type(screen.getByLabelText(/Название:/i), 'Mock Food Item'); // Update selector
//     userEvent.click(screen.getByText(/Сохранить/i)); // Update button text

//     // Add your assertions for the updated foodItems state

//     // Trigger onRemoveItem wrapped in act
//     act(() => {
//       userEvent.click(screen.getByText(/Удалить/i)); // Update button text
//     });

//     // Add your assertions for the updated foodItems state
//   });

//   test('handles saving all food items successfully', async () => {
//     render(<MealsForm userId="mockUserId" />);
//     // Add your assertions for initial rendering

//     // Trigger handleSaveAll wrapped in act
//     await act(async () => {
//       fireEvent.click(screen.getByAltText('save icon'));
//       // Wait for asynchronous tasks to complete
//       await Promise.resolve();
//     });

//     // Add your assertions for the fetch call and the updated state
//   });

//   test('handles saving all food items with fetch failure', async () => {
//     // Mock fetch to simulate a failure
//     global.fetch.mockImplementationOnce(() =>
//       Promise.resolve({
//         ok: false,
//         json: () => Promise.resolve({ error: 'Mock error' }),
//       })
//     );

//     render(<MealsForm userId="mockUserId" />);
//     // Add your assertions for initial rendering

//     // Trigger handleSaveAll wrapped in act
//     await act(async () => {
//       fireEvent.click(screen.getByAltText('save icon'));
//       // Wait for asynchronous tasks to complete
//       await Promise.resolve();
//     });

//     // Add your assertions for the fetch call and the error handling
//   });

//   test('navigates to profile page on avatar click', () => {
//     render(<MealsForm userId="mockUserId" />);
//     // Add your assertions for initial rendering

//     // Mock the navigate function
//     const navigateMock = jest.fn();
//     jest.mock('react-router-dom', () => ({
//       ...jest.requireActual('react-router-dom'),
//       useNavigate: () => navigateMock,
//     }));

//     // Trigger avatar click
//     fireEvent.click(screen.getByAltText('')); // Update alt text

//     // Check if the navigate function is called with the expected arguments
//     expect(navigateMock).toHaveBeenCalledWith('/profile', { state: { userId: 'mockUserId' } });
//   });

//   test('handles input change for meal name', () => {
//     render(<MealsForm userId="mockUserId" />);
//     // Add your assertions for initial rendering

//     // Change the meal name input
//     userEvent.type(screen.getByLabelText(/Название:/i), 'Mock Meal Name'); // Update selector

//     // Add your assertions for the updated mealName state
//   });
// });
