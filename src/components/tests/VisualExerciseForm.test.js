// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import VisualExerciseForm from '../VisualExerciseForm';

// describe('VisualExerciseForm', () => {
//   const data = {
//     name: 'Test Name',
//     category: 'Test Category',
//     location: 'Test Location',
//     mood: 'хорошее',
//     comment: 'Test Comment',
//   };

//   it('renders VisualExerciseForm correctly', () => {
//     const { getByLabelText, getByPlaceholderText } = render(
//       <VisualExerciseForm data={data} />
//     );

//     // Check if the input fields are rendered with the correct values
//     expect(getByLabelText(/Название упражнения:/i)).toHaveValue('Test Name');
//     expect(getByLabelText(/Категория:/i)).toHaveValue('Test Category');
//     expect(getByLabelText(/Место:/i)).toHaveValue('Test Location');
//     expect(getByLabelText(/Самочувствие:/i)).toHaveValue('хорошее');
//     expect(getByLabelText(/Комментарий:/i)).toHaveValue('Test Comment');

//     // Check if the placeholders are rendered correctly
//     expect(getByPlaceholderText(/Введите название тренировки/i)).toBeInTheDocument();
//     expect(getByPlaceholderText(/Введите название категории/i)).toBeInTheDocument();
//     expect(getByPlaceholderText(/Введите место тренировки/i)).toBeInTheDocument();
//     expect(getByPlaceholderText(/Введите комментарий/i)).toBeInTheDocument();
//   });

//   it('triggers changeFunc when input values change', () => {
//     const changeFuncMock = jest.fn();
//     const { getByLabelText } = render(
//       <VisualExerciseForm data={data} changeFunc={changeFuncMock} />
//     );

//     // Trigger change event on input fields
//     fireEvent.change(getByLabelText(/Название упражнения:/i).closest('input'), { target: { value: 'New Name' } });
//     fireEvent.change(getByLabelText(/Категория:/i).closest('input'), { target: { value: 'New Category' } });
//     fireEvent.change(getByLabelText(/Место:/i).closest('input'), { target: { value: 'New Location' } });

//     // Check if changeFunc is called with the correct arguments
//     expect(changeFuncMock).toHaveBeenCalledTimes(3);
//   });

//   // Add more tests for changeCheckboxFunc and disabledState if needed
// });
