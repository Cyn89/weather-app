let now = new Date();
let h3 = document.querySelector(".date");
let date = now.getDate();
let hours = now.getHours();
if (hours<10) {
  hours=`0${hours}`;
}
let minutes = now.getMinutes();
if (minutes<10) {
  minutes=`0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h3.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

/// to call the week days on the  weekly forecast
function formatDay(timestamp){
let date = new Date(timestamp*1000);
let day = date.getDay();
let days=["Sun","Mon","Tue","Wed","Thu", "Fri","Sat"];

return days[day];
}

// To display the days of the week shown in my forecast in js using html
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`;
  
  forecast.forEach(function(forecastDay, index) {
    if (index<4) {
  forecastHTML=forecastHTML + `
    
            <div class="col">
                <div class="weekday-forecast">
                <div class="daily-weather-forecast">${formatDay(forecastDay.dt)}</div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" class="weather-icon" width=50% />
                <div class="daily-weather-temperature">
                        <span class="weather-forecast-description">${forecastDay.weather[0].description}</span> </br>
                        <span class="weather-forecast-temp-high">${Math.round(forecastDay.temp.max)}° </span>
                        <span> | </span>
                        <span class="weather-forecast-temp-low">${Math.round(forecastDay.temp.min)}° </span>
                </div>
                </div>
            </div>
     `;
    };
  });
  
     forecastHTML=forecastHTML + `</div>`;
     forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "9f8c20cce9ba65dfbd9f79a09894a608";
  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function searchWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#temperature-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} mph`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
  
  // to call lat & lon for the weekly forecast
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "9f8c20cce9ba65dfbd9f79a09894a608";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(searchWeather);
}

function searchLocation(position) {
  let apiKey = "9f8c20cce9ba65dfbd9f79a09894a608";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(searchWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  searchCity(city);
}



let submitBar = document.querySelector("form");
submitBar.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);



searchCity("New York");
