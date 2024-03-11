// // MealItem.test.js

// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import MealItem from '../MealItem';

// describe('MealItem component', () => {
//   // Sample meal item data
//   const mockModel = {
//     name: 'Test Meal',
//     weight: 200,
//     calories: 300,
//     protein: 20,
//     fat: 10,
//     carbs: 30,
//     isTotal: false,
//   };

//   // Mock functions for onEditItem and onRemoveItem
//   const mockOnEditItem = jest.fn();
//   const mockOnRemoveItem = jest.fn();

//   // Render the MealItem component with mock data and functions
//   beforeEach(() => {
//     render(
//       <MealItem
//         model={mockModel}
//         onEditItem={mockOnEditItem}
//         onRemoveItem={mockOnRemoveItem}
//       />
//     );
//   });

//   // Test 1: renders meal item details correctly
//   it('renders meal item details correctly', () => {
//     // Check if meal item details are rendered correctly
//     expect(screen.getByText('Test Meal')).toBeInTheDocument();
//     expect(screen.getByText('/Масса нетто:/')).toHaveTextContent('200г.');
//     expect(screen.getByText('Калорийность:')).toHaveTextContent('60ккал'); // Replace with the expected value based on your calculations
//     expect(screen.getByText('Б:')).toHaveTextContent('20г.,');
//     expect(screen.getByText('Ж:')).toHaveTextContent('10г.,');
//     expect(screen.getByText('У:')).toHaveTextContent('30г.');
//   });

//   // Test 2: calls onEditItem when "Изменить" button is clicked
//   it('calls onEditItem when "Изменить" button is clicked', () => {
//     // Click on the "Изменить" button
//     fireEvent.click(screen.getByText('Изменить'));

//     // Check if onEditItem is called with the correct argument
//     expect(mockOnEditItem).toHaveBeenCalledWith(mockModel);
//   });

//   // Test 3: calls onRemoveItem when "Удалить" button is clicked
//   it('calls onRemoveItem when "Удалить" button is clicked', () => {
//     // Click on the "Удалить" button
//     fireEvent.click(screen.getByText('Удалить'));

//     // Check if onRemoveItem is called with the correct argument
//     expect(mockOnRemoveItem).toHaveBeenCalledWith(mockModel);
//   });
// });
