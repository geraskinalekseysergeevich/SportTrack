// EditExerciseForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditExerciseForm from '../EditExerciseForm';

describe('EditExerciseForm component', () => {
  const selectedWorkout = {
    // Add sample data for selectedWorkout
  };

  const selectSaveFunc = jest.fn();
  const savedWorkouts = [];
  const selectChange = 1;
  const inputChangeFunc = jest.fn();
  const checkboxChangeFunc = jest.fn();
  const saveFunc = jest.fn();
  const deleteFunc = jest.fn();

  beforeEach(() => {
    render(
      <EditExerciseForm
        selectedWorkout={selectedWorkout}
        selectSaveFunc={selectSaveFunc}
        savedWorkouts={savedWorkouts}
        selectChange={selectChange}
        inputChangeFunc={inputChangeFunc}
        checkboxChangeFunc={checkboxChangeFunc}
        saveFunc={saveFunc}
        deleteFunc={deleteFunc}
      />
    );
  });

  test('renders EditExerciseForm component', () => {
    // Replace 'sampleText' with an element or text present in your component
    expect(screen.getByText('sampleText')).toBeInTheDocument();
  });

  test('renders ExerciseFormSelect component with correct props', () => {
    // Check that ExerciseFormSelect component is rendered with correct props
    // Use screen.getByTestId and data-testid attribute on your elements for better testing
    expect(screen.getByTestId('exercise-form-select')).toHaveAttribute('titleText', 'Редактировать тренировку');
  });

  test('renders VisualExerciseForm and ExerciseFormButtons when selectChange is 1', () => {
    // Check that VisualExerciseForm and ExerciseFormButtons are rendered when selectChange is 1
    expect(screen.getByTestId('visual-exercise-form')).toBeInTheDocument();
    expect(screen.getByTestId('exercise-form-buttons')).toBeInTheDocument();
  });

  test('calls inputChangeFunc on VisualExerciseForm change', () => {
    // Trigger a change event on the VisualExerciseForm and check if inputChangeFunc is called
    fireEvent.change(screen.getByTestId('visual-exercise-form-input'), { target: { value: 'newValue' } });
    expect(inputChangeFunc).toHaveBeenCalledWith('newValue');
  });

  test('calls checkboxChangeFunc on VisualExerciseForm checkbox change', () => {
    // Trigger a change event on the VisualExerciseForm checkbox and check if checkboxChangeFunc is called
    fireEvent.change(screen.getByTestId('visual-exercise-form-checkbox'), { target: { checked: true } });
    expect(checkboxChangeFunc).toHaveBeenCalledWith(true);
  });

  test('calls saveFunc on ExerciseFormButtons save click', () => {
    // Trigger a click event on the save button and check if saveFunc is called
    fireEvent.click(screen.getByTestId('exercise-form-save-button'));
    expect(saveFunc).toHaveBeenCalled();
  });

  test('calls deleteFunc on ExerciseFormButtons remove click', () => {
    // Trigger a click event on the remove button and check if deleteFunc is called
    fireEvent.click(screen.getByTestId('exercise-form-remove-button'));
    expect(deleteFunc).toHaveBeenCalled();
  });
});
