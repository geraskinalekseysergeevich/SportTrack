// Test 1: renders EditExerciseForm component
// Description: Checks if the EditExerciseForm component is rendered.
// Assertion: expect(screen.getByText('sampleText')).toBeInTheDocument();
test('renders EditExerciseForm component', () => {
  // Replace 'sampleText' with an element or text present in your component
  expect(screen.getByText('sampleText')).toBeInTheDocument();
});

// Test 2: renders ExerciseFormSelect component with correct props
// Description: Checks if the ExerciseFormSelect component is rendered with the correct props.
// Assertion: expect(screen.getByTestId('exercise-form-select')).toHaveAttribute('titleText', 'Редактировать тренировку');
test('renders ExerciseFormSelect component with correct props', () => {
  // Check that ExerciseFormSelect component is rendered with correct props
  // Use screen.getByTestId and data-testid attribute on your elements for better testing
  expect(screen.getByTestId('exercise-form-select')).toHaveAttribute('titleText', 'Редактировать тренировку');
});

// Test 3: renders VisualExerciseForm and ExerciseFormButtons when selectChange is 1
// Description: Verifies that the VisualExerciseForm and ExerciseFormButtons components are rendered when selectChange is equal to 1.
// Assertions: expect(screen.getByTestId('visual-exercise-form')).toBeInTheDocument();
//             expect(screen.getByTestId('exercise-form-buttons')).toBeInTheDocument();
test('renders VisualExerciseForm and ExerciseFormButtons when selectChange is 1', () => {
  // Check that VisualExerciseForm and ExerciseFormButtons are rendered when selectChange is 1
  expect(screen.getByTestId('visual-exercise-form')).toBeInTheDocument();
  expect(screen.getByTestId('exercise-form-buttons')).toBeInTheDocument();
});

// Test 4: calls inputChangeFunc on VisualExerciseForm change
// Description: Tests if the inputChangeFunc function is called when a change event occurs on the VisualExerciseForm input.
// Action: fireEvent.change(screen.getByTestId('visual-exercise-form-input'), { target: { value: 'newValue' } });
// Assertion: expect(inputChangeFunc).toHaveBeenCalledWith('newValue');
test('calls inputChangeFunc on VisualExerciseForm change', () => {
  // Trigger a change event on the VisualExerciseForm and check if inputChangeFunc is called
  fireEvent.change(screen.getByTestId('visual-exercise-form-input'), { target: { value: 'newValue' } });
  expect(inputChangeFunc).toHaveBeenCalledWith('newValue');
});

// Test 5: calls checkboxChangeFunc on VisualExerciseForm checkbox change
// Description: Ensures that the checkboxChangeFunc function is called when a change event occurs on the VisualExerciseForm checkbox.
// Action: fireEvent.change(screen.getByTestId('visual-exercise-form-checkbox'), { target: { checked: true } });
// Assertion: expect(checkboxChangeFunc).toHaveBeenCalledWith(true);
test('calls checkboxChangeFunc on VisualExerciseForm checkbox change', () => {
  // Trigger a change event on the VisualExerciseForm checkbox and check if checkboxChangeFunc is called
  fireEvent.change(screen.getByTestId('visual-exercise-form-checkbox'), { target: { checked: true } });
  expect(checkboxChangeFunc).toHaveBeenCalledWith(true);
});

// Test 6: calls saveFunc on ExerciseFormButtons save click
// Description: Checks if the saveFunc function is called when a click event occurs on the save button of ExerciseFormButtons.
// Action: fireEvent.click(screen.getByTestId('exercise-form-save-button'));
// Assertion: expect(saveFunc).toHaveBeenCalled();
test('calls saveFunc on ExerciseFormButtons save click', () => {
  // Trigger a click event on the save button and check if saveFunc is called
  fireEvent.click(screen.getByTestId('exercise-form-save-button'));
  expect(saveFunc).toHaveBeenCalled();
});

// Test 7: calls deleteFunc on ExerciseFormButtons remove click
// Description: Validates that the deleteFunc function is called when a click event occurs on the remove button of ExerciseFormButtons.
// Action: fireEvent.click(screen.getByTestId('exercise-form-remove-button'));
// Assertion: expect(deleteFunc).toHaveBeenCalled();
test('calls deleteFunc on ExerciseFormButtons remove click', () => {
  // Trigger a click event on the remove button and check if deleteFunc is called
  fireEvent.click(screen.getByTestId('exercise-form-remove-button'));
  expect(deleteFunc).toHaveBeenCalled();
});
