"use strict";

let weatherData;
let moodName, moodInfo, moodImage;

$(document).ready(() => {
    // TODO: Get city name from user/config
    let citi = "Warsaw";

    document.getElementById("refresh-weather").onclick = () => (displayWeather(citi));
    displayWeather(citi);

    renderMood();
    displayMood();
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

function renderMood() {
    let d = new Date().getDay();
    //hand-made random number generator:
    let moodCode = ((d * 11) % 137) % 5;

    switch (moodCode) {
        case 0:
            moodName = "Zdenerwowanie";
            moodInfo = "Inni mogą być dzisiaj nieco poddenerwowani. Bądź cierpliwy i wyrozumiały. Nie planuj ważnych spotkań ani kluczowych negocjacji, a jeśli nie możesz ich uniknąć, zadbaj o miłą atmosferę już od początku spotkania - paradoksalnie, miły gest może zdziałać więcej niż trafienie na dobry nastrój rozmówcy.";
            moodImage = "angry";
            break;

        case 1:
            moodName = "Radość";
            moodInfo = "Dzisiaj możesz spodziewać się wesołych nastrojów u innych ludzi. Warto podchodzić do ważnych biznesowych rozmów, oraz produktywnie spędzić czas. Może warto wykorzystać ten dobry dzień, aby zapoznać sie z kimś nowym podczas przerwy?";
            moodImage = "happy";
            break;

        case 2:
            moodName = "Smutek";
            moodInfo = "Dzisiaj wszyscy mogą mieć nieco gorszy dzień. Staraj się unikać nadmiernej krytyki, zwłaszcza gdy może być spowodowana Twoim gorszym nastrojem. Nie szukaj ucieczki w kieliszku.";
            moodImage = "sad";
            break;

        case 3:
            moodName = "Neutralny";
            moodInfo = "Dzisiejsza pogoda sprzyja spokojnym nastrojom. Spodziewaj się profesjonalnych współpracowników i klientów. To dobry dzień, aby planować duże projekty i omawiać istotne problemy - Twój zespół będzie mysleć rzeczowo i analitycznie, zostawiając emocje na drugim planie.";
            moodImage = "neutral";
            break;

        case 4:
            moodName = "Euforia";
            moodInfo = "Dzisiaj możesz spodziewać się wesołych nastrojów u innych ludzi. Warto podchodzić do ważnych biznesowych rozmów, oraz produktywnie spędzić czas. Może warto wykorzystać ten dobry dzień, aby zapoznać sie z kimś nowym podczas przerwy?";
            moodImage = "euphoric";
            break;

        default:
            moodName = "error"
            moodInfo = "error";
    }

    
}

function displayMood() {
    const mName = document.getElementById("mName");
    mName.innerText = moodName;

    const mImage = document.getElementById("mImage");
    mImage.src = "images/" + moodImage + ".png";

    const mInfo = document.getElementById("mInfo");
    mInfo.innerText = moodInfo;
}