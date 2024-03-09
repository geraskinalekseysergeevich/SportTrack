import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GetExerciseForm from '../GetExerciseForm';

// Mock your dependencies or provide necessary props for testing

describe('GetExerciseForm', () => {
  it('renders ExerciseFormSelect component with proper props', () => {
    const mockSelectSaveFunc = jest.fn();
    const mockSelectedWorkout = {}; // provide a sample workout object
    const mockSavedWorkouts = []; // provide a sample array of saved workouts
    const { getByText } = render(
      <GetExerciseForm
        selectedWorkout={mockSelectedWorkout}
        selectSaveFunc={mockSelectSaveFunc}
        savedWorkouts={mockSavedWorkouts}
      />
    );

    expect(getByText('Провести тренировку')).toBeInTheDocument();
    // Add more assertions based on your component's behavior
  });

  it('renders VisualExerciseForm and Timer components when selectChange is 1', () => {
    const mockChangeFunc = jest.fn();
    const mockGetFormattedTime = jest.fn();
    const mockStartStopTimer = jest.fn();
    const mockResetTimer = jest.fn();
    const mockSaveStatsFunc = jest.fn();
    const { getByText } = render(
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

    expect(getByText('Завершить')).toBeInTheDocument();
    // Add more assertions based on your component's behavior
  });

  it('calls saveStatsFunc when "Завершить" button is clicked', () => {
    const mockSaveStatsFunc = jest.fn();
    const { getByText } = render(
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

    fireEvent.click(getByText('Завершить'));
    expect(mockSaveStatsFunc).toHaveBeenCalled();
  });
});
