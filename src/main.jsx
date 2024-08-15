import React from 'react';
import ReactDOM from 'react-dom/client';
import { StateContextProvider, useStateContext } from './Context/index.jsx';
import { ForecastProvider } from './Context/forecast.jsx';
import App from './App.jsx';
import './index.css';

const Root = () => {
  const { lon, lat } =useStateContext(); 

  return (
    <ForecastProvider  lat={lat} lon={lon}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ForecastProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <StateContextProvider>
    <Root />
  </StateContextProvider>
);

