"use strict";

let weatherData;

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
    renderTemperature();
    renderRain();
}

// Display temperature in html
function renderTemperature() {

}

// Display rain data in html
function renderRain() {

}


$(document).ready(() => {
    // TODO: Get city name from user/config
    displayWeather('Warsaw');
});