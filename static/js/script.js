function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    const weatherCard=document.getElementById('weather-card');
    const loading=document.getElementById('loading');
    const errorMessage=document.getElementById('error-message');
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.classList.add('show');
        return;
    }
    loading.style.display = 'block';   
    weatherCard.style.display = 'none';
    fetch(`/weather`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: city })
    })
    .then(response => response.json())
    .then(data => {
        loading.style.display = 'none';
        if (data.error) {
            errorMessage.textContent = data.error;
            errorMessage.classList.add('show');
            return;
        }
        document.getElementById('city-name').textContent = `${data.city}, ${data.country}`;
        document.getElementById('weather-description').textContent = `${data.description}`;
        document.getElementById('temperature').textContent = `${data.temperature}`;
        document.getElementById('feels-like').textContent = `Feels Like: ${data.feels_like}°C`;
        document.getElementById('temp-min').textContent = `${data.temp_min}°C`;
        document.getElementById('temp-max').textContent = `${data.temp_max}°C`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('pressure').textContent = `${data.pressure} hPa`;
        document.getElementById('wind-speed').textContent = `${data.wind_speed} m/s`;
        document.getElementById('cloudiness').textContent = `${data.cloudiness}%`;
        document.getElementById('visibility').textContent = `${data.visibility} km`;
        const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
        document.getElementById('weather-icon').src = iconUrl;
        weatherCard.style.display = 'block';
    })
    .catch(error => {
        loading.style.display = 'none';
        errorMessage.textContent = 'An error occurred while fetching the weather data.';
        errorMessage.classList.add('show');
        console.error('Error fetching weather data:', error);
    });
    document.getElementById('city-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
}