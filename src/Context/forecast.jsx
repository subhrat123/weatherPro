import { createContext, useEffect, useContext, useState } from "react";
import { useStateContext } from ".";

export const forecastContext = createContext();

export const ForecastProvider = ({ children, lat, lon }) => {
    const [Data, setData] = useState([]);
    //const [TimeZone, setTimeZone] = useState("");

    const apiKey=import.meta.env.VITE_API_KEY_2;

    const fetchedData = (info) => {
        // const { timezone, daily } = info;
        // setData(daily);
        // setTimeZone(timezone);
        if(!info) {
           console.log("no info found");
        }
        const time=info[0].dt_txt.split(" ")[1];
        const daily= info.filter((data)=>data.dt_txt.endsWith(time));
        console.log(daily);
       setData(daily);
    };

    const fetchData = async (latitude, longitude) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            );
            const data = await res.json();
            fetchedData(data.list);
            // console.log(data.list);
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
            }}
        >
            {children}
        </forecastContext.Provider>
    );
};
