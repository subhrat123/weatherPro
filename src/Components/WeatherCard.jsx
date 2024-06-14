import React, { useState, useEffect } from 'react';
import cloud from '../assets/Icon/cloud.png';
import storm from '../assets/Icon/storm.png';
import fog from '../assets/Icon/fog.png';
import rain from '../assets/Icon/rain.png';
import snow from '../assets/Icon/snow.png';
import sun from '../assets/Icon/sun.png';
import windy from '../assets/Icon/windy.png';
import Haze from '../assets/Icon/Haze.png'

const WeatherCard = ({ Place, windspeed, Weather, currentInfo, visibility }) => {
  const [icon, setIcon] = useState(sun);
  const [Time, setTime] = useState("");
  useEffect(() => {
    const getWeatherIcon = (weather) => {
      switch (weather?.toLowerCase()) {
        case 'clouds':
          return cloud;
        case 'storm':
          return storm;
        case 'fog':
          return fog;
        case 'rain':
          return rain;
        case 'snow':
          return snow;
        case 'windy':
          return windy;
        case 'haze'  :
            return Haze;
        default:
          return sun;
      }
    };

    setIcon(getWeatherIcon(Weather));
  }, [Weather]);

const getTime=()=>{
    setTime(new Date().toLocaleTimeString());
}

setInterval(getTime, 1000);


  return (
    <>
    
    <div className=' max-md:w-[382px] md:h-[434px] backdrop-blur-lg border pt-10 p-6 m-3 rounded-xl flex-col justify-center items-center'>
      <div className='flex font-bold justify-center items-center gap-5 text-2xl'>
        <img src={icon} alt="weather icon" className=' w-24 h-24' />
        <p>{currentInfo.temp}°C</p>
      </div>
      <div className='text-center m-2 capitalize font-bold'>{Place}</div>
      <div className='flex text-lg font-medium justify-between m-6'>
        <div>{new Date().toDateString()}</div>
        <div>{Time}</div>
      </div>
      <div className='flex justify-center items-center gap-3'>
        <div className='w-40 bg-blue-500 p-2 rounded'>
          <p>Wind Speed</p>
          <p>{windspeed} km/h</p>
        </div>
        <div className='w-40 bg-green-500 p-2 rounded'>
          <p>Humidity</p>
          <p>{currentInfo.humidity}%</p>
        </div>
      </div>
      <div className='flex justify-between m-3'>
        <p>Heat Index</p>
        <p>{currentInfo.feels_like}°C</p>
      </div>
      <hr className='bg-slate-500' />
      <div className='text-center text-xl font-bold m-3 capitalize'>{Weather}</div>
    </div>
    </>
  );
};

export default WeatherCard;
