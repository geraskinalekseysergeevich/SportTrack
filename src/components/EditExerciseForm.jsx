import React from 'react';
import classes from '../UI/EditExerciseForm.module.css';
import VisualExerciseForm from './VisualExerciseForm';
import ExerciseFormButtons from './ExerciseFormButtons';
import ExerciseFormSelect from './ExerciseFormSelect';

const EditExerciseForm = ({selectedWorkout, selectSaveFunc, savedWorkouts, 
    selectChange, inputChangeFunc, checkboxChangeFunc, saveFunc, deleteFunc }) => {

    return (
        <div className={classes.editsaved__container}>
            <ExerciseFormSelect
                titleText={'Редактировать тренировку'}
                selectedWorkout={selectedWorkout}
                selectSaveFunc={selectSaveFunc}
                savedWorkouts={savedWorkouts}
            />
            {selectChange === 1 &&
                <div className={classes.changeform__container}>
                    <VisualExerciseForm
                        changeFunc={inputChangeFunc}
                        data={selectedWorkout}
                        changeCheckboxFunc={checkboxChangeFunc}
                    />
                    <ExerciseFormButtons
                        saveFunc={saveFunc}
                        removeFunc={deleteFunc}
                        innerText={'Удалить'}
                    />
                </div>
            }
        </div>
    );
};

export default EditExerciseForm;