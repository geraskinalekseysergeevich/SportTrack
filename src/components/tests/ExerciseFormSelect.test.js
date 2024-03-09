import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import ExerciseFormSelect from '../ExerciseFormSelect';

describe('ExerciseFormSelect', () => {
  const savedWorkouts = {
    workout1: { category: 'Category1' },
    workout2: { category: 'Category2' },
    // Add more sample data as needed
  };

  const renderComponent = (props) => render(<ExerciseFormSelect savedWorkouts={savedWorkouts} {...props} />);

  test('renders ExerciseFormSelect with title', () => {
    renderComponent({ titleText: 'Test Title', selectedWorkout: { name: '' }, selectSaveFunc: jest.fn() });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders select options correctly', () => {
    renderComponent({ titleText: 'Test Title', selectedWorkout: { name: '' }, selectSaveFunc: jest.fn() });

    expect(screen.getByText('Выберите сохраненную тренировку')).toBeInTheDocument();

    Object.keys(savedWorkouts).forEach((workoutName) => {
      const optionText = `${workoutName}${savedWorkouts[workoutName]['category'] ? `, ${savedWorkouts[workoutName]['category']}` : ''}`;
      expect(screen.getByText(optionText)).toBeInTheDocument();
    });
  });

  test('calls selectSaveFunc on change', () => {
    const selectSaveFunc = jest.fn();
    renderComponent({ titleText: 'Test Title', selectedWorkout: { name: '' }, selectSaveFunc });

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'workout1' } });

    expect(selectSaveFunc).toHaveBeenCalledWith('workout1');
  });

  test('selects default value based on selectedWorkout prop', () => {
    renderComponent({ titleText: 'Test Title', selectedWorkout: { name: 'workout2' }, selectSaveFunc: jest.fn() });

    expect(screen.getByRole('combobox')).toHaveValue('workout2');
  });

  // Additional test for mapping saved workouts to options
  test('maps saved workouts to option elements', () => {
    renderComponent({ titleText: 'Test Title', selectedWorkout: { name: '' }, selectSaveFunc: jest.fn() });

    Object.keys(savedWorkouts).forEach((workoutName) => {
      const option = screen.getByText(`${workoutName}${savedWorkouts[workoutName]['category'] ? `, ${savedWorkouts[workoutName]['category']}` : ''}`);
      expect(option).toBeInTheDocument();
      expect(option).toHaveValue(workoutName);
    });
  });


  test('renders workout name with or without category based on savedWorkouts', () => {
    renderComponent({ titleText: 'Test Title', selectedWorkout: { name: '' }, selectSaveFunc: jest.fn() });
  
    // Test for a workout with a category
    const workoutWithCategory = screen.getByText(/workout1/);
    expect(workoutWithCategory).toBeInTheDocument();
    expect(workoutWithCategory.textContent).toContain('workout1, Category1');
  
    // Test for a workout without a category
    const workoutWithoutCategory = screen.getByText(/workout2/);
    expect(workoutWithoutCategory).toBeInTheDocument();
    expect(workoutWithoutCategory.textContent).toContain('workout2');
  });

});
