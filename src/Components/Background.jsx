import React, { useEffect, useState } from 'react';
import Clear from '../assets/Images/Clear.jpg';
import Cloudy from '../assets/Images/Cloudy.jpg';
import Fog from '../assets/Images/Fog.png';
import Rainy from '../assets/Images/Rainy.jpg';
import Snow from '../assets/Images/Snow.jpg';
import Stormy from '../assets/Images/Stormy.jpg';
import Sunny from '../assets/Images/Sunny.jpg';
import haze from '../assets/Images/haze.jpg'



const Background = ({image}) => {
  
  const [Img, setImg] = useState(Cloudy);
const getimage=(im)=>{
  if(im){
    if(im.includes('clouds')) return Cloudy;
    if(im.includes('clear')) return Clear;
    if(im.includes('fog')) return Fog;
    if(im.includes('rain')) return Rainy;
    if(im.includes('snow')) return Snow;
    if(im.includes('storm')) return Stormy;
    if(im.includes('sun')) return Sunny;
    if(im.includes('haze')) return haze;
  }
}

useEffect(() => {
 setImg(getimage(image));
}, [image])


  return (
    <img src={Img} alt="bgimage" className=' fixed object-cover h-screen w-screen left-0 top-0 -z-[10]' />
  );
};

export default Background;
