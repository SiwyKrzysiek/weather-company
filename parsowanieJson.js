
var data_url="https://api.openweathermap.org/data/2.5/weather?q=Warsaw,pl&APPID=7cad625ece0a657d34524777c3f14cfa";
getWeather(function (data) {
    var weather_html = data.weather[0].description + "&nbsp;" + data.main.temp;
    document.getElementById('opady').innerHTML = weather_html;
});

function getWeather(callback) {
    $.ajax({
        dataType: "jsonp",
        url: data_url,
        success: callback
    });
};
