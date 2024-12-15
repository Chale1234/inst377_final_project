// Redirect to the Weather forecast page once users input their city name

document.getElementById("cityForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        window.location.href = `WForecast.html?city=${encodeURIComponent(city)}`;
    } else {
        alert("Please enter a city name.");
    }
});

// Displays the weather forecast for random cities across the world

document.addEventListener("DOMContentLoaded", function() {

    // Array of random cities
    const cities = [
        "London", "New York", "Tokyo", "Paris", "Sydney", "Berlin", "Moscow", "Cape Town",
        "Rio de Janeiro", "Los Angeles", "Seoul", "Dubai", "Toronto", "Mexico City", "Cairo",
        "Rome", "Amsterdam", "Bangkok", "Singapore", "Hong Kong", "San Francisco", "Barcelona",
        "Lagos", "Buenos Aires", "Jakarta", "Kuala Lumpur", "Madrid", "Lima", "Mumbai",
        "Chennai", "Shanghai", "Istanbul", "Vancouver", "Santiago"
    ];

    function getRandomCity() {
        const randomIndex = Math.floor(Math.random() * cities.length);
        return cities[randomIndex];
    }

    // Function to fetch weather data for the selected city from the random cities array
    function getWeatherForCity(city) {
        const apiKey = "a16064f36be0fca16ada9c72c539273d"; // Replace with your actual API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Metric units for Celsius

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateWeatherInfo(data);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }

    // Update weather information for the random cities in the home page
    function updateWeatherInfo(data) {
        // Extract necessary data
        const { main, weather } = data;
        
        // Convert temperature from Celsius to Fahrenheit
        const tempInFahrenheit = (main.temp * 9/5) + 32;
        
        // Temperature
        const tempElement = document.querySelector(".weather-section .weather-card:nth-child(1) p");
        if (tempElement) {
            tempElement.textContent = `${tempInFahrenheit.toFixed(1)}°F`; // Display temperature in Fahrenheit
        }

        // Condition
        const conditionElement = document.querySelector(".weather-section .weather-card:nth-child(2) p");
        if (conditionElement) {
            conditionElement.textContent = weather[0].description;
        }

        // Humidity
        const humidityElement = document.querySelector(".weather-section .weather-card:nth-child(3) p");
        if (humidityElement) {
            humidityElement.textContent = `${main.humidity}%`;
        }
    }

    // Get a random city and update the title with city name
    const randomCity = getRandomCity();
    const weatherTitleElement = document.querySelector(".weather-section h2");

    if (weatherTitleElement) {
        weatherTitleElement.textContent = `Current Weather in ${randomCity}`;
    }

    // Fetch weather data for the random city 
    getWeatherForCity(randomCity);
});











