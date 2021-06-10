$("#futureWeather").hide();
$("#currentWeather").hide();
$("#searchHistory").hide();
var lat;
var lon;

var searchTerm = document.querySelector("#searchTerm").value;

var weatherData;
// get weather data and save to variable weatherData.

var todaysDate = moment().format("dddd MMMM Do YYYY, HHmm");
// Convert the `todaysDate` to the "MMM Do YY" format using `moment()`
var convertedDate = todaysDate;
// Log `convertedDate` into the console
console.log(convertedDate);

$("#todaysDate").text(convertedDate);

function getWeather() {
  var searchTerm = document.querySelector("#searchTerm").value;
  console.log(searchTerm);
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      searchTerm +
      "&appid=5b0024e8f1352a96b8859e9d81eabcea&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weatherData = response;
      console.log(weatherData);
      $("#currentWeather").show();
      $("#searchHistory").show();
lat = response.coord.lat;
lon = response.coord.lon;
console.log(lat);

      localStorage.setItem(searchTerm, JSON.stringify(response));
      $("#weatherIcon").find("img").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
      $("#cityName").find("span").html(searchTerm);
      $("#temperature").find("span").html(response.main.temp);

      $("#humidity").find("span").html(response.main.humidity);
      $("#windSpeed").find("span").html(response.wind.speed);

      $("#searchHistory").append("<button class='cityButton' data-city='+searchTerm+'>"+searchTerm+"</button>");
      $("#todaysDate").html(todaysDate);

      getForecast(searchTerm);
    });
};





function getForecast(searchTerm) {
  // var searchTerm = document.querySelector("#searchTerm").value;
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchTerm +
      "&appid=5b0024e8f1352a96b8859e9d81eabcea&units=imperial"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      forecastData = response;
      console.log(forecastData);

      localStorage.setItem(searchTerm, JSON.stringify(response));
$("#futureWeather").show();

      $("#forecastCityName").find("span").html(searchTerm);
      $("#forecastTemperature").find("span").html(response.list[4].main.temp);
      $("#forecastHumidity").find("span").html(response.list[4].main.humidity);
      $("#forecastWindSpeed").find("span").html(response.list[4].wind.speed);
      $("#forecastDate").find("span").html(response.list[4].dt_txt);

      $("#forecastCityName2").find("span").html(searchTerm);
      $("#forecastTemperature2").find("span").html(response.list[12].main.temp);
      $("#forecastHumidity2").find("span").html(response.list[12].main.humidity);
      $("#forecastWindSpeed2").find("span").html(response.list[12].wind.speed);
      $("#forecastDate2").find("span").html(response.list[12].dt_txt);

      $("#forecastCityName3").find("span").html(searchTerm);
      $("#forecastTemperature3").find("span").html(response.list[20].main.temp);
      $("#forecastHumidity3").find("span").html(response.list[20].main.humidity);
      $("#forecastWindSpeed3").find("span").html(response.list[20].wind.speed);
      $("#forecastDate3").find("span").html(response.list[20].dt_txt);

      $("#forecastCityName4").find("span").html(searchTerm);
      $("#forecastTemperature4").find("span").html(response.list[28].main.temp);
      $("#forecastHumidity4").find("span").html(response.list[28].main.humidity);
      $("#forecastWindSpeed4").find("span").html(response.list[28].wind.speed);
      $("#forecastDate4").find("span").html(response.list[28].dt_txt);

      $("#forecastCityName5").find("span").html(searchTerm);
      $("#forecastTemperature5").find("span").html(response.list[36].main.temp);
      $("#forecastHumidity5").find("span").html(response.list[36].main.humidity);
      $("#forecastWindSpeed5").find("span").html(response.list[36].wind.speed);
      $("#forecastDate5").find("span").html(response.list[36].dt_txt);
      
    });

};

$(".cityButton").on("click", getWeather);

 // hit enter - if the search term is "changed" this will work.  
$("#searchTerm").on("change", getWeather);

$(document).ready(function () {
  $(".row").each(function () {
    var time = $(this).data("time");
    var event = localStorage.getItem(time);
    $(this).find(".display-event").text(event);

    var currentTime = moment().format("HH00");

    // probably can use this IF statement for UV index.

    //   if (time > currentTime) {
    //     $(this).addClass("future");
    //   }
    //   else if (time < currentTime) {
    //     $(this).addClass("past");
    //   }
    //   else {
    //       $(this).addClass("present");
    //   }
  });
});
