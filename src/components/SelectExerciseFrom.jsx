import React from 'react';
import classes from '../UI/SelectExerciseFrom.module.css';

const SelectExerciseFrom = ({selectedWorkout, selectSaveFunc, savedWorkouts, 
    selectChange, inputChangeFunc, checkboxChangeFunc, saveFunc, deleteFunc,
    getFormattedTime, startStopTimer, intervalId, resetTimer }) => {

    
    return (
        <div className={classes.selectsaved__conatiner}>
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
                <div>
                    <div>
                        <label>Название упражнения:</label>
                        <input
                            type="text"
                            name="name"
                            value={selectedWorkout.name}
                            onChange={inputChangeFunc}
                        />
                    </div>
                    <div>
                        <label>Категория:</label>
                        <input
                            type="text"
                            name="category"
                            value={selectedWorkout.category}
                            onChange={inputChangeFunc}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="repetitions"
                            checked={selectedWorkout.repetitions !== ''}
                            onChange={checkboxChangeFunc}
                        />
                        <label>Количество повторений упражнения:</label>
                        <input
                            type="number"
                            name="repetitions"
                            value={selectedWorkout.repetitions}
                            onChange={inputChangeFunc}
                            disabled={selectedWorkout.repetitions === ''}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="sets"
                            checked={selectedWorkout.sets !== ''}
                            onChange={checkboxChangeFunc}
                        />
                        <label>Количество подходов:</label>
                        <input
                            type="number"
                            name="sets"
                            value={selectedWorkout.sets}
                            onChange={inputChangeFunc}
                            disabled={selectedWorkout.sets === ''}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="weight"
                            checked={selectedWorkout.weight !== ''}
                            onChange={checkboxChangeFunc}
                        />
                        <label>Вес утяжеления:</label>
                        <input
                            type="number"
                            name="weight"
                            value={selectedWorkout.weight}
                            onChange={inputChangeFunc}
                            disabled={selectedWorkout.weight === ''}
                        />
                    </div>
                    <div>
                        <label>Место:</label>
                        <input
                            type="text"
                            name="location"
                            value={selectedWorkout.location}
                            onChange={inputChangeFunc}
                        />
                    </div>
                    <div>
                        <label>Самочувствие:</label>
                        <select
                            name="mood"
                            value={selectedWorkout.mood}
                            onChange={inputChangeFunc}
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
                            value={selectedWorkout.comment}
                            onChange={inputChangeFunc}
                        />
                    </div>

                    <button onClick={saveFunc}>Сохранить</button>
                    <button onClick={deleteFunc}>Удалить</button>
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
};

export default SelectExerciseFrom;