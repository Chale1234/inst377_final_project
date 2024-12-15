const host = window.location.origin;

document.addEventListener("DOMContentLoaded", () => {
    // Get references to the DOM elements
    const pollutionForm = document.getElementById('pollutionForm');
    const cityInput = document.getElementById('cityInput');
    const aqiValue = document.querySelector('.aqi-value');
    const pm25Value = document.querySelector('.aqi-card:nth-child(2) .aqi-value');
    const pm10Value = document.querySelector('.aqi-card:nth-child(3) .aqi-value');

    // API URL and key (You can replace this with your actual OpenWeather API key)
    const apiKey = '600eaf52a12ef0f14c6bae66defb0256';

    const baseUrl = 'https://openweathermap.org/api/air-pollution';
    //const baseUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={apiKey}`;

    // Event listener for the form submission
    pollutionForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const location = cityInput.value.trim();

        if (location) {
            fetchPollutionData(location);
        } else {
            alert('Please enter a valid city name or coordinates');
        }
    });

    // Fetch pollution data from the API
    function fetchPollutionData(location) {
        // We need to check if the input is a city name or coordinates
        const coordinates = location.split(',').map(coord => coord.trim());
        let url;

        if (coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
            // If the input is coordinates (latitude, longitude)
            url = `${baseUrl}?lat=${coordinates[0]}&lon=${coordinates[1]}&appid=${apiKey}`;
        } else {
            // If the input is a city name, we first need to get the coordinates using the OpenWeather Geocoding API
            const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
            
            fetch(geoUrl)
                .then(response => response.json())
                .then(data => {
                    const lat = data.coord.lat;
                    const lon = data.coord.lon;
                    // Now fetch pollution data using the coordinates
                    url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                    return fetch(url);
                })
                .then(response => response.json())
                .then(data => updatePollutionData(data))
                .catch(error => alert('Error fetching location data: ' + error.message));
            return; // Prevent the second fetch from happening before getting the coordinates
        }

        // If coordinates are valid, proceed to fetch pollution data directly
        fetch(url)
            .then(response => response.json())
            .then(data => updatePollutionData(data))
            .catch(error => alert('Error fetching pollution data: ' + error.message));
    }

    // Update pollution data on the page
    function updatePollutionData(data) {
        const aqi = data.list[0].main.aqi;
        const pm25 = data.list[0].components.pm2_5;
        const pm10 = data.list[0].components.pm10;

        // Display AQI, PM2.5, and PM10 data
        aqiValue.textContent = aqi || '--';
        pm25Value.textContent = pm25 ? `${pm25} μg/m³` : '--';
        pm10Value.textContent = pm10 ? `${pm10} μg/m³` : '--';

        // Update the AQI description
        let aqiDescription;
        if (aqi === 1) {
            aqiDescription = 'Good';
        } else if (aqi === 2) {
            aqiDescription = 'Moderate';
        } else if (aqi === 3) {
            aqiDescription = 'Unhealthy';
        } else {
            aqiDescription = 'Unknown';
        }

        const aqiDescriptionElement = document.querySelector('.aqi-card p');
        aqiDescriptionElement.textContent = aqiDescription;
    }
});