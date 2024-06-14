import { createContext, useEffect, useContext, useState } from "react";
import { useStateContext } from ".";

export const forecastContext = createContext();

export const ForecastProvider = ({ children, lat, lon }) => {
    const [Data, setData] = useState([]);
    const [TimeZone, setTimeZone] = useState("");

    const apiKey=import.meta.env.VITE_API_KEY_2;

    const fetchedData = (info) => {
        const { timezone, daily } = info;
        setData(daily);
        setTimeZone(timezone);
    };

    const fetchData = async (latitude, longitude) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`
            );
            const data = await res.json();
            fetchedData(data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const func = async () => {
            await fetchData(lat, lon);
        };
        if (lat && lon) {
            func();
        }
    }, [lat, lon]);

    return (
        <forecastContext.Provider
            value={{
                Data,
                TimeZone,
            }}
        >
            {children}
        </forecastContext.Provider>
    );
};
