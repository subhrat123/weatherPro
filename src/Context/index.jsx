import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios"

const stateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setweather] = useState(null);
    const [main, setmain] = useState("")
    const [lon, setlon] = useState("");
    const [lat, setlat] = useState("");
    const [wsp, setwsp] = useState("");
    const [place, setplace] = useState('pune');
    const [vis, setVis] = useState("")


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