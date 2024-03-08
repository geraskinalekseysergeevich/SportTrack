import React, { useEffect, useState } from 'react';
import classes from '../UI/ExerciseForm.module.css';
import AddExerciseForm from '../components/AddExerciseForm';
import EditExerciseForm from './EditExerciseForm';
import ActivityExerciseButton from './ActivityExerciseButton';
import GetExerciseForm from './GetExerciseForm';
import ExerciseError from './ExerciseError';
import TabBar from './TabBar';
import { useNavigate } from 'react-router-dom';

function ExerciseForm({userId}) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('default');

    const [exerciseData, setExerciseData] = useState({});
    const [savedWorkouts, setSavedWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState({});
    const [savedStats, setSavedStats] = useState([])

    const [selectChange, setSelectChange] = useState(0)
    const [error, setError] = useState(0);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    // при загрузке страницы загружаем пресеты пользователя и локально сохраняем их в savedWorkouts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`)
                const data = await response.json()

                const exerciseData = {};
                data.presets.map(preset => {
                    const presetObject = {
                        ...preset,
                        _id: preset._id
                    };
                    exerciseData[presetObject.name] = presetObject;
                });
                
                setSavedWorkouts(exerciseData)
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user information')
                }

            } catch (error) {
                console.error('Error fetching user information:', error)
            }
        }

        fetchUserData()
    }, [userId])
    
    // нужно для очистки всех инпутов
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
            timecreated: '',
            _id: ''
        })
    }

    // нужно для отображения трех форм по нажатию
    const changeTab = (tab) => {
        setActiveTab(`${tab}`)
        setSelectChange(0)
        setSelectedWorkout({})
        setError(0)
    }
    
    // отслеживание изменений в инпутах
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExerciseData({ ...exerciseData, [name]: value });
    };

    // отслеживание редактирования в инпутах
    const handleEditChange = (e) => {
        const { name, value } = e.target
        setSelectedWorkout({ ...selectedWorkout, [name]: value })
    }

    // отслеживание изменений в чекбоксах
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setExerciseData({ ...exerciseData, [name]: checked ? 1 : '' });
    };

    // отслеживание редактирования в чекбоксах
    const handleEditCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedWorkout({ ...selectedWorkout, [name]: checked ? 1 : '' })
    }

    const updateUserPresetInDb = async (userId, presetId, updatedPreset) => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/updateUserPreset`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, presetId, updatedPreset })
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при обновлении данных');
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
        }
    };

    // сохранение изменений
    const saveEdits = () => {
        setSavedWorkouts(prevState => {
            const updatedState = {};
            // Копируем все данные из предыдущего состояния, кроме того, что нужно обновить
            for (const [name, workout] of Object.entries(prevState)) {
                if (workout._id === selectedWorkout._id) {
                    // Если это тот элемент, который нужно обновить, добавляем обновленные данные в новый объект по имени
                    updatedState[selectedWorkout.name] = { ...workout, ...selectedWorkout };
                } else {
                    updatedState[name] = workout;
                }
            }
            
            updateUserPresetInDb(userId, selectedWorkout._id, selectedWorkout);
            return updatedState;
        });

        setSelectChange(0)
        setActiveTab('default')
        setSelectedWorkout({})
    }
    
    // обработчик ошибок для saveEdits
    const tryToEdit = (saveEdits) => {
        return () => {
            if (selectedWorkout.name === undefined || exerciseData.name === '') {
                // пустое название
                setError(1)
            } else {
                saveEdits()
                setError(0)
            }
        }
    }
    const tryToSaveEdits = tryToEdit(saveEdits)

    // логика таймера
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

    // форматирование даты год-месяц-день
    const dayToday = () => {
        var currentdate = new Date();
        if(currentdate.getMonth()+ 1 < 10){
        var datetime =
            currentdate.getFullYear() +
            '-0' +
            (currentdate.getMonth() + 1) +
            '-' +
            currentdate.getDate();
        } else datetime =
        currentdate.getFullYear() +
        '-' +
        (currentdate.getMonth() + 1) +
        '-' +
        currentdate.getDate();
        return datetime;
    }

    // получение текущей даты
    const getCurrentDatetime = () => {
        const currentdate = new Date();
        const datetime =
            currentdate.getHours() +
            ':' +
            currentdate.getMinutes() +
            ':' +
            currentdate.getSeconds();
        return datetime
    }

    // постим новый пресет в бд
    const saveNewPresetInDb = async () => {
        const newPreset = {
            timecreated: exerciseData.timecreated,
            name: exerciseData.name,
            location: exerciseData.location,
            mood: exerciseData.mood,
            comment: exerciseData.comment,
            category: exerciseData.category,
            repetitions: exerciseData.repetitions,
            weight: exerciseData.weight,
            sets: exerciseData.sets
        }

        try {
            const response = await fetch(`http://localhost:3001/api/users/saveUserPreset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, newPreset })
            })

            if (!response.ok) {
                throw new Error('Ошибка при обновлении данных')
            }

            const data = await response.json()
            const newPresetId = data.createdPresetId

            setSavedWorkouts(prevState => {
                const updatedState = {
                    ...prevState,
                    [newPreset.name]: {
                        ...newPreset,
                        _id: newPresetId
                    }
                };
                return updatedState;
            });
        }
        catch(error) {
            console.log('Ошибка при обновлении данных:', error)
        }

    }

    // сохранение пресета
    const saveExercise = async () => {
        const dateTime = getCurrentDatetime()
        // сохраняем
        exerciseData.timecreated = dateTime;
        setActiveTab('default');
        
        try {
            await saveNewPresetInDb()
            
            // сбрасываем все инпуты
            resetExercise()
        } catch (error) {
            console.error('Ошибка при сохранении пресета:', error)
        }
    };

    // обработчик ошибок для saveExercise
    const tryToSave = (saveExercise) => {
        return () => {
            // проверка на пустое имя
            if (exerciseData.name === undefined || exerciseData.name === '') {
                setError(1)
            } 
            // проверка на существующее имя
            else if (exerciseData.name in savedWorkouts) {
                setError(2)
            } else {
                setError(0)
                saveExercise()
            }
        }
    }
    const tryToSaveExercise = tryToSave(saveExercise)

    // удаление пресета из бд
    const deletePresetFromDb = async (userId, presetId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/users/deleteUserPreset`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, presetId })
            })

            if (!response.ok) {
                throw new Error('Ошибка при удалении данных')
            }
        }
        catch(error) {
            console.log('Ошибка при удалении данных:', error)
        }

    }

    // удаление пресета
    const deleteWorkout = () => {
        const updatedWorkouts = { ...savedWorkouts }
        deletePresetFromDb(userId, exerciseData._id)
        delete updatedWorkouts[exerciseData.name]
        
        setSavedWorkouts(updatedWorkouts)
        resetExercise()
        resetTimer()
        stopTimer()
        setActiveTab('default')
        setSelectChange(0)
        setSelectedWorkout({})
    };

    // форматирование времени
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
    }

    // нужно для отображения корректного пресета в формах edit и get
    const handleSelectSaved = (workoutName) => {
        if (workoutName !== '') {
            setSelectedWorkout(savedWorkouts[workoutName])
            setSelectChange(1)
        }
    };

    // отправка на сервер тренировки для статистики
    async function postWorkoutStats (statsToPost) {
        try {   
            var name = statsToPost.name;
            var time = statsToPost.time;
            var location = statsToPost.location;
            var mood = statsToPost.mood;
            var comment = statsToPost.comment;
            var date = statsToPost.date;
            var timecreated = statsToPost.timecreated;
            
            var exercises = ["date:'"+date+"'", "time:'"+time+"'", "timecreated:'"+timecreated+"'", "name:'"+name+"'",
                "location:'"+location+"'", "mood:'"+mood+"'", "comment:'"+comment+"'"];

            const response = await fetch('http://localhost:3001/api/users/saveUserExercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId, exercises}),
            });
        
            if (response.ok) {
                const { token, userId } = await response.json();
            }
        } catch (error) {
            console.error('Log error:', error);
        }
    }

    // сохранение статистики
    const saveStatsFunc = () => {
        const dateTime = getCurrentDatetime()
        const newSavedStats = savedStats
        const statsToPost = {
            name: selectedWorkout.name,
            time: getFormattedTime(timer),
            date: dayToday(),
            timecreated: dateTime,
            location: selectedWorkout.location,
            mood: selectedWorkout.mood,
            comment: selectedWorkout.comment
        }
        postWorkoutStats(statsToPost)
        newSavedStats.push({
            name: selectedWorkout.name,
            time: getFormattedTime(timer),
            timecreated: dateTime,
            location: selectedWorkout.location,
            mood: selectedWorkout.mood,
            comment: selectedWorkout.comment
        })
        
        setSavedStats(newSavedStats)
        setSelectChange(0)
        setActiveTab('default')
        stopTimer()
        resetTimer()
    }

    // нужно для вывода выбранной тренировки в форму редактирования
    useEffect(() => {
        if (selectedWorkout) {
            setExerciseData(selectedWorkout);
        }
    }, [selectedWorkout])

    return (
        <>
        <div className={classes.exerciseform__section}>
        <div className={classes.exerciseform__container}>
            <div className={classes.page_header}>
                <h1>Добавить упражнение</h1>
                <img src={require('../sources/avatar.png')} alt="" onClick={() => navigate('/profile', { state: { userId } })}/>

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
                        setActiveTabFunc={changeTab}
                        activeTab={'addExercise'}
                        innerText={'Добавить свободную тренировку'}
                    />
                }
                {activeTab === 'editSaved' 
                    ? <EditExerciseForm
                        selectedWorkout={selectedWorkout}
                        selectSaveFunc={handleSelectSaved}
                        savedWorkouts={savedWorkouts}
                        selectChange={selectChange}
                        inputChangeFunc={handleEditChange}
                        checkboxChangeFunc={handleEditCheckboxChange}
                        saveFunc={tryToSaveEdits}
                        deleteFunc={deleteWorkout}
                    />
                    : <ActivityExerciseButton
                        setActiveTabFunc={changeTab}
                        activeTab={'editSaved'}
                        innerText={'Редактировать тренировку'}
                    />
                }
                {activeTab === 'getSaved'
                    ? <GetExerciseForm
                        selectedWorkout = {selectedWorkout}
                        selectSaveFunc ={handleSelectSaved}
                        savedWorkouts = {savedWorkouts}
                        selectChange ={selectChange}
                        changeFunc={handleEditChange}
                        getFormattedTime = {getFormattedTime}
                        startStopTimer = {startStopTimer}
                        intervalId = {intervalId}
                        resetTimer = {resetTimer}
                        saveStatsFunc={saveStatsFunc}
                    />
                    : <ActivityExerciseButton
                        setActiveTabFunc={changeTab}
                        activeTab={'getSaved'}
                        innerText={'Провести тренировку'}
                    />
                }
                {error !== 0 && <ExerciseError error={error}/>}
            </div>
        </div>
        </div>
        <TabBar userId={userId}/>
        </>
    );
}

export default ExerciseForm;