
//If anything does not understand go and use chatgpt you will be clear.

document.addEventListener("DOMContentLoaded", () => {
  // Select HTML elements
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message"); // fixed typo

  const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; // API key for OpenWeatherMap

  // Event listener for button click
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim(); // get input value and remove spaces
    if (!city) return; // if input is empty, do nothing

    try {
      const weatherData = await fetchWeatherData(city); // fetch weather
      displayWeatherData(weatherData); // show weather on page
    } catch (error) {
      showError(); // show error message if API fails
    }
  });

  // Fetch weather data from OpenWeatherMap API
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url); // call API
    console.log(typeof response); // check type of response
    console.log("RESPONSE", response); // log response

    if (!response.ok) {
      throw new Error("City Not Found"); // throw error if city not found
    }
    const data = await response.json(); // convert response to JSON
    return data; // return data
  }

  // Display weather data in HTML
  function displayWeatherData(data) {
    console.log(data);
    const { name, main, weather } = data; // destructuring search more on chatgpt you will be clear.
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden"); // show weather info
    errorMessage.classList.add("hidden"); // hide error message
  }

  // Show error message
  function showError() {
    weatherInfo.classList.add("hidden"); // hide weather info
    errorMessage.classList.remove("hidden"); // show error
  }
});
