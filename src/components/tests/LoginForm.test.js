// import React from 'react';
// import { render, screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';
// import LoginForm from '../LoginForm'; // Adjust the import path based on your project structure

// const server = setupServer(
//   rest.post('http://localhost:3001/api/users/login', (req, res, ctx) => {
//     if (req.body.email === 'test@example.com' && req.body.password === 'testpassword') {
//       return res(ctx.json({ token: 'mockToken', userId: 'mockUserId' }));
//     } else {
//       return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
//     }
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe('LoginForm component', () => {
//   test('renders LoginForm component', () => {
//     render(<LoginForm />);
//     // Add relevant assertions
//   });

//   test('initializes with empty email and password fields', () => {
//     render(<LoginForm />);
//     // Add relevant assertions
//   });

//   test('updates email and password fields on input change', () => {
//     render(<LoginForm />);
//     // Add relevant assertions
//   });

//   test('submits form with correct data', async () => {
//     render(<LoginForm />);
//     // Add relevant assertions
//   });

//   test('displays error message on login failure', async () => {
//     render(<LoginForm />);
//     // Add relevant assertions
//   });
// });
