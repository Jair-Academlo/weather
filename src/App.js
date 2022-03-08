import React from 'react';
import "./App.css";
import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {

  const [weather, setWeather] = useState({});   

 
	const [isCelcius, setIsCelcius] = useState(true);



	const tempKelvin = weather.main?.temp;
	const tempCelsius = (tempKelvin - 273.15).toFixed(1);
	const tempFahrenheit = ((tempKelvin * 9) / 5 - 459.67).toFixed(1);

	const toggleTemp = () => {
		setIsCelcius(!isCelcius);
	};

  
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=sp&appid=b51d24e387c050cbfdb91425ddd44b47`
        )
        .then(res => setWeather(res.data));
    };
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success);
    }, []);

     
  
    return (
      
      
      <section className="main">

      
        <div className="Weather">
          <h1> My Weather App</h1>
          <h2>
            <span>
              {weather.name}, {weather.sys?.country}
            </span>
          </h2>
          <div className="">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
              alt=""
            />
            <ul className='ul1'>
              <li>
                <span>Temperature</span>:{' '}
                {isCelcius ? `${tempCelsius} ºC` : `${tempFahrenheit} ºF`}
              </li>
              <li>
                <span>Humidity</span>: {weather.main?.humidity}%
              </li>
              <li>
                <span>Atmospheric Pressure</span>: {weather.main?.pressure} hPa
              </li>
              <li>
                <span>wind</span>: {weather.wind?.speed} m/s
              </li>
            </ul>
          </div>
          <div>
            <button className="button " onClick={toggleTemp}>
              {isCelcius ? 'Temperature on ºF' : 'Temperature on ºC'}
            </button>
          </div>
        </div>
      </section>
    );
  };


export default App;
