import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetExerciseForm from '../GetExerciseForm';

describe('GetExerciseForm', () => {
  // Test 1: renders ExerciseFormSelect component with proper props
  test('renders ExerciseFormSelect component with proper props', () => {
    const mockSelectSaveFunc = jest.fn();
    const mockSelectedWorkout = {}; // provide a sample workout object
    const mockSavedWorkouts = []; // provide a sample array of saved workouts
    render(
      <GetExerciseForm
        selectedWorkout={mockSelectedWorkout}
        selectSaveFunc={mockSelectSaveFunc}
        savedWorkouts={mockSavedWorkouts}
      />
    );

    expect(screen.getByText('Провести тренировку')).toBeInTheDocument();
    // Add more assertions based on your component's behavior
  });

  // Test 2: renders VisualExerciseForm and Timer components when selectChange is 1
  test('renders VisualExerciseForm and Timer components when selectChange is 1', () => {
    const mockChangeFunc = jest.fn();
    const mockGetFormattedTime = jest.fn();
    const mockStartStopTimer = jest.fn();
    const mockResetTimer = jest.fn();
    const mockSaveStatsFunc = jest.fn();
    render(
      <GetExerciseForm
        selectedWorkout={{}}
        selectSaveFunc={jest.fn()}
        savedWorkouts={[]}
        selectChange={1}
        changeFunc={mockChangeFunc}
        getFormattedTime={mockGetFormattedTime}
        startStopTimer={mockStartStopTimer}
        intervalId={null}
        resetTimer={mockResetTimer}
        saveStatsFunc={mockSaveStatsFunc}
      />
    );

    expect(screen.getByText('Завершить')).toBeInTheDocument();
    // Add more assertions based on your component's behavior
  });

  // Test 3: calls saveStatsFunc when "Завершить" button is clicked
  test('calls saveStatsFunc when "Завершить" button is clicked', () => {
    const mockSaveStatsFunc = jest.fn();
    render(
      <GetExerciseForm
        selectedWorkout={{}}
        selectSaveFunc={jest.fn()}
        savedWorkouts={[]}
        selectChange={1}
        changeFunc={jest.fn()}
        getFormattedTime={jest.fn()}
        startStopTimer={jest.fn()}
        intervalId={null}
        resetTimer={jest.fn()}
        saveStatsFunc={mockSaveStatsFunc}
      />
    );

    fireEvent.click(screen.getByText('Завершить'));
    expect(mockSaveStatsFunc).toHaveBeenCalled();
  });
});
