document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");

    if (city) {
        document.getElementById("location-name").textContent = city;
        fetchWeatherData(city);
    } else {
        document.getElementById("location-name").textContent = "Unknown Location";
        alert("City not provided. Please go back and enter a city name.");
    }

    function fetchWeatherData(city) {
        const apiKey = "a16064f36be0fca16ada9c72c539273d";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
        
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                updateWeatherDetails(data);

                // Fetch the coordinates (lat, lon) of the city for the weather map
                const coords = { lat: data.coord.lat, lon: data.coord.lon };
                showWeatherMap(coords); // Pass the coordinates to display the weather map
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                alert("Error fetching weather data. Please try again.");
            });
    }

    function updateWeatherDetails(data) {
        const { main, weather, name } = data;

        // location name
        const locationElement = document.getElementById("location-name");
        if (locationElement) {
            locationElement.textContent = name;
        }

        // convert Celsius to Fahrenheit
        const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5) + 32;

        // temperature
        const tempElement = document.querySelector(".weather-info .weather-card:nth-child(1) p");
        if (tempElement) {
            tempElement.textContent = `${celsiusToFahrenheit(main.temp).toFixed(1)}°F`;
        }

        // feels_like
        const feelsLikeElement = document.querySelector(".weather-info .weather-card:nth-child(2) p");
        if (feelsLikeElement) {
            feelsLikeElement.textContent = `${celsiusToFahrenheit(main.feels_like).toFixed(1)}°F`;
        }

        // min temperature
        const tempMinElement = document.querySelector(".weather-info .weather-card:nth-child(3) p");
        if (tempMinElement) {
            tempMinElement.textContent = `${celsiusToFahrenheit(main.temp_min).toFixed(1)}°F`;
        }

        // max temperature
        const tempMaxElement = document.querySelector(".weather-info .weather-card:nth-child(4) p");
        if (tempMaxElement) {
            tempMaxElement.textContent = `${celsiusToFahrenheit(main.temp_max).toFixed(1)}°F`;
        }

        // pressure
        const pressureElement = document.querySelector(".weather-info .weather-card:nth-child(5) p");
        if (pressureElement) {
            pressureElement.textContent = `${main.pressure} hPa`;
        }

        // humidity
        const humidityElement = document.querySelector(".weather-info .weather-card:nth-child(6) p");
        if (humidityElement) {
            humidityElement.textContent = `${main.humidity}%`;
        }

        // condition
        const conditionElement = document.querySelector(".weather-info .weather-card:nth-child(7) p");
        if (conditionElement) {
            conditionElement.textContent = `${weather[0].description}`;
        }
    }

    function showWeatherMap(coords) {
        // Initialize the map with the coordinates of the city
        const map = L.map('weather-map').setView([coords.lat, coords.lon], 10); // Set the center based on the city's coordinates

        // Add OpenStreetMap tiles to the map
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Add the OpenWeatherMap weather layer (temperature in this case)
        L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=a16064f36be0fca16ada9c72c539273d`).addTo(map);

        window.addEventListener('resize', () => {
            map.invalidateSize(); // Recalculate map size on window resize
        });
    }
});