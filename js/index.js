"use strict";

let weatherData;

$(document).ready(() => {
    // TODO: Get city name from user/config
    let citi = "Warsaw";

    document.getElementById("refresh-weather").onclick = () => (displayWeather(citi));
    displayWeather(citi);
});

// Get weather data and save it to View Model
async function getWeatherData(cityName) {
    const apiKey = "7cad625ece0a657d34524777c3f14cfa";
    const urlBase = "https://api.openweathermap.org/data/2.5/weather"

    const url = `${urlBase}?q=${cityName},pl&APPID=${apiKey}`;

    try {
        // Get data from API
        const response = await fetch(url);
        weatherData = await response.json();

        // Add rain data
        weatherData.main.rain = mockRainData();
    }
    catch (e) {
        throw (e);
    }
}

// Returns rain percentage from 0 to 100
function mockRainData() {
    // TODO: Use cloud data
    return Math.random() * 100;
}

// Reload weather and update website
// Lousily couple with rendering by using view model
async function displayWeather(cityName) {
    try {
        await getWeatherData(cityName);

        renderWeather();
    }
    catch (e) {
        alert("Weather information is currently unavailable");
    }
}

// Display weather data in html
// Weather date is loaded from weatherData variable
function renderWeather() {
    console.log(weatherData);
    const temperature = convertKelvinToCelsius(weatherData.main.temp);
    const rain = weatherData.main.rain;

    renderTemperature(temperature);
    renderRain(rain);
}

// Display temperature in html
// temperature - temperature in Celsius degrees
function renderTemperature(temperature) {
    const temp = temperature.toFixed(2);
    const element = document.getElementById("current-temp");

    element.innerText = temp;
}

// Display rain data in html
function renderRain(rainPercentage) {
    const percentage = rainPercentage.toFixed(0);
    const element = document.getElementById("current-rain");

    element.innerText = percentage;
}

function convertKelvinToCelsius(tempInKelvin) {
    const diffrence = 273.15;
    return tempInKelvin - diffrence;
}