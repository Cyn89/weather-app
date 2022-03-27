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

///
// To display the days of the week shown in my forecast in js using html

function displayForecast(response) {
  console.log(response.data);
  let forecastElement=document.querySelector("#forecast");

  let forecastHTML=`<div class="row">`;
  let days = ["Sun","Mon", "Tue","Wed","Thu"];
  days.forEach(function(day) {
    forecastHTML=forecastHTML + `
    
            <div class="col">
                <div class="weekday-forecast">
                <div class="daily-weather-forecast">${day}</div>
                <img src="images/day_partial_cloud.png" class="weather-icon" width=50% />
                <div class="daily-weather-temperature">
                        <span class="weather-forecast-description">Snow</span> </br>
                        <span class="weather-forecast-temp-high">18° </span>
                        <span> | </span>
                        <span class="weather-forecast-temp-low">12° </span>
                </div>
                </div>
            </div>
     `;

  });
  

     forecastHTML=forecastHTML + `</div>`;
     forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9f8c20cce9ba65dfbd9f79a09894a608";
  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
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
  )} Km/H`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
  
  // to call lat & lon for the weekly forecast
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "9f8c20cce9ba65dfbd9f79a09894a608";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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

function displayFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp= (celsiusTemp*9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

 function displayCelsiusTemp(event){
  event.preventDefault();
    // remove the active class from the fahrenheit link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}


let celsiusTemp = null;



let submitBar = document.querySelector("form");
submitBar.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp); 


searchCity("New York");
