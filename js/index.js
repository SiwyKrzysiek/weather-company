"use strict";

async function getWeatherData(cityName) {
    const apiKey = "7cad625ece0a657d34524777c3f14cfa";
    const urlBase = "https://api.openweathermap.org/data/2.5/weather"

    const url = `${urlBase}?q=${cityName},pl&APPID=${apiKey}`;

    return fetch(url);
}

// Reload weather and update website
async function displayWeather() {
    try {
        let response = await getWeatherData('Warsaw');
        console.log(response);
    }
    catch (e) {
        alert("Weather information is currently unavailable");
    }
}


$(document).ready(() => {
    displayWeather();
});