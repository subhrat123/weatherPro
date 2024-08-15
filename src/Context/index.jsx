import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios"

const stateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setweather] = useState(null);
    const [main, setmain] = useState("")
    const [lon, setlon] = useState("");
    const [lat, setlat] = useState("");
    const [wsp, setwsp] = useState("");
    const [vis, setVis] = useState("")
    const [place, setplace] = useState('delhi');
   
    const getCurrentLocation=()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const latitude=position.coords.latitude;
                    const longitude=position.coords.longitude;
                    getcity(latitude,longitude);
                    console.log(position);
                }
            )
        }
    }

    async function getcity(latitude,longitude){
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        try{
            const res=await fetch(apiUrl);
            const data=await res.json();
            console.log(data);
            setplace(data.address.state_district.split(" ")[0].toLowerCase())
        }catch(e){
            console.log("error in getcity function");
        }
    }

    useEffect(() => {
      getCurrentLocation();
    }, [])
    





    const fetchedData = (data) => {

        const { weather, coord, wind, main, visibility, dt } = data;

        setweather(weather[0].main.toLowerCase());
        setlon(coord.lon);
        setlat(coord.lat);
        setmain(main);
        setwsp(wind.speed);
        setVis(visibility);
    }

    const apiKey=import.meta.env.VITE_API_KEY_1;

    
    const currentWeather = async () => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`);
            fetchedData(await res.json());
        }
        catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        currentWeather();
    }, [place])

    return (
        <stateContext.Provider value={{
            weather,
            main,
            setplace,
            wsp,
            vis,
            place,
            lat,
            lon,
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);