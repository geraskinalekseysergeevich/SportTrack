import React, { useEffect } from 'react';
import classes from '../UI/AddExerciseForm.module.css';

const AddExerciseForm = ({exerciseData, changeFunc, changeCheckboxFunc, saveFunc, resetFunc}) => {

    useEffect(() => {
        resetFunc()
    }, [])

    return (
        <div className={classes.addexercise__container}>
            <div>
                <label>Название упражнения:</label>
                <input
                    type="text"
                    name="name"
                    value={exerciseData.name || ''}
                    onChange={changeFunc}
                />
            </div>
            <div>
                <label>Категория:</label>
                <input
                    type="text"
                    name="category"
                    value={exerciseData.category || ''}
                    onChange={changeFunc}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    name="repetitions"
                    checked={!!exerciseData.repetitions}
                    onChange={changeCheckboxFunc}
                />
                <label>Количество повторений упражнения:</label>
                <input
                    type="number"
                    name="repetitions"
                    value={exerciseData.repetitions || ''}
                    onChange={changeFunc}
                    disabled={!exerciseData.repetitions}
                    min={1}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    name="sets"
                    checked={!!exerciseData.sets}
                    onChange={changeCheckboxFunc}
                />
                <label>Количество подходов:</label>
                <input
                    type="number"
                    name="sets"
                    value={exerciseData.sets || ''}
                    onChange={changeFunc}
                    disabled={!exerciseData.sets}
                    min={1}
                />
            </div>
            <div>
                <input
                    type="checkbox"
                    name="weight"
                    checked={!!exerciseData.weight}
                    onChange={changeCheckboxFunc}
                />
                <label>Вес утяжеления:</label>
                <input
                    type="number"
                    name="weight"
                    value={exerciseData.weight || ''}
                    onChange={changeFunc}
                    disabled={!exerciseData.weight}
                    min={1}
                />
            </div>
            <div>
                <label>Место:</label>
                <input
                    type="text"
                    name="location"
                    value={exerciseData.location || ''}
                    onChange={changeFunc}
                />
            </div>
            <div>
                <label>Самочувствие:</label>
                <select
                    name="mood"
                    value={exerciseData.mood || ''}
                    onChange={changeFunc}
                >
                    <option value="">Выберите вариант</option>
                    <option value="хорошее">Хорошее</option>
                    <option value="плохое">Плохое</option>
                    <option value="не изменилось">Не изменилось</option>
                </select>
            </div>
            <div>
                <label>Комментарий:</label>
                <input
                    type="text"
                    name="comment"
                    value={exerciseData.comment || ''}
                    onChange={changeFunc}
                />
            </div>
            <div>
                <button onClick={saveFunc}>Сохранить</button>
                <button onClick={resetFunc}>Очистить</button>
            </div>
        </div>
    );
};

export default AddExerciseForm;