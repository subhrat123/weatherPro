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

  const { Data } = useContext(forecastContext);



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

        <Background image={weather} />


        <div className='p-4 w-full absolute m-6 top-0 flex justify-around'>
          <div className='  font-serif font-bold text-3xl'>
            WeatherPro
          </div>
          <div className='md:flex gap-2'>

            <div className='border-2 rounded-md p-1  max-sm:h-8 bg-white flex justify-center items-center'>
              <input
                type="text"
                placeholder='Search city'
                className='focus:outline-none text-center text-gray-950 w-28'
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

              <img className=' md:hidden h-8 p-1' onClick={submitCity} src={search} alt="search" />
            </div>
            <button onClick={submitCity} className=' flex max-md:hidden text-gray-950 bg-green-300 p-2 rounded-md shadow-xl'><img className='h-5' onClick={submitCity} src={search} alt="search" />search</button>
          </div>
        </div>
        <div className=' absolute top-60 max-md:w-[350px] p-[30px] backdrop-blur-2xl flex max-lg:flex-col justify-center items-center gap-10'>

          <WeatherCard
            Place={place}
            windspeed={wsp}
            Weather={weather}
            currentInfo={main}
            visibility={vis}
          />
          <div className=' flex flex-col items-center justify-center'>

            <div className=' text-2xl font-bold'>5 Day Forecast</div>

            <div className=' lg:w-[39vw] max-sm:w-[360px] h-auto flex justify-between flex-wrap items-center' >

              {
                Data?.map(curr => {
                  return (
                    <Minicard
                      key={curr.dt}
                      image={curr.weather[0].main}                  
                      sec={curr.dt_txt}
                      temp={curr.main.temp}
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
