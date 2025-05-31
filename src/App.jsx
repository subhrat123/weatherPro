import React, { useContext, useState } from "react";
import { Si2Fas } from "react-icons/si";
import "./App.css";
import { useStateContext } from "./Context";
import { forecastContext } from "./Context/forecast";
import Background from "./Components/Background";
import WeatherCard from "./Components/WeatherCard";
import Minicard from "./Components/Minicard";
import search from "./assets/Icon/search.svg";
import Chatbot from "./Components/Chatbot";
import { TbMessageChatbotFilled } from "react-icons/tb";

function App() {
  const { weather, main, setplace, wsp, vis, place } = useStateContext();
  // console.log(weather, main, wsp, vis, place);
  const { Data } = useContext(forecastContext);
  const [input, setInput] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);

  const handleInputChange = (e) => setInput(e.target.value);
  const submitCity = () => {
    setplace(input);
    setInput("");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative font-sans">
      {/* Background Image */}
      <Background image={weather} />

      {/* Header Section */}
      <header className="w-full absolute top-0 flex justify-between items-center p-6">
        <div className="text-yellow-700 bg-white shadow-lg px-5 py-2 rounded-xl text-3xl font-bold tracking-wide drop-shadow-lg">
          WeatherPro
        </div>

        {/* Search Input & Button */}
        <div className="flex gap-3">
          <div className="flex bg-white border-2 rounded-full px-3 py-1 items-center shadow-md">
            <input
              type="text"
              placeholder="Search city"
              className="focus:outline-none text-gray-950 w-32 md:w-40 lg:w-60 text-lg bg-transparent"
              value={input}
              onChange={handleInputChange}
              onKeyUp={(e) => e.key === "Enter" && submitCity()}
            />
            <img className="h-6 cursor-pointer" onClick={submitCity} src={search} alt="search" />
          </div>
          <button
            onClick={submitCity}
            className="hidden md:flex bg-gradient-to-r from-green-400 to-blue-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Search
          </button>
        </div>
      </header>

      {/* Weather & Forecast Section */}
      <main className="absolute top-40 w-full flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-10 p-3">
          {/* Main Weather Card */}
          <WeatherCard Place={place} windspeed={wsp} Weather={weather} currentInfo={main} visibility={vis} />

          {/* 5-Day Forecast Section */}
          <div className="flex flex-col items-center justify-center bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Data?.map((curr) => (
                <Minicard key={curr.dt} image={curr.weather[0].main} sec={curr.dt_txt} temp={curr.main.temp} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot Section */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end">
        {showChatbot && (
          <div className="mt-3   p-3 rounded-lg shadow-2xl animate-fade-in">
            
            <Chatbot />
          </div>
        )}

        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="p-4 bg-blue-600 text-white rounded-full shadow-xl hover:scale-110 transition-all duration-300"
        >
          <TbMessageChatbotFilled size={50} />
        </button>

      </div>
    </div>
  );
}

export default App;
