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

      localStorage.setItem(searchTerm, JSON.stringify(response));

      $("#cityName").find("span").html(searchTerm);
      $("#temperature").find("span").html(response.main.temp);

      $("#searchHistory").append("<button class='cityButton' data-city='"+searchTerm+"'>"+searchTerm+"</button>");

    });
    
};


$(".cityButton").on("click",
function () {
    var searchTerm = $(this).data("city");
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
  
        localStorage.setItem(searchTerm, JSON.stringify(response));
  
        $("#cityName").find("span").html(searchTerm);
        $("#temperature").find("span").html(response.main.temp);
  

  
      });
      
  }

 );



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
