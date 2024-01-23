import React, { useEffect } from 'react';
import classes from '../UI/AddExerciseForm.module.css';
import VisualExerciseForm from './VisualExerciseForm';
import ExerciseFormButtons from './ExerciseFormButtons';

const AddExerciseForm = ({exerciseData, changeFunc, changeCheckboxFunc, saveFunc, resetFunc}) => {
    
    useEffect(() => {
        resetFunc()
    }, [])

    return (
        <div className={classes.addexercise__container}>
            <h1>Добавить свободную тренировку:</h1>
            <VisualExerciseForm
                changeFunc={changeFunc}
                data={exerciseData}
                changeCheckboxFunc={changeCheckboxFunc}
            />
            <ExerciseFormButtons
                saveFunc={saveFunc}
                removeFunc={resetFunc}
                innerText={'Очистить'}
            />
        </div>
    );
};

export default AddExerciseForm;