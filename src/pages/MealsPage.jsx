import React, { useState } from 'react';
import styles from '../UI/MealsPage.module.css';

const MealsPage = () => {
    
    const [openAddItem, setOpenAddItem] = useState(false);
    const [mealName, setMealName] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [editedItem, setEditedItem] = useState();

    const toggleAddItemMenu = () => {
        setOpenAddItem(!openAddItem);
    };

    const onAddItem = (item) => {
        const items = foodItems.filter(el => el.id !== item.id)
        items.push(item);
        setFoodItems(items);
        setEditedItem(undefined);
        setOpenAddItem(false);
    }

    const onRemoveItem = (item) => {
        setFoodItems(foodItems.filter(el => el.id !== item.id));
    }

    const onEditItem = (item) => {
        setEditedItem(item);
        setOpenAddItem(true);
    }

    return (
        <div className={styles.container}>

            <div className={styles.page_name}>
                <h1>Добавить приём пищи</h1>
            </div>

            <div className={styles.meal_input}>
                <div className={styles.rectangle}>
                    <label id="meal-name">Название:</label>
                    <input
                        type="text"
                        id="meal-name-input"
                        placeholder="Завтрак | Обед | Ужин"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                    />
                </div>


                <div className={styles.meal_data}>
                    <div className={styles.beba}>

                    {foodItems.map((item) =>
                        <MealItem key={item.id} model={item} onEditItem={onEditItem} onRemoveItem={onRemoveItem}/>
                    )}
                                        {openAddItem && (<MealItemAddFrom model={editedItem} onSave={onAddItem}/>)}
                    </div>

                    <button onClick={toggleAddItemMenu} className={styles.beba_button}>
                        <div className={styles.svg_container}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="70"
                                height="70"
                                viewBox="0 0 70 70"
                                fill="none"
                            >
                                <circle cx="35" cy="35" r="35" fill="black"/>
                            </svg>
                        </div>
                        <div className={styles.beba_text}>+</div>
                    </button>


                </div>
            </div>
        </div>
    );
};

const MealItemAddFrom = (props) => {
    const [model, setModel] = useState(props.model ?? {});
    const calculateTotal = () => {
        // todo check errors

        props.onSave({
            id: model.id ?? crypto.randomUUID(),
            ...model,
        });
    }

    return (
        <div className={styles.meal_container}>
            <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>Название блюда:</label>
                <input
                    type="text"
                    className={styles.meal_item_input}
                    placeholder="паста"
                    value={model.name}
                    onChange={(e) => setModel({...model, name: e.target.value})}
                />
            </div>

            <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>Масса нето (г.):</label>
                <input
                    type="number"
                    className={styles.meal_item_input}
                    placeholder="200"
                    value={model.weight}
                    onChange={(e) => setModel({...model, weight: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>Подсчет пищевой ценности:</label>
            </div>

            <div className={styles.meal_item_block}>
                <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>Всего</label>
                <input
                    type="radio"
                    className={styles.meal_item_radio_button}
                    value="TOTAL"
                    checked={model.isTotal}
                    onChange={(e) => setModel({...model, isTotal: true})}
                    />
                    </div>
                <div className={styles.meal_item_block}>

                <label className={styles.meal_item_label}>На 100г.</label>
                <input
                    type="radio"
                    className={styles.meal_item_radio_button}
                    value="PER100GRAMM"
                    checked={!model.isTotal}
                    onChange={(e) => setModel({...model, isTotal: false})}
                    />
                    </div>
            </div>

            <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>Каллорийность:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите калории"
                    value={model.calories}
                    onChange={(e) => setModel({...model, calories: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>Б:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите белки"
                    value={model.protein}
                    onChange={(e) => setModel({...model, protein: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>Ж:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите жиры"
                    value={model.fat}
                    onChange={(e) => setModel({...model, fat: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className={styles.meal_item_block}>
                <label className={styles.meal_item_label}>У:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите углеводы"
                    value={model.carbs}
                    onChange={(e) => setModel({...model, carbs: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className={styles.meal_item_block}>
                <button className={styles.meal_item_button} onClick={calculateTotal}>Сохранить</button>
            </div>
        </div>
    )
}

export const MealItem = (props) => {
    return (
        <div className={styles.meal_container}>
            <div className={styles.meal_info}>
                <div className={styles.meal_item_block}>
                    <span className={styles.meal_item_label}>{props.model.name}</span>
                </div>

                <div className={styles.meal_item_block}>
                    <label className={styles.meal_item_label}>Масса нетто:</label>
                    <span className={styles.meal_item_label}>{props.model.weight}г.</span>
                </div>

                <div className={styles.meal_item_block}>
                    <label className={styles.meal_item_label}>Каллорийность:</label>
                    <span
                        className={styles.meal_item_label}>{props.model.isTotal ? props.model.calories : props.model.calories * props.model.weight}ккал</span>
                </div>

                <div className={styles.meal_item_block}>

                    <div className={styles.meal_item_line}>
                        <label className={styles.meal_item_label}>Б:</label>
                        <span
                            className={styles.meal_item_label}>{props.model.isTotal ? props.model.protein : props.model.protein * props.model.weight}г.,</span>
                    </div>

                    <div className={styles.meal_item_line}>
                        <label className={styles.meal_item_label}>Ж:</label>
                        <span className={styles.meal_item_label}>
                            {props.model.isTotal ? props.model.fat : props.model.fat * props.model.weight}г.,
                        </span>
                    </div>

                    <div className={styles.meal_item_line}>
                        <label className={styles.meal_item_label}>У:</label>
                        <span
                            className={styles.meal_item_label}>{props.model.isTotal ? props.model.carbs : props.model.carbs * props.model.weight}г.</span>
                    </div>
                </div>

                <div className={styles.meal_item_block}>
                    <button className={styles.meal_item_button} onClick={() => props.onEditItem(props.model)}>Изменить
                    </button>
                    <button className={styles.meal_item_button} onClick={() => props.onRemoveItem(props.model)}>Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MealsPage;