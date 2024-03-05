import { toBeDisabled } from '@testing-library/jest-dom/matchers';
import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { Chart } from 'react-google-charts';

const StatisticsComponent = ({userId}) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [nutritionData, setNutritionData] = useState([]);
    const exerciseArray = [];
    const nutritionArray = [];
    const groupedData = [];
    const [inputData, setInputData] = useState({ items: [], exercises: [] });
        
    const recommendedTime = 60; 
    const recommendedCalories = 2000;


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

    const getPreviousWeek = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
      
        const weekArray = [];
      
        for (let i = 0; i < 7; i++) {
          let date = new Date(currentYear, currentMonth - 1, currentDay - i);
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();
      
          if (month < 10) month = '0' + month;
        
          weekArray.push(`${year}-${month}-${day}`);
        }
      
        return weekArray;
      };

    const getNutritionPercenatge = () => {
        return nutritionData[dayToday()];
    }

    const getNutritionChartData = () => {
        var ddata = [["Date", "Норма калорий, %"]];
        var arr = nutritionData
        const weekArray = getPreviousWeek();
        for (var i = 0; i < weekArray.length; i++) {
            var date = weekArray[i];
            var calories = arr[weekArray[i]];
            ddata.push([date, calories]);
          }
       return ddata;
   }


    const getExercisePercenatge = () =>{
        var percentage = 0
        exerciseData.forEach(data => {
            //console.log(data.date.split('T')[0] + '  ' + dayToday());
            if(data.date.split('T')[0] === dayToday()){
            percentage = data.percentage;
            }
        });
        return percentage;
    }

    const getExerciseChartData = () => {
        // var ddata = [["Date", "Выполнение тренировок"]];
        // // ddata.push(["Date", "Percentage", {role:"style"}])
        // for (let index = -6; index <= 0; index++) {
        //     exerciseData.forEach(data => {
        //         //console.log(data.date.split('-')[2].split('T')[0]);
        //         if(parseInt(data.date.split('-')[2].split('T')[0]) === parseInt(dayToday().split('-')[2])+index){
        //         ddata.push([data.date.split('T')[0], data.percentage]);
        //         }
        //     });
        // }
        // console.log(ddata)

        // return ddata;
    }

    
    useEffect(() => {
        const fetchData = async () => {
            try{
        const response = await fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`)
        const data = await response.json();
        setInputData(data)
        } catch (error){
            console.log(error)
        }
    }
        fetchData();
    }, [userId]);

    useEffect(() => {
        const load = async () => {
        inputData.items.forEach((item) => {
                    let resultObject = {};
                    if(item!=null && item!==undefined){
                    item.forEach(el => {
                        if(el!=null && el!==undefined){
                            let [key, value] = el.split(':');
                            key = key.replace(/'/g, '').trim();
                            value = value.replace(/'/g, '').trim();
                            value = !isNaN(value) ? parseInt(value, 10) : value; // Проверяем, является ли значение числом
                            resultObject[key] = value;
                    }});
                    groupedData.push(resultObject)
                }
            }
            );
            // inputData.forEach((item) => {
            //    const date = moment(item.timecreated, 'DD/M/YYYY @ HH:mm:ss')
            //        .startOf('day')
            //        .format();
    
            //     if (!(date in groupedData)) {
            //         groupedData[date] = { trainTime: 0, calories: 0 };
            //     }
    
            //     if (item.type === 'train') {
            //         const timeMinutes =
            //             parseFloat(item.time.split(':')[0]);
            //         groupedData[date].trainTime += timeMinutes;
            //     } else if (item.type === 'calorie') {
            //         groupedData[date].calories += item.calorie;
            //     }
            // });
            Object.keys(groupedData).forEach((date) => {
                nutritionArray.push({
                    date: groupedData[date].date,
                    percentage:
                        (groupedData[date].calories / recommendedCalories) * 100,
                });
            });
    
            //setExerciseData(exerciseArray);
            //console.log(nutritionArray);
            //console.log(nutritionData)
            var groupedNutrition = []
            nutritionArray.forEach(element => {
                if(!(element['date'] in groupedNutrition))
                    groupedNutrition[element['date']] = { percentage: 0 };
            });
            for (let item of nutritionArray) {
                if (groupedNutrition[item.date]) {
                    groupedNutrition[item.date].percentage += item.percentage;
                }
              }

            const arr = [];

            nutritionArray.forEach(obj => {
            const date = obj.date;
            if (!arr[date]) {
                arr[date] = 0;
            }
            arr[date] += obj.percentage;
            });

            setNutritionData(arr);
        //     const lines = 
        //     const newArray = lines.map((line) => {
        //     const [date, value] = line.split(":");
        //     const percentage = parseFloat(value.match(/([0-9.]+)/)[0]);
        //     return { date: date.trim(), percentage };
        //     });
        //     result = newArray.reduce((obj, item) => {
        //     obj[item.date] = item.percentage;
        //     return obj;
        //   }, {});

        }
        load()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inputData.items]);

    return (
        <div>

            <div style={{display:'inline-block'}}>
            <div><h1>Нагрузки</h1><p>{parseInt(getExercisePercenatge())}%/100%</p></div>
            <div style={{width:200, height:200, margin:'auto', display:'inline-block'}}>
                <ProgressBar progress={getExercisePercenatge()} strokeColor='red'></ProgressBar>
            </div>
            <div><h1>Еда</h1><p>{parseInt(getNutritionPercenatge())}%/100%</p></div>
            <div style={{width:200, height:200, margin:'auto', display:'inline-block'}}>
                <ProgressBar progress={getNutritionPercenatge()} strokeColor='lime'></ProgressBar>
            </div>
            </div>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={getExerciseChartData()} />
            <Chart chartType="ColumnChart" width="100%" height="400px" data={getNutritionChartData()} />
        </div>


          
    );
};

export default StatisticsComponent;
