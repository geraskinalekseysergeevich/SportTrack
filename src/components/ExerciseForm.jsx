import React, { useEffect, useState } from 'react';
import classes from '../UI/ExerciseForm.module.css';

function ExerciseForm() {
    const [activeTab, setActiveTab] = useState('');
    const [exerciseData, setExerciseData] = useState({
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
    });
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [savedWorkouts, setSavedWorkouts] = useState({});
    const [selectedWorkout, setSelectedWorkout] = useState('')
    const [selectChange, setSelectChange] = useState(0)
    const [error, setError] = useState(0)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExerciseData({...exerciseData, [name]: value});
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setExerciseData({ ...exerciseData, [name]: checked ? 1 : '' });
    };

    const startStopTimer = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            const startTime = Date.now() - timer;
            const id = setInterval(() => {
                setTimer(Date.now() - startTime);
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
        setTimer(0);
    };

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
        })

    }

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

        exerciseData.time = getFormattedTime();
        exerciseData.timecreated = datetime;
        setActiveTab('');
        resetExercise()
        setSavedWorkouts(prevState => {
            const updatedState = {...prevState, [exerciseData.name]: exerciseData}
            console.log(updatedState)
            return updatedState
        })

        console.log('Упражнение успешно сохранено!');
        // Замените URL и настройки на соответствующие вашему API и его требованиям
    };

    const tryToSave = (saveExercise) => {
        return () => {
            if (exerciseData.name === '') {
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

    const deleteExercise = () => {
        const updatedWorkouts = { ...savedWorkouts }
        delete updatedWorkouts[exerciseData.name]
        setSavedWorkouts(updatedWorkouts);
        console.log('Упражнение успешно удалено!');
        resetExercise()
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
            <div className={classes.button__container} onClick={() => setActiveTab('addExercise')}>
                <div className={classes.button_flexcontainer}>
                    <div>Добавить свободную тренировку</div>
                    <div>+</div>
                </div>
            </div>
            {activeTab === 'addExercise' &&
                <div className={classes.addexercise__container}>
                    <div>
                        <label>Название упражнения:</label>
                        <input
                            type="text"
                            name="name"
                            value={exerciseData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Категория:</label>
                        <input
                            type="text"
                            name="category"
                            value={exerciseData.category}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="repetitions"
                            checked={exerciseData.repetitions !== ''}
                            onChange={handleCheckboxChange}
                        />
                        <label>Количество повторений упражнения:</label>
                        <input
                            type="number"
                            name="repetitions"
                            value={exerciseData.repetitions}
                            onChange={handleInputChange}
                            disabled={exerciseData.repetitions === ''}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="sets"
                            checked={exerciseData.sets !== ''}
                            onChange={handleCheckboxChange}
                        />
                        <label>Количество подходов:</label>
                        <input
                            type="number"
                            name="sets"
                            value={exerciseData.sets}
                            onChange={handleInputChange}
                            disabled={exerciseData.sets === ''}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="weight"
                            checked={exerciseData.weight !== ''}
                            onChange={handleCheckboxChange}
                        />
                        <label>Вес утяжеления:</label>
                        <input
                            type="number"
                            name="weight"
                            value={exerciseData.weight}
                            onChange={handleInputChange}
                            disabled={exerciseData.weight === ''}
                        />
                    </div>
                    <div>
                        <label>Место:</label>
                        <input
                            type="text"
                            name="location"
                            value={exerciseData.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Самочувствие:</label>
                        <select
                            name="mood"
                            value={exerciseData.mood}
                            onChange={handleInputChange}
                        >
                            <option value="">Выберите вариант</option>
                            <option value="хорошее">Хорошее</option>
                            <option value="плохое">Плохое</option>
                            <option value="не изменилось">Не изменилось</option>
                            {/* Добавьте здесь новые варианты */}
                        </select>
                    </div>
                    <div>
                        <label>Комментарий:</label>
                        <input
                            type="text"
                            name="comment"
                            value={exerciseData.comment}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <button onClick={tryToSaveExercise}>Сохранить</button>
                        <button onClick={resetExercise}>Очистить</button>
                    </div>
                </div>
            }
            <div className={classes.button__container} onClick={() => setActiveTab('selectSaved')}>
                <div className={classes.button_flexcontainer}>
                    <div>Выбрать сохраненую тренировку</div>
                    <div>+</div>
                </div>
            </div>

            {activeTab === 'selectSaved' && 
                <div className={classes.selectsaved__conatiner}>
                    <select
                        name="selectSaved"
                        value={selectedWorkout.name}
                        onChange={(e) => handleSelectSaved(e.target.value)}
                    >
                        <option value="">
                            Выберите сохраненную тренировку
                        </option>
                        {Object.keys(savedWorkouts).map((workoutName) => (
                            <option
                                key={workoutName}
                                value={workoutName}
                            >
                                {`${workoutName} ${savedWorkouts[workoutName]['category']}`}
                            </option>
                        ))}
                    </select>
                    {selectChange === 1 &&
                        <div>
                            <div>
                                <label>Название упражнения:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={exerciseData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Категория:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={exerciseData.category}
                                    onChange={handleInputChange}
                                >
                                    {/* <option value="">Выберите категорию</option>
            <option value="вело">Вело</option>
            <option value="бег">Бег</option>
            <option value="силовая">Силовая</option> */}
                                    {/* Добавьте здесь новые варианты */}
                                </input>
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="repetitions"
                                    checked={exerciseData.repetitions !== ''}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Количество повторений упражнения:</label>
                                <input
                                    type="number"
                                    name="repetitions"
                                    value={exerciseData.repetitions}
                                    onChange={handleInputChange}
                                    disabled={exerciseData.repetitions === ''}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="sets"
                                    checked={exerciseData.sets !== ''}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Количество подходов:</label>
                                <input
                                    type="number"
                                    name="sets"
                                    value={exerciseData.sets}
                                    onChange={handleInputChange}
                                    disabled={exerciseData.sets === ''}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="weight"
                                    checked={exerciseData.weight !== ''}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Вес утяжеления:</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={exerciseData.weight}
                                    onChange={handleInputChange}
                                    disabled={exerciseData.weight === ''}
                                />
                            </div>
                            <div>
                                <label>Место:</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={exerciseData.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Самочувствие:</label>
                                <select
                                    name="mood"
                                    value={exerciseData.mood}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Выберите вариант</option>
                                    <option value="хорошее">Хорошее</option>
                                    <option value="плохое">Плохое</option>
                                    <option value="не изменилось">Не изменилось</option>
                                    {/* Добавьте здесь новые варианты */}
                                </select>
                            </div>
                            <div>
                                <label>Комментарий:</label>
                                <input
                                    type="text"
                                    name="comment"
                                    value={exerciseData.comment}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    }

                    <button onClick={tryToSaveExercise}>Сохранить</button>
                    <button onClick={deleteExercise}>Удалить</button>
                    <div>Время: {getFormattedTime()}</div>
                    <button type="button" onClick={startStopTimer}>
                        {intervalId ? 'Стоп' : 'Старт'}
                    </button>
                    <button type="button" onClick={resetTimer}>
                        Сброс
                    </button>
                </div>
            }
        </div>
    );
}

export default ExerciseForm;
