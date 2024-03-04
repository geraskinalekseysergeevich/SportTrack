import React, {useState, useEffect} from 'react';
import "../UI/Calorie.css";

const Calories = ({userId}) => {
    const [openAddItem, setOpenAddItem] = useState(false);
    const [mealName, setMealName] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [editedItem, setEditedItem] = useState();

    const toggleAddItemMenu = () => {
        setOpenAddItem(!openAddItem);
    };

    const onAddItem = async(item) => {
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

    const handleSaveAll = async(e) => {
        e.preventDefault();
        try {
            foodItems.forEach(async item => {
                var course = mealName;
                var name = item.name;
                var weight = item.weight;
                var calories = item.isTotal ? item.calories : item.calories * item.weight;
                var protein = item.isTotal ? item.protein : item.protein * item.weight;
                var carbs = item.isTotal ? item.carbs : item.carbs * item.weight;
                var fat = item.isTotal ? item.fat : item.fat * item.weight;
                var date = dayToday();
                var items = ["date:'"+date+"'", "course:'"+course+"'", "name:'"+name+"'", "weight:"+Number(weight),
                 "calories:"+Number(calories), "protein:"+Number(protein), "carbs:"+Number(carbs), "fat:"+Number(fat)];

                console.log(items);

                const response = await fetch('http://localhost:3001/api/users/saveUserCallorie', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userId, items}),
                  });
            
                  if (response.ok) {
                    const { token, userId } = await response.json();
                    console.log(userId);
                    // Сохранение токена и ID пользователя, например, в локальном хранилище
                    console.log('Log successful');
                    //navigate('/trainings', { state: { userId } });
                  } else {
                    console.error('Log failed');
                  }
                })}
            catch (error) {
                  console.error('Log error:', error);
                }
            }

    return (
        <div className="container">

            <div className="page-name">
                <h1>Добавить приём пищи</h1>
            </div>

            <div className="meal-input">
                <div className="rectangle">
                    <label id="meal-name">Название:</label>
                    <input
                        type="text"
                        id="meal-name-input"
                        placeholder="Завтрак | Обед | Ужин"
                        value={mealName}
                        onChange={(e) => setMealName(e.target.value)}
                    />
                </div>


                <div className="meal-data">
                    {foodItems.map((item) =>
                        <MealItem key={item.id} model={item} onEditItem={onEditItem} onRemoveItem={onRemoveItem}/>
                    )}

                    <button onClick={toggleAddItemMenu} className="add-button">
                        <div className="svg-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="70"
                                height="70"
                                viewBox="0 0 70 70"
                                fill="none"
                            >
                                <circle cx="35" cy="35" r="35" fill="black"/>
                            </svg>
                            <span className="button-text">+</span>
                        </div>
                        <button onClick={handleSaveAll}>Save all</button>
                    </button>
                    {openAddItem && (<MealItemAddFrom model={editedItem} onSave={onAddItem}/>)}
                </div>
            </div>
        </div>
    );
};

