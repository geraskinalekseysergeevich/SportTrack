import React from 'react';
import classes from '../UI/ExerciseError.module.css';

const ExerciseError = ({error}) => {

    const getErrorText = () => {
        let errorText = ''

        if (error === 1) { errorText = 'Пустое название тренировки' }
        else if (error === 2) { errorText = 'Тренировка с таким названием уже существует' }
        
        return errorText
    }
    
    return (
        <div className={classes.error__container}>
            <h1>{getErrorText()}</h1>
        </div>
    );
};

export default ExerciseError;