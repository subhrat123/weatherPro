import React, { useState, useEffect } from 'react';
import cloud from '../assets/Icon/cloud.png';
import storm from '../assets/Icon/storm.png';
import fog from '../assets/Icon/fog.png';
import rain from '../assets/Icon/rain.png';
import snow from '../assets/Icon/snow.png';
import sun from '../assets/Icon/sun.png';
import windy from '../assets/Icon/windy.png';
import Haze from '../assets/Icon/Haze.png';

const weatherIcons = {
  cloud: cloud,
  storm: storm,
  fog: fog,
  mist: fog,
  rain: rain,
  snow: snow,
  wind: windy,
  haze: Haze,
};

const getWeatherIcon = (weather = '') => {
  const lowerWeather = weather?.toLowerCase();
  return Object.keys(weatherIcons).find((key) => lowerWeather?.includes(key)) 
    ? weatherIcons[Object.keys(weatherIcons).find((key) => lowerWeather?.includes(key))] 
    : sun;
};

const WeatherCard = ({ Place, windspeed, Weather = "", currentInfo, visibility }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup function to clear interval
  }, []);

  const icon = getWeatherIcon(Weather);
  
  const apiKey = import.meta.env.VITE_OPEN_AQ_API_KEY;
  const [aqi, setAqi] = useState(null);

  useEffect(() => {
    fetch("http://api.airvisual.com/v2/countries?key={{YOUR_API_KEY}}", {
      method: "GET",
      headers: {
        "X-API-Key": apiKey, // Use the correct environment variable
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Handle the data received from the API
        setAqi(data); // Save the data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle any errors
      });
  }, [apiKey]);
  
  // const [aqi, setAqi] = useState(null);
  // useEffect(() => {
    //   fetch(`https://api.openaq.org/v2/latest?city=${Place}`)
    //     .then((response) => response.json())
    //     .then((data) => {
      //       if (data.results.length > 0) {
        //         setAqi(data.results[0].measurements);
        //       }
        //       setLoading(false);
  //     })
  //     .catch((error) => console.error("Error fetching AQI:", error));
  // }, [Place]);

  return (
    <div className="max-md:w-[382px] md:h-[434px] drop-shadow-lg shadow-2xl backdrop-blur-lg pt-10 p-6 m-3 rounded-xl flex-col justify-center items-center">
      {/* Weather Icon & Temperature */}
      <div className="flex font-bold justify-center items-center gap-5 text-2xl">
        <img src={icon} alt="weather icon" className="drop-shadow-lg w-32 h-32" />
        <p>{currentInfo.temp}°C</p>
      </div>

      {/* Location */}
      <div className="text-center m-2 capitalize font-bold">{Place}</div>

      {/* Date & Time */}
      <div className="flex text-lg font-medium justify-between m-6">
        <div>{new Date().toDateString()}</div>
        <div>{time}</div>
      </div>

      {/* Wind Speed & Humidity */}
      <div className="flex justify-center items-center gap-3">
        <div className="w-40 bg-blue-500 drop-shadow-lg p-2 rounded">
          <p>Wind Speed</p>
          <p>{windspeed} km/h</p>
        </div>
        <div className="w-40 bg-green-400 drop-shadow-md p-2 rounded">
          <p>Humidity</p>
          <p>{currentInfo.humidity}%</p>
        </div>
      </div>

      {/* Heat Index */}
      <div className="flex justify-between m-3">
        <p>Heat Index</p>
        <p>{currentInfo.feels_like}°C</p>
      </div>

      <hr className="bg-slate-500" />

      {/* Weather Condition */}
      <div className="text-center text-xl font-bold m-3 capitalize">{Weather}</div>
    </div>
  );
};

export default WeatherCard;
