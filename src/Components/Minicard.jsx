import React from "react";
import cloud from "../assets/Icon/cloud.png";
import storm from "../assets/Icon/storm.png";
import fog from "../assets/Icon/fog.png";
import rain from "../assets/Icon/rain.png";
import snow from "../assets/Icon/snow.png";
import sun from "../assets/Icon/sun.png";
import windy from "../assets/Icon/windy.png";
import Haze from "../assets/Icon/Haze.png";

const weatherIcons = {
  cloud, storm, fog, rain, snow, sun, wind: windy, haze: Haze
};

const Minicard = ({ image = "", sec, temp }) => {
  // Determine weather icon
  const imageKey = Object.keys(weatherIcons).find((key) => image.toLowerCase().includes(key)) || "sun";
  const Icon = weatherIcons[imageKey];

  const date = new Date(sec); 
  const day = date.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="flex p-2 shadow-xl flex-col w-[147px] h-auto rounded-lg m-4 justify-center gap-3 items-center backdrop-blur-xl">
      <img src={Icon} alt="Weather icon" className="w-20 drop-shadow-2xl h-30" />
      <div>{day}</div>
      <div className="text-xl font-extrabold">{temp}°C</div>
    </div>
  );
};

export default Minicard;
