import React, { useState } from 'react';
import './Weather.css';
import axios from 'axios';

//icons
import { FaSearch } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";



function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);


    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b041e8df6f157e889685221a84c668d6`;

    async function weatherapi() {
        try {
            const response = await axios.get(apiUrl);
            setWeatherData(response.data);
            console.log(response.data)
            setError(null); // Reset error state if successful
        } catch (error) {
            console.log('Error fetching weather data:', error);
            setError('No data Found. Enter a valid city Name');
            setWeatherData(null); // Reset weather data on error
        }
    }
    return (
        <div className='container'>
            <div className='city'>
                <input
                    onChange={e => setCity(e.target.value)}
                    value={city}
                    type='text'
                    placeholder='Enter your city'
                />
                <button type='submit' onClick={weatherapi}><FaSearch /></button>
            </div>
            {weatherData && (
                <div className='content'>
                    <div className='weather-image'>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather-logo" />
                        <h2 className="description">{weatherData.weather[0].description}</h2>
                    </div>
                    <div className="temp">
                        <h1>{weatherData.main.temp}</h1>
                        <span className='degree'>&deg;C</span>
                    </div>
                    <div className="city-country">
                    <ImLocation className='location' />{weatherData.name},{weatherData.sys.country}
                    </div>
                    <div className="weatherstats">
                        <div className="speed">
                        <FaWind className='wind-logo' />
                        <h3 className='measure'>{weatherData.wind.speed}km/h</h3>
                        <h1>Wind</h1>
                        </div>
                        <div className="humidity">
                        <WiHumidity className='humidity-logo'/>
                        <h3 className='measure'>{weatherData.main.humidity}%</h3>
                        <h1>Humidity</h1>
                        </div>
                    </div>
                </div>
            )}
            {error && <p className='error'>{error}</p>}
        </div>
    );
}

export default Weather;

