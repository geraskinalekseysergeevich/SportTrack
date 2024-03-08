import React, { useState } from 'react';
import classes from '../UI/MealItemAddForm.module.css';

const MealItemAddForm = ({ _model, onSave }) => {

    const [model, setModel] = useState(_model ?? { isTotal: true });

    const [inputError, setInputError] = useState(0);

    const [inputErrors, setInputErrors] = useState([]);

    let errors = Object.assign([], inputErrors);

    const calculateTotal = () => {

        if (!model.name || model.name === "") {
            errors.push(1);
            setInputErrors(errors);

            setInputError(1)
            console.log('Не введено название');
        }

        if (!model.weight || model.weight === "") {
            errors.push(2);
            setInputErrors(errors);

            setInputError(2);
            console.log('Не указана масса');
        }

        if (!model.calories || model.calories === "") {
            errors.push(3);
            setInputErrors(errors);

            setInputError(3);
            console.log('Не указано количество калорий');
        }

        if(errors.length == 0) {
            if (!model.protein || model.protein === "") {
                model.protein = 0;
            }

            if (!model.fat || model.fat === "") {
                model.fat = 0;
            }

            if (!model.carbs || model.carbs === "") {
                model.carbs = 0;
            }

            onSave({
                id: model.id ?? crypto.randomUUID(),
                ...model
            })
            
            console.log(model)
        }

        setTimeout(() => {
            errors = [];
            setInputErrors(errors);
        }, 1000);
    };

    return (
        <div className={classes.mealaddform__container}>
            <div>
                <label>Название:</label>
                <input
                    className={`${errors.indexOf(1) != -1 ? classes.incorrect_input : ""}`}
                    type="text"
                    id="meal-item-label-name"
                    placeholder="Введите название"
                    value={model.name || ''}
                    onChange={(e) => {
                        setModel({ ...model, name: e.target.value });
                        setInputError(0);
                    }}
                />
            </div>
            <div className={classes.weight}>
                <label>Масса нетто (г):</label>
                <input
                    className={`${errors.indexOf(2) != -1 ? classes.incorrect_input : ""}`}
                    type="number"
                    min='0'
                    placeholder="Граммовка"
                    value={model.weight || ''}
                    onChange={(e) => {
                        setModel({ ...model, weight: Number.parseInt(e.target.value) });
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
                        checked={model.isTotal}
                        onChange={() => {setModel({ ...model, isTotal: true }); console.log(model.isTotal)}}
                    />
                </div>
                <div>
                    <label>На 100г</label>
                    <input
                        type="radio"
                        value="PER100GRAMM"
                        checked={!model.isTotal}
                        onChange={() => {setModel({ ...model, isTotal: false }); console.log(model.isTotal)}}
                    />
                </div>
            </div>
            <div>
                <label>Калорийность:</label>
                <input
                    className={`${errors.indexOf(3) != -1 ? classes.incorrect_input : ""}`}
                    type="number"
                    min='0'
                    placeholder="Введите калории"
                    value={model.calories || ''}
                    onChange={(e) => { setModel({ ...model, calories: Number.parseInt(e.target.value) }); setInputError(0); }}
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
                        onChange={(e) => setModel({ ...model, protein: Number.parseInt(e.target.value) })}
                    />
                </div>
                <div>
                    <label>Ж:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите жиры"
                        value={model.fat || ''}
                        onChange={(e) => setModel({ ...model, fat: Number.parseInt(e.target.value) })}
                    />
                </div>
                <div>
                    <label>У:</label>
                    <input
                        type="number"
                        min='0'
                        placeholder="Введите углеводы"
                        value={model.carbs || ''}
                        onChange={(e) => setModel({ ...model, carbs: Number.parseInt(e.target.value) })}
                    />
                </div>
            </div>
            {
                inputError != 0 ? (
                    <div className={classes.error__container}>
                        <p>{errors.length == 1 ? (inputError == 1 ? "Введите название приёма" : inputError == 2 ? "Введите массу" : inputError == 3 ? "Введите калорийность" : "") : "Заполните необходимые поля"}</p>
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