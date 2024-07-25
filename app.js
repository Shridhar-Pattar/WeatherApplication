document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const input = document.querySelector('.input');
    const resultsDiv = document.getElementById('weather-results');
    const apiKey = 'bfa1f00c3ef64b4c8a8185236242507'; // Your WeatherAPI key

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const cityName = input.value;
        if (!cityName) {
            resultsDiv.textContent = 'Please enter a city name.';
            return;
        }

        try {
            // Fetch weather data from WeatherAPI
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data.error) {
                resultsDiv.textContent = 'City not found.';
                return;
            }

            // Extract and display weather information
            const temperature = data.current.temp_c;
            const windSpeed = data.current.wind_kph;
            const weatherDescription = data.current.condition.text;
            const location = data.location.name;

            resultsDiv.innerHTML = `
                <h2>Current Weather in ${location}</h2>
                <p>Temperature: ${temperature} °C</p>
                <p>Wind Speed: ${windSpeed} kph</p>
                <p>Weather: ${weatherDescription}</p>
            `;
        } catch (error) {
            console.error('Fetch error:', error);
            resultsDiv.textContent = 'Failed to fetch weather data. Please try again.';
        }
    });
});
