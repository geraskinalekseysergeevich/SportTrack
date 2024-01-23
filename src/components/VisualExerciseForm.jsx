import React from 'react';
import classes from '../UI/VisualExerciseForm.module.css';

const VisualExerciseForm = ({changeFunc, data, changeCheckboxFunc}) => {
    return (
        <div className={classes.visual__container}>
            <div className={classes.name}>
                <label>Название упражнения:</label>
                <input
                    type="text"
                    name="name"
                    placeholder=' Введите название тренировки'
                    value={data.name || ''}
                    onChange={changeFunc}
                />
            </div>
            <div className={classes.category}>
                <label>Категория:</label>
                <input
                    type="text"
                    name="category"
                    placeholder=' Введите название категории'
                    value={data.category || ''}
                    onChange={changeFunc}
                />
            </div>
            <div className={classes.repetitions}>
                <div className={classes.checkbox__container}>
                    <input
                        type="checkbox"
                        name="repetitions"
                        checked={!!data.repetitions}
                        onChange={changeCheckboxFunc}
                    />
                    <label>Количество повторений:</label>
                </div>
                <input
                    type="number"
                    name="repetitions"
                    value={data.repetitions || ''}
                    onChange={changeFunc}
                    disabled={!data.repetitions}
                    min={1}
                    className={classes.small_input}
                />
            </div>
            <div className={classes.sets}>
                <div className={classes.checkbox__container}>
                    <input
                        type="checkbox"
                        name="sets"
                        checked={!!data.sets}
                        onChange={changeCheckboxFunc}
                    />
                    <label>Количество подходов:</label>
                </div>
                <input
                    type="number"
                    name="sets"
                    value={data.sets || ''}
                    onChange={changeFunc}
                    disabled={!data.sets}
                    min={1}
                    className={classes.small_input}
                />
            </div>
            <div className={classes.weight}>
                <div className={classes.checkbox__container}>
                    <input
                        type="checkbox"
                        name="weight"
                        checked={!!data.weight}
                        onChange={changeCheckboxFunc}
                    />
                    <label>Вес утяжеления:</label>
                </div>
                <input
                    type="number"
                    name="weight"
                    value={data.weight || ''}
                    onChange={changeFunc}
                    disabled={!data.weight}
                    min={1}
                    className={classes.small_input}
                />
            </div>
            <div className={classes.location}>
                <label>Место:</label>
                <input
                    type="text"
                    name="location"
                    placeholder=' Введите место тренировки'
                    value={data.location || ''}
                    onChange={changeFunc}
                />
            </div>
            <div className={classes.mood_options}>
                <label>Самочувствие:</label>
                <select
                    name="mood"
                    value={data.mood || ''}
                    onChange={changeFunc}
                >
                    <option value="">Выберите вариант</option>
                    <option value="хорошее">Хорошее</option>
                    <option value="плохое">Плохое</option>
                    <option value="не изменилось">Не изменилось</option>
                </select>
            </div>
            <div className={classes.comment}>
                <label>Комментарий:</label>
                <input
                    type="text"
                    name="comment"
                    placeholder=' Введите комментарий'
                    value={data.comment || ''}
                    onChange={changeFunc}
                />
            </div>
        </div>
    );
};

export default VisualExerciseForm;