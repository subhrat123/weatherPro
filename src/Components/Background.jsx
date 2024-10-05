import React, { useEffect, useState } from 'react';
import Clear from '../assets/Images/Clear.jpg';
import Cloudy from '../assets/Images/Cloud.jpg';
import Fog from '../assets/Images/Fog.png';
import Rainy from '../assets/Images/Rainy.jpg';
import Snow from '../assets/Images/Snow.jpg';
import Stormy from '../assets/Images/Stormy.jpg';
import Sunny from '../assets/Images/Sunny.jpg';
import haze from '../assets/Images/haze.jpg'
import Dust from '../assets/Images/Dust.jpg'


const Background = ({image}) => {
  
  const [Img, setImg] = useState(Cloudy);
const getimage=(im)=>{
  if(im){
    if(im.includes('clouds')) return Cloudy;
    if(im.includes('clear')) return Clear;
    if(im.includes('fog')) return Fog;
    if(im.includes('mist')) return Fog;
    if(im.includes('rain')) return Rainy;
    if(im.includes('drizzle')) return Rainy;
    if(im.includes('snow')) return Snow;
    if(im.includes('storm')) return Stormy;
    if(im.includes('sand')) return Dust;
    if(im.includes('dust')) return Dust;
    if(im.includes('sun')) return Sunny;
    if(im.includes('haze')) return haze;
    if(im.includes('smoke')) return haze;
  }
}

useEffect(() => {
 setImg(getimage(image));
}, [image])


  return (
    <img src={Img} alt="" className=' fixed object-cover h-screen w-screen left-0 top-0 -z-[10] bg-cyan-200'/>
    // <div className=' fixed object-cover h-screen w-screen left-0 top-0 -z-[10] bg-cyan-300'></div>
  );
};

export default Background;
