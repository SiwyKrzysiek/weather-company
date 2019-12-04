"use strict";

let weatherData;

$(document).ready(() => {
    // TODO: Get city name from user/config
    displayWeather('Warsaw');
});

async function getWeatherData(cityName) {
    const apiKey = "7cad625ece0a657d34524777c3f14cfa";
    const urlBase = "https://api.openweathermap.org/data/2.5/weather"

    const url = `${urlBase}?q=${cityName},pl&APPID=${apiKey}`;

    return fetch(url);
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
        let response = await getWeatherData(cityName);
        weatherData = await response.json();

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
    const rain = mockRainData();

    renderTemperature(temperature);
    renderRain(rain);
}

// Display temperature in html
// temperature - temperature in Celsius degrees
function renderTemperature(temperature) {
    const temp = temperature.toFixed(2);
    const tempSpan = document.getElementById("current-temp");

    tempSpan.innerText = temp;
}

// Display rain data in html
function renderRain(rainPercentage) {
    const percentage = rainPercentage.toFixed(0);
    console.log(percentage);
}

function convertKelvinToCelsius(tempInKelvin) {
    const diffrence = 273.15;
    return tempInKelvin - diffrence;
}