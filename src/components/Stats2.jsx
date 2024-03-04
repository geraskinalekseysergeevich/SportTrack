import React from 'react';


// Парсинг данных
const inputData = [
    {
        type: 'train',
        time: '30:30:00',
        timecreated: '1/3/2024 @ 08:00:42',
    },
    {
        type: 'calorie',
        calorie: 1250,
        timecreated: '1/3/2024 @ 11:00:42',
    },
    {
        type: 'train',
        time: '30:30:00',
        timecreated: '29/2/2024 @ 08:00:42',
    },
    {
        type: 'train',
        time: '45:45:00',
        timecreated: '29/2/2024 @ 11:00:42',
    },
    {
        type: 'train',
        time: '20:20:00',
        timecreated: '28/2/2024 @ 14:00:42',
    },
    {
        type: 'train',
        time: '01:00:00',
        timecreated: '27/2/2024 @ 18:30:42',
    },
    {
        type: 'calorie',
        calorie: 1250,
        timecreated: '28/2/2024 @ 09:45:42',
    },
    {
        type: 'calorie',
        calorie: 300,
        timecreated: '27/2/2024 @ 12:30:42',
    },
    {
        type: 'train',
        time: '00:30:00',
        timecreated: '27/2/2024 @ 08:00:42',
    },
    {
        type: 'calorie',
        calorie: 2100,
        timecreated: '26/2/2024 @ 12:30:42',
    },
    {
        type: 'train',
        time: '45:45:00',
        timecreated: '26/2/2024 @ 07:15:42',
    },
    {
        type: 'calorie',
        calorie: 300,
        timecreated: '25/2/2024 @ 13:20:42',
    },
    {
        type: 'train',
        time: '35:35:00',
        timecreated: '25/2/2024 @ 06:45:42',
    },
    {
        type: 'calorie',
        calorie: 200,
        timecreated: '25/2/2024 @ 14:00:42',
    },
    {
        type: 'train',
        time: '01:00:00',
        timecreated: '24/2/2024 @ 18:30:42',
    },
    {
        type: 'calorie',
        calorie: 500,
        timecreated: '24/2/2024 @ 19:00:42',
    },
    {
        type: 'train',
        time: '25:25:00',
        timecreated: '24/2/2024 @ 08:10:42',
    },
    {
        type: 'calorie',
        calorie: 350,
        timecreated: '23/2/2024 @ 20:30:42',
    },
    {
        type: 'train',
        time: '50:50:00',
        timecreated: '23/2/2024 @ 21:00:42',
    },
    {
        type: 'calorie',
        calorie: 400,
        timecreated: '22/2/2024 @ 21:30:42',
    },
    {
        type: 'train',
        time: '40:40:00',
        timecreated: '23/2/2024 @ 07:00:42',
    },
    {
        type: 'calorie',
        calorie: 2150,
        timecreated: '21/2/2024 @ 12:45:42',
    },
];

// Предполагаемая структура входного файла Data.json
const rawData = [
  {
      "type": "train",
      "time": "30:30.00",
      "timecreated": "24/1/2024 @ 08:00:42"
  },
  {
      "type": "train",
      "time": "45:45.00",
      "timecreated": "22/1/2024 @ 11:00:42"
  },
  {
      "type": "train",
      "time": "20:20.00",
      "timecreated": "21/1/2024 @ 14:00:42"
  },
  {
      "type": "train",
      "time": "11:00.00",
      "timecreated": "24/1/2024 @ 18:30:42"
  },
  {
      "type": "calorie",
      "calorie": 250,
      "timecreated": "24/1/2024 @ 09:45:42"
  },
  {
      "type": "calorie",
      "calorie": 300,
      "timecreated": "24/1/2024 @ 12:30:42"
  },
          {
              "type": "train",
              "time": "00:30.00",
              "timecreated": "17/1/2024 @ 08:00:42"
          },
          {
              "type": "calorie",
              "calorie": 2100,
              "timecreated": "17/1/2024 @ 12:30:42"
          },
          {
              "type": "train",
              "time": "45:45.00",
              "timecreated": "18/1/2024 @ 07:15:42"
          },
          {
              "type": "calorie",
              "calorie": 300,
              "timecreated": "18/1/2024 @ 13:20:42"
          },
          {
              "type": "train",
              "time": "35:35.00",
              "timecreated": "19/1/2024 @ 06:45:42"
          },
          {
              "type": "calorie",
              "calorie": 150,
              "timecreated": "19/1/2024 @ 14:00:42"
          },
          {
              "type": "train",
              "time": "01:00.00",
              "timecreated": "20/1/2024 @ 18:30:42"
          },
          {
              "type": "calorie",
              "calorie": 500,
              "timecreated": "20/1/2024 @ 19:00:42"
          },
          {
              "type": "train",
              "time": "25:25.00",
              "timecreated": "21/1/2024 @ 08:10:42"
          },
          {
              "type": "calorie",
              "calorie": 350,
              "timecreated": "21/1/2024 @ 20:30:42"
          },
          {
              "type": "train",
              "time": "50:50.00",
              "timecreated": "22/1/2024 @ 21:00:42"
          },
          {
              "type": "calorie",
              "calorie": 400,
              "timecreated": "22/1/2024 @ 21:30:42"
          },
          {
              "type": "train",
              "time": "40:40.00",
              "timecreated": "23/1/2024 @ 07:00:42"
          },
          {
              "type": "calorie",
              "calorie": 2150,
              "timecreated": "23/1/2024 @ 12:45:42"
          }
];
console.log(rawData);

  // Парсинг данных

const StatisticsComponent = (rawData) => {
  return (
    <div>
      

    </div>
  );
};

export default StatisticsComponent;