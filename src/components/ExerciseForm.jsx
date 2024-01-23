import React, { useEffect, useState } from 'react';
import classes from '../UI/ExerciseForm.module.css';
import AddExerciseForm from '../components/AddExerciseForm';
import SelectExerciseForm from './SelectExerciseForm';
import ActivityExerciseButton from './ActivityExerciseButton';

function ExerciseForm() {
    const [activeTab, setActiveTab] = useState('default');
    const [exerciseData, setExerciseData] = useState({});
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState({})
    const [selectChange, setSelectChange] = useState(0)
    const [preEditName, setPreEditName] = useState(undefined)
    const [error, setError] = useState(0)

    const resetExercise = () => {
        setExerciseData({
            name: '',
            category: '',
            repetitions: '',
            sets: '',
            weight: '',
            location: '',
            mood: '',
            comment: '',
            time: '',
            timecreated: ''
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExerciseData({ ...exerciseData, [name]: value });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setSelectedWorkout({ ...selectedWorkout, [name]: value })
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setExerciseData({ ...exerciseData, [name]: checked ? 1 : '' });
    };

    const handleEditCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedWorkout({ ...selectedWorkout, [name]: checked ? 1 : '' })
    }

    const saveEdits = () => {
        setSavedWorkouts((prevState) => {
            const updatedState = {}
            for (const [key, value] of Object.entries(prevState)) {
                updatedState[key === preEditName ? selectedWorkout.name : key] = 
                    key === preEditName 
                        ? { ...value, ...selectedWorkout, time: getFormattedTime(timer) } 
                        : value;
            }

            console.log('resaved workouts', updatedState)
            return updatedState
        })

        setSelectChange(0)
        setActiveTab('default')
        stopTimer()
        resetTimer()
        setPreEditName(undefined)
        setSelectedWorkout({})
    }

    const tryToEdit = (saveEdits) => {
        return () => {
            if (selectedWorkout.name === undefined || exerciseData.name === '') {
                setError(1)
                console.log('пустое имя')
            } else {
                saveEdits()
                setError(0)
            }
        }
    }

    const tryToSaveEdits = tryToEdit(saveEdits)

    const startStopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            const startTime = Date.now() - timer;
            const id = setInterval(() => {
                const newTimer = Date.now() - startTime
                setTimer(newTimer)
            }, 10);
            setIntervalId(id);
        }
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    const resetTimer = () => {
        stopTimer();
        setTimer(0)
    };

    const saveExercise = () => {
        const currentdate = new Date();
        const datetime =
            currentdate.getDate() +
            '/' +
            (currentdate.getMonth() + 1) +
            '/' +
            currentdate.getFullYear() +
            ' @ ' +
            currentdate.getHours() +
            ':' +
            currentdate.getMinutes() +
            ':' +
            currentdate.getSeconds();

        exerciseData.timecreated = datetime;

        setActiveTab('default');

        if (Object.keys(savedWorkouts).length === 0) {
            setSavedWorkouts(() => {
                const updatedState = {[exerciseData.name]: exerciseData}
                console.log('saved 1 workouts', updatedState)
                return updatedState
            })
        } else {
            setSavedWorkouts(prevState => {
                const updatedState = {...prevState, [exerciseData.name]: exerciseData}
                console.log('saved 2 workouts', updatedState)
                return updatedState
            })
        }
        resetExercise()

        console.log('Упражнение успешно сохранено!');
        // Замените URL и настройки на соответствующие вашему API и его требованиям
    };

    const tryToSave = (saveExercise) => {
        return () => {
            if (exerciseData.name === undefined || exerciseData.name === '') {
                setError(1)
                console.log('пустое имя')
            } else if (exerciseData.name in savedWorkouts) {
                setError(2)
                console.log('такое имя уже существует')
            } else {
                setError(0)
                saveExercise()
            }
        }
    }
    const tryToSaveExercise = tryToSave(saveExercise)

    const deleteWorkout = () => {
        const updatedWorkouts = { ...savedWorkouts }
        delete updatedWorkouts[exerciseData.name]
        setSavedWorkouts(updatedWorkouts);
        console.log('Упражнение успешно удалено!');
        console.log('update', updatedWorkouts)
        resetExercise()
        resetTimer()
        stopTimer()
        setActiveTab('default')
        setSelectChange(0)
        setSelectedWorkout({})
    };

    const getFormattedTime = () => {
        const milliseconds = timer % 1000;
        const seconds = Math.floor((timer / 1000) % 60);
        const minutes = Math.floor((timer / (1000 * 60)) % 60);

        return `${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
        }:${
            milliseconds < 100
                ? `0${Math.floor(milliseconds / 10)}`
                : Math.floor(milliseconds / 10)
        }`;
    };

    const handleSelectSaved = (workoutName) => {
        if (workoutName !== '') {
            setSelectedWorkout(savedWorkouts[workoutName])
            setPreEditName(workoutName)
            setSelectChange(1)
        }
    };

    useEffect(() => {
        if (selectedWorkout) {
            setExerciseData(selectedWorkout);
        }
    }, [selectedWorkout])

    return (
        <div className={classes.exerciseform__container}>
            <div className={classes.page_header}>
                <h1>Добавить упражнение</h1>
                <img src={require('../sources/avatar.png')} alt="" />
            </div>
            <div className={classes.forms__container}>
                {activeTab === 'addExercise'
                    ? <AddExerciseForm
                        exerciseData={exerciseData}
                        changeFunc={handleInputChange}
                        changeCheckboxFunc={handleCheckboxChange}
                        saveFunc={tryToSaveExercise}
                        resetFunc={resetExercise}
                    />
                    : <ActivityExerciseButton 
                        setActiveTabFunc={setActiveTab}
                        activeTab={'addExercise'}
                        innerText={'Добавить свободную тренировку'}
                    />
                }
                {activeTab === 'selectSaved' 
                    ? <SelectExerciseForm
                        selectedWorkout={selectedWorkout}
                        selectSaveFunc={handleSelectSaved}
                        savedWorkouts={savedWorkouts}
                        selectChange={selectChange}
                        inputChangeFunc={handleEditChange}
                        checkboxChangeFunc={handleEditCheckboxChange}
                        saveFunc={tryToSaveEdits}
                        deleteFunc={deleteWorkout}
                        test={exerciseData}
                        getFormattedTime={getFormattedTime}
                        startStopTimer={startStopTimer}
                        intervalId={intervalId}
                        resetTimer={resetTimer}
                    />
                    : <ActivityExerciseButton
                        setActiveTabFunc={setActiveTab}
                        activeTab={'selectSaved'}
                        innerText={'Выбрать сохраненную тренировку'}    
                    />
                }
            </div>
        </div>
    );
}

export default ExerciseForm;
