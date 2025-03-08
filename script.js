document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfo = document.getElementById('weather-info');

    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            weatherInfo.innerHTML = '<p>Please enter a city name.</p>';
        }
    });

    async function fetchWeather(city) {
        try {
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
            const data = await response.json();

            if (data.cod === 200) {
                const { name, main, weather, wind } = data;
                weatherInfo.innerHTML = `
                    <h2>${name}</h2>
                    <p>Temperature: ${main.temp}°C</p>
                    <p>Weather: ${weather[0].description}</p>
                    <p>Humidity: ${main.humidity}%</p>
                    <p>Wind Speed: ${wind.speed} m/s</p>
                `;
            } else {
                weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
            }
        } catch (error) {
            weatherInfo.innerHTML = `<p>An error occurred. Please try again later.</p>`;
        }
    }
});