import React, { useContext, useState } from 'react';
import './App.css';
import { useStateContext } from './Context';
import { forecastContext } from './Context/forecast';
import Background from './Components/Background';
import WeatherCard from './Components/WeatherCard';
import Minicard from './Components/Minicard';
import search from './assets/Icon/search.svg';

function App() {

  const { weather,
    main,
    setplace,
    wsp,
    vis,
    place } = useStateContext();

  const { Data, TimeZone } = useContext(forecastContext);


  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const submitCity = () => {
    setplace(input);
    setInput('')
  }
  return (
    <>
      <div className=' w-[100%] h-[100%] flex md:flex-col items-center justify-center'>
        
           <Background
          image={weather}
        />
       
       
        <div className='p-4 w-full absolute m-6 top-0 flex justify-around'>
          <div className='  font-bold text-2xl'>
            WeatherPro App
          </div>
          <div className='border-2 rounded-xl p-2 bg-white flex'>
            <input
              type="text"
              placeholder='Search city'
              className='focus:outline-none w-28 '
              value={input}
              onChange={handleInputChange}
              onKeyUp={
                (e) => {
                  if (e.key == 'Enter') {
                    submitCity();
                  }
                }
              }
            />
            <img className='h-6 max-[1200]:h-4 p-1' src={search} alt="search" />
          </div>
        </div>
        <div className=' absolute top-40  flex max-lg:flex-col justify-center items-center '>

          <WeatherCard
            Place={place}
            windspeed={wsp}
            Weather={weather}
            currentInfo={main}
            visibility={vis}
          />
          <div className=' flex flex-col backdrop-blur justify-center items-center'>

            <div className=' text-3xl font-extrabold'>7 Day Forecast</div>

            <div className=' lg:w-[40vw] max-[900px]:w-[360px] h-auto flex justify-center flex-wrap items-center' >

              {
                Data?.slice(1, 7).map(curr => {
                  return (
                    <Minicard
                      key={curr.dt}
                      image={curr.weather[0].main}
                      TimeZone={TimeZone}
                      sec={curr.dt}
                      temp={curr.temp.day}
                    />
                  )
                })
              }
            </div>

          </div>


        </div>
      </div>
    </>
  );
}

export default App;
