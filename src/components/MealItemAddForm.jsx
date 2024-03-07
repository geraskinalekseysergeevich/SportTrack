import React, { useState } from 'react';
import classes from '../UI/MealItemAddForm.module.css';

const MealItemAddForm = ({ _model, onSave }) => {

    const [model, setModel] = useState(_model ?? {});
    const [inputError, setInputError] = useState(0);

    const calculateTotal = () => {

        if (!model.name || model.name === ""){
            setInputError(1)
            console.log('Неправильно введены данные');
        }

        else {
            onSave({
            id: model.id ?? crypto.randomUUID(),
            ...model })
            console.log(model)
        }
    };

    return (
        <div className={classes.mealaddform__container}>
            <div>
                <label>Название:</label>
                <input
                    type="text"
                    id="meal-item-label-name"
                    placeholder="Введите название"
                    value={model.name || ''}
                    onChange={(e) => setModel({...model, name: e.target.value})}
                />
            </div>
            <div className={classes.weight}>
                <label>Масса нетто (г):</label>
                <input
                    type="number"
                    min='0'
                    placeholder="Граммовка"
                    value={model.weight || ''}
                    onChange={ (e) => {
                        setModel({ ...model, weight: Number.parseInt(e.target.value) }) 
                    } }
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
                        checked={model.isTotal}
                        onChange={(e) => setModel({ ...model, isTotal: true })}
                    />
                </div>
                <div>
                    <label>На 100г</label>
                    <input
                        type="radio"
                        value="PER100GRAMM"
                        checked={!model.isTotal}
                        onChange={(e) => setModel({ ...model, isTotal: false })}
                    />
                </div>
            </div>
            <div>
                <label>Калорийность:</label>
                <input
                    type="number"
                    min='0'
                    placeholder="Введите калории"
                    value={model.calories || ''}
                    onChange={(e) => setModel({...model, calories: Number.parseInt(e.target.value)})}
                />
            </div>
            <div className={classes.bju__container}>
                <div>
                    <label>Б:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите белки"
                        value={model.protein || ''}
                        onChange={(e) => setModel({...model, protein: Number.parseInt(e.target.value)})}
                    />
                </div>
                <div>
                    <label>Ж:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите жиры"
                        value={model.fat || ''}
                        onChange={(e) => setModel({...model, fat: Number.parseInt(e.target.value)})}
                    />
                </div>
                <div>
                    <label>У:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите углеводы"
                        value={model.carbs || ''}
                        onChange={(e) => setModel({...model, carbs: Number.parseInt(e.target.value)})}
                    />
                </div>
            </div>
            {
                inputError === 1 ? (
                    <div className={classes.error__container}>
                         <p>Неправильно введены данные</p>
                    </div>
                ) : null
            }
            <div className={classes.footer_button}>
                <button onClick={calculateTotal}>Сохранить</button>
            </div>
        </div>
    );
};

export default MealItemAddForm;