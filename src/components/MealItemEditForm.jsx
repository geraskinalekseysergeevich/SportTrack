import React, { useState } from 'react';
import classes from '../UI/MealItemEditForm.module.css'

const MealItemEditForm = ({editedModel, setEditedModel, saveEdits}) => {

    const [inputError, setInputError] = useState(0);
    const [inputErrors, setInputErrors] = useState([]);
    let errors = Object.assign([], inputErrors);

    return (
        <div className={classes.mealeditform__container}>
            <div>
                <label>Название:</label>
                <input
                    className={`${errors.indexOf(1) !== -1 ? classes.incorrect_input : ""}`}
                    type="text"
                    id="meal-item-label-name"
                    placeholder="Введите название"
                    value={editedModel.name || ''}
                    onChange={(e) => {
                        setEditedModel({ ...editedModel, name: e.target.value });
                        setInputError(0);
                    }}
                />
            </div>
            <div className={classes.weight}>
                <label>Масса нетто (г):</label>
                <input
                    className={`${errors.indexOf(2) !== -1 ? classes.incorrect_input : ""}`}
                    type="number"
                    min='0'
                    placeholder="Граммовка"
                    value={editedModel.weight || ''}
                    onChange={(e) => {
                        setEditedModel({ ...editedModel, weight: Number.parseInt(e.target.value) });
                        setInputError(0);
                    }}
                />
            </div>
            <div className={classes.radio}>
                <div className={classes.radio_title}>
                    Подсчет пищевой ценности
                </div>
                <div>
                    <label>Всего</label>
                    <input
                        type="radio"
                        value="TOTAL"
                        checked={editedModel.isTotal}
                        onChange={() => { setEditedModel({ ...editedModel, isTotal: true })}}
                    />
                </div>
                <div>
                    <label>На 100г</label>
                    <input
                        type="radio"
                        value="PER100GRAMM"
                        checked={!editedModel.isTotal}
                        onChange={() => { setEditedModel({ ...editedModel, isTotal: false })}}
                    />
                </div>
            </div>
            <div>
                <label>Калорийность:</label>
                <input
                    className={`${errors.indexOf(3) !== -1 ? classes.incorrect_input : ""}`}
                    type="number"
                    min='0'
                    placeholder="Введите калории"
                    value={editedModel.calories || ''}
                    onChange={(e) => { setEditedModel({ ...editedModel, calories: Number.parseInt(e.target.value) }); setInputError(0); }}
                />
            </div>
            <div className={classes.bju__container}>
                <div>
                    <label>Б:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите белки"
                        value={editedModel.protein || ''}
                        onChange={(e) => setEditedModel({ ...editedModel, protein: Number.parseInt(e.target.value) })}
                    />
                </div>
                <div>
                    <label>Ж:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите жиры"
                        value={editedModel.fat || ''}
                        onChange={(e) => setEditedModel({ ...editedModel, fat: Number.parseInt(e.target.value) })}
                    />
                </div>
                <div>
                    <label>У:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите углеводы"
                        value={editedModel.carbs || ''}
                        onChange={(e) => setEditedModel({ ...editedModel, carbs: Number.parseInt(e.target.value) })}
                    />
                </div>
            </div>
            {
                inputError !== 0 ? (
                    <div className={classes.error__container}>
                        <p>{errors.length === 1 ? (inputError === 1 ? "Введите название приёма" : inputError === 2 ? "Введите массу" : inputError === 3 ? "Введите калорийность" : "") : "Заполните необходимые поля"}</p>
                    </div>
                ) : null
            }
            <div className={classes.footer_button}>
                <button onClick={saveEdits}>Сохранить</button>
            </div>
        </div>
    );
};

export default MealItemEditForm;