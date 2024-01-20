import React, { useState } from 'react';
import classes from '../UI/ExerciseForm.module.css';

function ExerciseForm() {
    const [activeTab, setActiveTab] = useState('addExercise', 'selectSaved');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExerciseData({
            ...exerciseData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setExerciseData({ ...exerciseData, [name]: checked ? 1 : null });
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

    const [savedWorkouts, setSavedWorkouts] = useState([]);

    const saveExercise = () => {
        // fetch("YOUR_API_ENDPOINT", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(exerciseData),
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       console.log("Success:", data);
        //       // Обрабатываем полученный ответ
        //     })
        //     .catch((error) => {
        //       console.error("Error:", error);
        //     });

        var currentdate = new Date();
        var datetime =
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
        setActiveTab([...activeTab, exerciseData]);
        // setSavedWorkouts({
        //     ...savedWorkouts,
        //     [exerciseData.name]: exerciseData,
        //   });
        setSavedWorkouts([...savedWorkouts, exerciseData]);
        console.log(savedWorkouts);
        setExerciseData({
            name: '',
            category: '',
            repetitions: null,
            sets: null,
            weight: null,
            location: '',
            mood: '',
            comment: '',
            time: '',
            timecreated: '',
        });
        alert('Упражнение успешно сохранено!');
        // Замените URL и настройки на соответствующие вашему API и его требованиям
    };

    const deleteExercise = () => {
        const updatedWorkouts = savedWorkouts.filter(
            (workout) => workout.name !== exerciseData.name
        );
        setSavedWorkouts(updatedWorkouts);
        setActiveTab([...activeTab, exerciseData]);
        console.log(savedWorkouts);
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

    const [selectedWorkout, setSelectedWorkout] = useState(null);

    const handleSelectSaved = (workout) => {
        const selectedWorkout = savedWorkouts.find(
            (savedWorkout) =>
                savedWorkout.name === workout.name &&
                savedWorkout.category === workout.category
        );
        if (selectedWorkout) {
            setExerciseData(selectedWorkout);
        }

        // setSelectedWorkout(workout);
    };

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);

        const selectedWorkout = savedWorkouts.find(
            (savedWorkout) => savedWorkout.name === e.target.value
        );
        if (selectedWorkout) {
            setExerciseData(selectedWorkout);
            console.log(savedWorkouts);
        }
    };

    const [selectedOption, setSelectedOption] = useState('');

    return (
        <div>
            <div>
                <span>Добавить новое упражнение</span>
                <button onClick={() => setActiveTab('addExercise')}>+</button>
            </div>
            {activeTab === 'addExercise' && (
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
                            checked={exerciseData.repetitions !== null}
                            onChange={handleCheckboxChange}
                        />
                        <label>Количество повторений упражнения:</label>
                        <input
                            type="number"
                            name="repetitions"
                            value={exerciseData.repetitions}
                            onChange={handleInputChange}
                            disabled={exerciseData.repetitions === null}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="sets"
                            checked={exerciseData.sets !== null}
                            onChange={handleCheckboxChange}
                        />
                        <label>Количество подходов:</label>
                        <input
                            type="number"
                            name="sets"
                            value={exerciseData.sets}
                            onChange={handleInputChange}
                            disabled={exerciseData.sets === null}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="weight"
                            checked={exerciseData.weight !== null}
                            onChange={handleCheckboxChange}
                        />
                        <label>Вес утяжеления:</label>
                        <input
                            type="number"
                            name="weight"
                            value={exerciseData.weight}
                            onChange={handleInputChange}
                            disabled={exerciseData.weight === null}
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
                    <button onClick={saveExercise}>Сохранить</button>
                </div>
            )}
            <div>
                <span>Выбрать сохраненное упражнение</span>
                <button onClick={() => setActiveTab('selectSaved')}>+</button>
            </div>

            {activeTab === 'selectSaved' && (
                <div>
                    <select
                        name="selectSaved"
                        value={exerciseData.selectedOption}
                        onChange={handleSelectChange}
                    >
                        <option value="">
                            Выберите сохраненную тренировку
                        </option>
                        {savedWorkouts.map((workout) => (
                            <option
                                key={`${workout.name}-${workout.category}`}
                                value={workout.name}
                                onClick={() => handleSelectSaved(workout)}
                            >
                                {`${workout.name} ${workout.category}`}
                            </option>
                        ))}
                    </select>
                    {/* ДОБАВИТЬ реализацию показа выбранной тренировки и изменения ее полей */}
                    {selectedOption && (
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
                                    checked={exerciseData.repetitions !== null}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Количество повторений упражнения:</label>
                                <input
                                    type="number"
                                    name="repetitions"
                                    value={exerciseData.repetitions}
                                    onChange={handleInputChange}
                                    disabled={exerciseData.repetitions === null}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="sets"
                                    checked={exerciseData.sets !== null}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Количество подходов:</label>
                                <input
                                    type="number"
                                    name="sets"
                                    value={exerciseData.sets}
                                    onChange={handleInputChange}
                                    disabled={exerciseData.sets === null}
                                />
                            </div>
                            <div>
                                <input
                                    type="checkbox"
                                    name="weight"
                                    checked={exerciseData.weight !== null}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Вес утяжеления:</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={exerciseData.weight}
                                    onChange={handleInputChange}
                                    disabled={exerciseData.weight === null}
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
                                    <option value="не изменилось">
                                        Не изменилось
                                    </option>
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
                    )}
                    <button onClick={saveExercise}>Сохранить</button>
                    <button onClick={deleteExercise}>Удалить</button>
                </div>
            )}
            <div>Время: {getFormattedTime()}</div>
            <button type="button" onClick={startStopTimer}>
                {intervalId ? 'Стоп' : 'Старт'}
            </button>
            <button type="button" onClick={resetTimer}>
                Сброс
            </button>
        </div>
    );
}

export default ExerciseForm;
