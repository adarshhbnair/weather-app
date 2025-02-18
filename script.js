const API_KEY = "e6409d77f86641b69b80e35899c3b951"; // Replace with your OpenWeather API key

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const cityName = document.getElementById("cityName");
    const weatherIcon = document.getElementById("weatherIcon");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const error = document.getElementById("error");

    // Reset previous data
    cityName.innerText = "";
    weatherIcon.style.display = "none";
    temperature.innerText = "";
    description.innerText = "";
    error.innerText = "";

    if (!city) {
        error.innerText = "Please enter a city name!";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            error.innerText = "City not found. Try again!";
            return;
        }

        cityName.innerText = `${data.name}, ${data.sys.country}`;
        temperature.innerText = `Temperature: ${data.main.temp}°C`;
        description.innerText = `${data.weather[0].description}`;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIcon.style.display = "block";
    } catch (err) {
        console.error("Error fetching weather data:", err);
        error.innerText = "Failed to fetch weather data. Check console for details.";
    }
}
