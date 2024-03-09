// import React from 'react';
// import { render } from '@testing-library/react';
// import AppRouter from '../AppRouter'; // Update the import path accordingly

// jest.mock('react', () => {
//   const ActualReact = jest.requireActual('react');
//   return {
//     ...ActualReact,
//     jsxDEV: ActualReact.createElement,
//   };
// });

// jest.mock('../../router', () => ({
//   privateRoutes: [
//     { path: '/private-route-1', element: <div>Private Route 1</div> },
//     { path: '/private-route-2', element: <div>Private Route 2</div> },
//   ],
//   publicRoutes: [
//     { path: '/public-route-1', element: <div>Public Route 1</div> },
//     { path: '/public-route-2', element: <div>Public Route 2</div> },
//   ],
// }));

// describe('AppRouter Component', () => {
//   it('renders private routes when authenticated', () => {
//     const { getByText } = render(<AppRouter />);

//     expect(getByText('Private Route 1')).toBeInTheDocument();
//     expect(() => getByText('Public Route 1')).toThrow();
//   });

//   it('renders public routes when not authenticated', () => {
//     jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]);

//     const { getByText } = render(<AppRouter />);

//     expect(getByText('Public Route 1')).toBeInTheDocument();
//     expect(() => getByText('Private Route 1')).toThrow();
//   });
// });