const MealItemAddFrom = (props) => {
    const [model, setModel] = useState(props.model ?? {});
    const [inputErrored, setInputErrored] = useState(false);
    

    const calculateTotal = () => {
        // todo check errors
        // setInputErrored(false);
        setInputErrored((prevState) => false);
        var curInputErrored = false;
        var element = document.getElementById("meal-item-label-name")
        console.log(1);
        if (!model.name || model.name === ""){
            console.log(2);
            if (!element.classList.contains("error")) {
                element.classList.add("error")
            }
            setInputErrored((prevState) => true);
            
            curInputErrored = true;

            console.log(3);
            console.log(inputErrored);
            console.log(4);

        }
        else {
            if (element.classList.contains("error")) {
                element.classList.remove("error")
            }
        }


        // {
        //     "weight": "meal-item-label-weight",
        //     "protein": "meal-item-label-protein",
        // }

        // for k, v in map


        // for each int
        //...


        console.log(inputErrored);

        if (!curInputErrored) {
            props.onSave({
            id: model.id ?? crypto.randomUUID(),
            ...model,
        })
        setInputErrored(curInputErrored);
    };
    }
    return (
        <div className="meal-container">
            <div className="meal-item-block">
                <label className="meal-item-label">Название блюда:</label>
                <input
                    type="text"
                    className="meal-item-input"
                    id="meal-item-label-name"
                    placeholder="паста"
                    value={model.name}
                    onChange={(e) => setModel({...model, name: e.target.value})}
                />
            </div>

            <div className="meal-item-block">
                <label className="meal-item-label">Масса нето (г.):</label>
                <input
                    type="number"
                    className="meal-item-input"
                    placeholder="200"
                    value={model.weight}
                    onChange={(e) => {
                        setModel({...model, weight: Number.parseInt(e.target.value)});
                        }
                    }
                />
            </div>

            <div className="meal-item-block">
                <label className="meal-item-label">Подсчет пищевой ценности:</label>
            </div>

            <div className="meal-item-block">
                <label className="meal-item-label">Всего</label>
                <input
                    type="radio"
                    className="meal-item-radio-button"
                    value="TOTAL"
                    checked={model.isTotal}
                    onChange={(e) => setModel({...model, isTotal: true})}
                />

                <label className="meal-item-label">На 100г.</label>
                <input
                    type="radio"
                    className="meal-item-radio-button"
                    value="PER100GRAMM"
                    checked={!model.isTotal}
                    onChange={(e) => setModel({...model, isTotal: false})}
                />
            </div>

            <div className="meal-item-block">
                <label className="meal-item-label">Каллорийность:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите калории"
                    value={model.calories}
                    onChange={(e) => setModel({...model, calories: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className="meal-item-block">
                <label className="meal-item-label">Б:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите белки"
                    value={model.protein}
                    onChange={(e) => setModel({...model, protein: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className="meal-item-block">
                <label className="meal-item-label">Ж:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите жиры"
                    value={model.fat}
                    onChange={(e) => setModel({...model, fat: Number.parseInt(e.target.value)})}
                />
            </div>

            <div className="meal-item-block">
                <label className="meal-item-label">У:</label>
                <input
                    type="number"
                    className="meal-item-input meal-item-input-big"
                    placeholder="Введите углеводы"
                    value={model.carbs}
                    onChange={(e) => setModel({...model, carbs: Number.parseInt(e.target.value)})}
                />
            </div>
            {
                inputErrored ? (
                    <div className="meal-item-block-error">
                         <p className="meal-item-block-error-message">Неправильно введены данные</p>
                    </div>
                ): null
            }
            
            <div className="meal-item-block">
                <button className="meal-item-button" onClick={calculateTotal}>Сохранить</button>
            </div>
        </div>
    )
}

export const MealItem = (props) => {
    return (
        <div className="meal-container">
            <div className="meal-info">
                <div className="meal-item-block">
                    <span className="meal-item-label">{props.model.name}</span>
                </div>

                <div className="meal-item-block">
                    <label className="meal-item-label">Масса нетто:</label>
                    <span className="meal-item-label">{props.model.weight}г.</span>
                </div>

                <div className="meal-item-block">
                    <label className="meal-item-label">Каллорийность:</label>
                    <span
                        className="meal-item-label">{props.model.isTotal ? props.model.calories : props.model.calories * props.model.weight}ккал</span>
                </div>

                <div className="meal-item-block">

                    <div className="meal-item-line">
                        <label className="meal-item-label">Б:</label>
                        <span
                            className="meal-item-label">{props.model.isTotal ? props.model.protein : props.model.protein * props.model.weight}г.,</span>
                    </div>

                    <div className="meal-item-line">
                        <label className="meal-item-label">Ж:</label>
                        <span
                            className="meal-item-label">{props.model.isTotal ? props.model.fat : props.model.fat * props.model.weight}г.,</span>
                    </div>

                    <div className="meal-item-line">
                        <label className="meal-item-label">У:</label>
                        <span
                            className="meal-item-label">{props.model.isTotal ? props.model.carbs : props.model.carbs * props.model.weight}г.</span>
                    </div>
                </div>

                <div className="meal-item-block">
                    <button className="meal-item-button" onClick={() => props.onEditItem(props.model)}>Изменить
                    </button>
                    <button className="meal-item-button" onClick={() => props.onRemoveItem(props.model)}>Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Calories;
