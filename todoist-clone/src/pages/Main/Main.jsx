import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Main.scss';
// import './owfont-regular.css';

function Main() {

  const [city, setCity] = useState('Minsk');
  const [error, setError] = useState('');
  const [wData, setWData] = useState({
    temp: '',
    icon: '',
    desc: '',
  });
  const [nData, setNData] = useState([{
    title: '',
    url: '',
    img: '',
    date: '',
  }])

  const { REACT_APP_WEATHER_API_KEY, REACT_APP_NEWS_API_KEY } = process.env;
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=${REACT_APP_WEATHER_API_KEY}&units=metric`;
  const newsAPI = `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${REACT_APP_NEWS_API_KEY}`;

  
  const cityHandler = (e) => {
    setCity(e.target.value);
  }
  
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
        setError('');
      } catch (e) {
        setError('Enter correct city');
      }
    }
    getWeather();

  }, [weatherAPI]);
  
  useEffect(() => {

    const getNews = async () => {
      try {
        const res = await axios.get(newsAPI);
        const data = [];
        res.data.articles.forEach(article => {
          data.push({
            title: article.title,
            url: article.url,
            img: article.urlToImage,
            date: `${new Date(article.publishedAt).getDate()}.${new Date(article.publishedAt).getMonth() + 1}.${new Date(article.publishedAt).getFullYear()}`,
          })
        })        
        setNData(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getNews();

  }, [newsAPI]);

  return (
    <React.Fragment>
      <div className='weather'>
        <input 
          className='city'
          value={city}
          onChange={cityHandler}
        ></input>
        <span>{error}</span>
        <i  className={wData.icon}></i>
        <h5 id='desc'>{wData.desc}</h5>
        <h1 id='temp'>
          {wData.temp}
        </h1>
      </div>
      <div className='news'>
        <ul>
          {nData.map((item, i) => (
            <li key={i}>
              <div className='news__item'>
                <img height='200px' src={item.img} alt=""/>
                <div className='news__item__article'>
                  <p>{item.date}</p>
                  <h5>
                    {item.title}
                  </h5>
                  <a href={item.url}>{item.url}</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Main;
