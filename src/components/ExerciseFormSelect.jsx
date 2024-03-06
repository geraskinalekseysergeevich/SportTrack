import React from 'react';
import classes from '../UI/ExerciseFormSelect.module.css';

const ExerciseFormSelect = ({ titleText, selectedWorkout, selectSaveFunc, savedWorkouts }) => {
    return (
        <div className={classes.select__container}>
            <h2>{titleText}</h2>
            <select
                name="selectSaved"
                defaultValue={selectedWorkout.name}
                onChange={(e) => selectSaveFunc(e.target.value)}
            >
                <option value="">
                    Выберите сохраненную тренировку
                </option>
                {Object.keys(savedWorkouts).map((workoutName) => (
                    <option
                        key={workoutName}
                        value={workoutName}
                    >
                        {`${workoutName}${savedWorkouts[workoutName]['category'] ? `, ${savedWorkouts[workoutName]['category']}` : ''}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ExerciseFormSelect;