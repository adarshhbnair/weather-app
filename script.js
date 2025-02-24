document.getElementById("searchBtn").addEventListener("click", async function () {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "e6409d77f86641b69b80e35899c3b951"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    try {
        document.getElementById("errorMsg").classList.add("hidden");
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            showError("City not found. Please try again.");
            return;
        }

        document.getElementById("weatherResult").style.display = "block";
        document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

        const weatherIconCode = data.weather[0].icon;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

    } catch (error) {
        showError("Something went wrong. Please try again.");
    }
});

function showError(message) {
    document.getElementById("weatherResult").style.display = "none";
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
}