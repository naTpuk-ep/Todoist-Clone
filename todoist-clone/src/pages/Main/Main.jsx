import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/actions/actions';

import useSound from 'use-sound';
import successSound from '../../assets/sounds/success_sound.mp3';

import './Main.scss';

function Main(props) {
  const { createTodo, getToday } = props;

  const [city, setCity] = useState('Minsk');
  const [wData, setWData] = useState({
    temp: '',
    icon: '',
    desc: '',
  });

  const [randomTodo, setRandomTodo] = useState({
    title: '',
    participants: '',
    price: '',
    type: '',
    link: '',
  });

  const [playSuccess] = useSound(successSound, {
    volume: 0.25,
  });

  const { REACT_APP_WEATHER_API_KEY } = process.env;
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`;
  const randomTodoAPI = 'https://www.boredapi.com/api/activity';

  const cityHandler = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await axios.get(weatherAPI);
        setWData((state) => ({
          ...state,
          temp: Math.round(res.data.main.temp),
          icon: `owf owf-${res.data.weather[0].id} owf-5x`,
          desc: res.data.weather[0].description,
        }));
      } catch (e) {
        console.log(e.message);
      }
    };
    getWeather();
  }, [weatherAPI]);

  const getRandomTodo = async () => {
    try {
      const result = await axios.get(randomTodoAPI);
      setRandomTodo({
        title: result.data.activity,
        participants: result.data.participants,
        price: result.data.price,
        type: result.data.type,
        link: result.data.link,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const submitRandomTodo = () => {
    if (randomTodo.title !== '') {
      const newTodo = {
        id: new Date().getTime(),
        title: randomTodo.title,
        date: getToday(),
        completed: false,
      };
      createTodo(newTodo);
      getRandomTodo();
      playSuccess();
    }
  };

  return (
    <div className='Main'>
      <div className='weather-block'>
        <div className='input-block'>
          <input
            id='city'
            className='city'
            value={city}
            onChange={cityHandler}
          ></input>
        </div>
        <div className='data-block'>
          <h2 id='temp'>{wData.temp} °C</h2>
          <i className={wData.icon}></i>
        </div>
      </div>

      <div className='random-activity-generator'>
        <h2>Random activity genarator</h2>
        <div className='random-todo'>
          <button
            className='refresh-random-todo'
            onClick={() => getRandomTodo()}
          >
            Give me an new activity
          </button>
          <h3>{randomTodo.title}</h3>
          <div className='random-todo-data'>
            <p>Participants: {randomTodo.participants}</p>
            <p>Price: {randomTodo.price} $</p>
            <p>Type: {randomTodo.type}</p>
            <button onClick={submitRandomTodo}>
              Add to my Todoist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  createTodo,
};

export default connect(null, mapDispatchToProps)(Main);
