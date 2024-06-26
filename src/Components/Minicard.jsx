import React, { useState, useEffect, useContext } from 'react';
import { DateTime } from "luxon";
import cloud from '../assets/Icon/cloud.png';
import storm from '../assets/Icon/storm.png';
import fog from '../assets/Icon/fog.png';
import rain from '../assets/Icon/rain.png';
import snow from '../assets/Icon/snow.png';
import sun from '../assets/Icon/sun.png';
import windy from '../assets/Icon/windy.png';
import Haze from '../assets/Icon/Haze.png'

const Minicard = ({image,sec,TimeZone,temp}) => {
  const [Icon, setIcon] = useState(sun)

const getIcon =(image)=>{

console.log(image)
  if(image){
    if(image.includes("cloud")) return cloud;
    if(image.includes('storm')) return storm;
    if(image.includes('fog'))return fog;
    if(image.includes('rain')) return rain;
    if(image.includes('snow')) return snow;
    if(image.includes('sun')) return sun;
    if(image.includes('wind')) return windy;
    if(image.includes('haze')) return Haze;
    else return sun;
  }
}

useEffect(() => {
setIcon( getIcon(image?.toLowerCase())) ;

}, [image])



    const day=DateTime.fromSeconds(sec).setZone(TimeZone).toFormat('cccc, dd LLL');

  return (
    <div>
      <div className=' flex p-2 lg:w-auto shadow-xl flex-col w-[147px] h-auto rounded-lg m-4 justify-center gap-3 items-center backdrop-blur-xl '>
        <img src={Icon} alt="icon" className='w-20 h-20'/>
        <div>{day}</div>
        <div className=' text-xl font-extrabold'>{temp}°C</div>
      </div>
    </div>
  )
}

export default Minicard
