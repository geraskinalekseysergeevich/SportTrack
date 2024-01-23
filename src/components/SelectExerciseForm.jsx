import React from 'react';
import classes from '../UI/SelectExerciseForm.module.css';
import VisualExerciseForm from './VisualExerciseForm';
import ExerciseFormButtons from './ExerciseFormButtons';
import Timer from './Timer';

const SelectExerciseForm = ({selectedWorkout, selectSaveFunc, savedWorkouts, 
    selectChange, inputChangeFunc, checkboxChangeFunc, saveFunc, deleteFunc,
    getFormattedTime, startStopTimer, intervalId, resetTimer }) => {

    
    return (
        <div className={classes.selectsaved__conatiner}>
            <h1>Выбрать сохраненную тренировку</h1>
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
                    <div className={classes.changeform_timer}>
                        <Timer
                            formatTimeFunc={getFormattedTime}
                            startStopFunc={startStopTimer}
                            intervalId={intervalId}
                            resetFunc={resetTimer}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default SelectExerciseForm;