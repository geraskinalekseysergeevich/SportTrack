import React from 'react';
import classes from '../UI/GetExerciseForm.module.css';
import Timer from './Timer';
import VisualExerciseForm from './VisualExerciseForm';
import ExerciseFormSelect from './ExerciseFormSelect';

const GetExerciseForm = ({
    selectedWorkout, selectSaveFunc, savedWorkouts, selectChange, changeFunc,
    getFormattedTime, startStopTimer, intervalId, resetTimer,
    saveStatsFunc
}) => {
    return (
        <div className={classes.getsaved__container}>
            <ExerciseFormSelect
                titleText={'Провести тренировку'}
                selectedWorkout={selectedWorkout}
                selectSaveFunc={selectSaveFunc}
                savedWorkouts={savedWorkouts}
            />
            {selectChange === 1 &&
                <div>
                    <div className={classes.changeform__container}>
                        <VisualExerciseForm
                            data={selectedWorkout}
                            changeFunc={changeFunc}
                            disabledState={true}
                        />
                    </div>
                    <div className={classes.getform_timer}>
                        <Timer
                            formatTimeFunc={getFormattedTime}
                            startStopFunc={startStopTimer}
                            intervalId={intervalId}
                            resetFunc={resetTimer}
                        />
                    </div>
                    <div className={classes.footer_button}>
                        <button onClick={saveStatsFunc}>Завершить</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default GetExerciseForm;