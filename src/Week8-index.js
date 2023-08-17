function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10){hours =`0${hours}`};
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {minutes = `0${minutes}`};
  let year = currentDate.getFullYear();
  let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
  ];
  let day = days[currentDate.getDay()];

  let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[currentDate.getMonth()];

    return `${day}, ${date} ${month} ${year} ${hours}:${minutes}`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    return days[day];
  }

function diplayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
          forecastHTML =
              forecastHTML +
              `
          <div class="col-2">
            <div class="weather-forecast-date">
              ${formatDay(
                  forecastDay.dt
              )} </div><img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon
              }@2x.png" alt="" width="42px">

             <div class="weather-forecast-temperatures">
               <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
              )}°</span>
               <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
              )}°</span>
            </div>
          </div>
        `;
      }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


  
function getForecast(coordinates) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(diplayForecast);
}



function showWeather(response) {
  
  let city = document.querySelector("#city");
  let humidity = document.querySelector("#hum");
  let wind = document.querySelector("#win");
  let temperature = document.querySelector("#temperature");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = `${Math.round(celsiusTemperature)}`;
  city.innerHTML = response.data.name;

  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind speed: ${Math.round(response.data.wind.speed)} km/h`;
  
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
getForecast(response.data.coord);
  
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}


function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}



function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(showWeather);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let form1 = document.querySelector("#search-form");
form1.addEventListener("submit", searchCity);

navigator.geolocation.getCurrentPosition(retrievePosition);

let currentBut = document.querySelector("#currentlocation");
currentBut.addEventListener("click", searchCurrentLocation);


let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

