"use strict";

let weatherData;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const apiKey = "7cad625ece0a657d34524777c3f14cfa";
const urlBase = "https://api.openweathermap.org/data/2.5";
const urlWeather = `${urlBase}/weather`;
const urlForecast = `${urlBase}/forecast`;



$(document).ready(async () => {
    // TODO: Get city name from user/config
    let citi = "Warsaw";

    await renderForecastData();
    document.getElementById("refresh-weather").onclick = () => (displayWeather(citi));
    await displayWeather(citi);
});

// Get weather data and save it to View Model
async function getWeatherData(cityName) {
    const url = `${urlWeather}?q=${cityName},pl&APPID=${apiKey}`;
    try {
        // Get data from API
        const response = await fetch(url);
        weatherData = await response.json();

        console.log({ weatherData });

        // Add rain data
        weatherData.main.rain = (weatherData.main.rain && weatherData.main.rain["3h"]) || 0;
    } catch (e) {
        throw (e);
    }
}
async function getForecast(cityName){
    const url = `${urlForecast}?q=${cityName},pl&APPID=${apiKey}`;
    try {
        // Get data from API
        const response = await fetch(url);
        return await response.json();
        // Add rain data

    } catch (e) {
        throw (e);
    }

}

// Reload weather and update website
// Lousily couple with rendering by using view model
async function displayWeather(cityName) {
    try {
        await getWeatherData(cityName);

        renderWeather();
    } catch (e) {
        alert("Weather information is currently unavailable");
        throw e;
    }
}

// Display weather data in html
// Weather date is loaded from weatherData variable
function renderWeather() {
    const temperature = convertKelvinToCelsius(weatherData.main.temp);
    const rain = weatherData.main.rain;
    const wind = weatherData.wind.speed;

    renderTemperature(temperature);
    renderRain(rain);
    renderWind(wind);
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

function renderWind(wind) {
    const temp = wind.toFixed(2);
    const element = document.getElementById("wind");

    element.innerText = temp;
}


function convertKelvinToCelsius(tempInKelvin) {
    const diffrence = 273.15;
    return tempInKelvin - diffrence;
}

const getWeekFromToday = (date) => {
    const weekFromToday = [];
    weekFromToday.push(...days.slice(date.getDay(), days.length),...days.slice(0, date.getDay()) );
    return weekFromToday.map((day, index)=> {
        const dayDate = new Date(date.getTime());
        dayDate.setDate(date.getDate() + index);

        return {
            day,
            index,
            date: dayDate,
            month: monthNames[date.getMonth()]
        }
    });
}

const renderForecastData = async () => {
    const forecastData = await getForecast("Warsaw");
    const weekFromToday = getWeekFromToday(new Date());
    const daysHTML = weekFromToday.map((dataObject, index) => {
        if (index === 0) {
            return `
<div class="today forecast">
    <div class="forecast-header">
    <div class="day">${dataObject.day}</div>
    <div class="date">${dataObject.date.getDate()} ${dataObject.month}</div>
    <button class="refresh-button" id="refresh-weather">
    <i class="fa fa-refresh" aria-hidden="true"></i>
    </button>
    </div> <!-- .forecast-header -->
    <div class="forecast-content">
        <div class="location">Warsaw</div>
        <div class="degree">
            <div class="num"><span id="current-temp">NA</span><sup>o</sup>C</div>
            <div class="forecast-icon">
                <img src="images/icons/icon-1.svg" alt="" width=90>
            </div>
        </div>
        <span><img src="images/icon-umberella.png" alt=""><span id="current-rain"
        style="margin-right: 0;">NA</span></span>
        <span><img src="images/icon-wind.png" alt=""><span id="wind" style="margin-right: 5px;">NA</span>km/h</span>
        <span><img src="images/icon-compass.png" alt="">East</span>
    </div>
</div>`
        }

        const forecastIndex = (index - 1) * 8 + 4;
        let forecastNight = forecastData.list[forecastIndex - 4];
        let forecastDay = forecastData.list[forecastIndex];
        if (forecastDay === undefined) {
            forecastDay = forecastData.list[36];
            forecastNight = forecastData.list[32];
        }


        return `<div class="forecast">
            <div class="forecast-header">
            <div class="day">${dataObject.day}</div>
            </div> <!-- .forecast-header -->
            <div class="forecast-content">
            <div class="forecast-icon">
            <img src="images/icons/icon-3.svg" alt="" width=48>
            </div>
            <div class="degree">${convertKelvinToCelsius(forecastDay.main.temp).toFixed(2)}<sup>o</sup>C</div>
            <small>${convertKelvinToCelsius(forecastNight.main.temp).toFixed(2)}<sup>o</sup></small>
              </div>
        </div>`
    }).join("");
    document.getElementById("forecast").innerHTML = daysHTML;

};
