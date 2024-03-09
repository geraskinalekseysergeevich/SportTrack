// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import { BrowserRouter } from 'react-router-dom';
// import ProfileEdit from './ProfileEdit';

// // Mocking API server response
// const server = setupServer(
//   rest.put('http://localhost:3001/api/users/updateData', (req, res, ctx) => {
//     return res(ctx.status(200));
//   })
// );

// // Setup and cleanup of the server
// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// // Test 1: renders ProfileEdit component
// test('renders ProfileEdit component', () => {
//   render(
//     <BrowserRouter>
//       <ProfileEdit userId={1} userInfo={{ height: 170, weight: 60, age: 25, info: 'Sample info' }} />
//     </BrowserRouter>
//   );

//   // Add more assertions based on your component structure
//   expect(screen.getByLabelText(/Рост/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Вес/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Возраст/i)).toBeInTheDocument();
//   expect(screen.getByText(/Информация/i)).toBeInTheDocument();
//   expect(screen.getByText(/Сохранить/i)).toBeInTheDocument();
// });

// // Test 2: handles input changes correctly
// test('handles input changes correctly', () => {
//   render(
//     <BrowserRouter>
//       <ProfileEdit userId={1} userInfo={{ height: 170, weight: 60, age: 25, info: 'Sample info' }} />
//     </BrowserRouter>
//   );

//   const heightInput = screen.getByLabelText(/Рост/i);
//   fireEvent.change(heightInput, { target: { name: 'height', value: '180' } });

//   expect(heightInput.value).toBe('180');

//   const weightInput = screen.getByLabelText(/Вес/i);
//   fireEvent.change(weightInput, { target: { name: 'weight', value: '70' } });

//   expect(weightInput.value).toBe('70');

//   // Add more input change tests as needed
// });

// // Test 3: handles updateUserInfo and navigation correctly
// test('handles updateUserInfo and navigation correctly', async () => {
//   render(
//     <BrowserRouter>
//       <ProfileEdit userId={1} userInfo={{ height: 170, weight: 60, age: 25, info: 'Sample info' }} />
//     </BrowserRouter>
//   );

//   const saveButton = screen.getByText(/Сохранить/i);

//   fireEvent.click(saveButton);

//   // Wait for the API call and navigation
//   await waitFor(() => {
//     expect(screen.getByText(/Данные успешно обновлены/i)).toBeInTheDocument();
//   });

// });
