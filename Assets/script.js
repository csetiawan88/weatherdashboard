var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

var searchHistory = JSON.parse(localStorage.getItem("search-history")) || [];

// Get Current Date
today = "(" + yyyy + "-" + mm + "-" + dd + ")";

// Open Weather API and Key
const apiKey = "75abdcee6ea6aefd99105a234a59bd7b";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl3 =
  "https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}";

const searchBox = document.querySelector(".left input");
const searchBtn = document.querySelector(".left button");
const weatherIcon = document.querySelector(".weather-icon");

// Geolocation - Fetch the data from API
function geoLoc(city) {
  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      getWeather(data[0]);
    })
    .catch(function (err) {
      console.error(err);
    });
}

// 5 day forecast append to index.html & Fetch the data from API
function getWeather(city) {
  const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=75abdcee6ea6aefd99105a234a59bd7b`;
  fetch(apiUrl2)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      let day = 1;
      for (let i = 7; i < data.list.length; i += 8) {
        document.querySelector(`.date${day}`).innerHTML = data.list[
          i
        ].dt_txt.slice(0, 10);
        document.querySelector(
          `.icon${day}`
        ).src = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        document.querySelector(`.temp${day}`).innerHTML =
          "Temp: " + data.list[i].main.temp + " °C";
        document.querySelector(`.wind${day}`).innerHTML =
          "Wind: " + data.list[i].wind.speed + " km/h";
        document.querySelector(`.humidity${day}`).innerHTML =
          "Humidity: " + data.list[i].main.humidity + "%";
        day++;
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function geoLocation(city) {
  fetch(apiUrl3 + `q=${search}` + `&appid=${apiKey}`).then(function (res) {
    return res.json();
  });
  then().catch();
}

//Current date city details
async function checkWeather(city) {
  getWeather(city);
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  document.querySelector(".city").innerHTML = data.name + " " + today;
  document.querySelector(".temp").innerHTML = "Temp: " + data.main.temp + " °C";
  document.querySelector(".wind").innerHTML =
    "Wind: " + data.wind.speed + " km/h";
  document.querySelector(".humidity").innerHTML =
    "Humidity: " + data.main.humidity + "%";
  weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  // Another Alternative to Show the icon without using Open weather Icon API.
  // if(data.weather[0].main == "Clouds") {
  //   weatherIcon.src = "Assets/clouds.png";
  // } else  if (data.weather[0].main == "Clear"){
  //   weatherIcon.src = "Assets/clear.png";
  // } else  if (data.weather[0].main == "Rain"){
  //   weatherIcon.src = "Assets/rain.png";
  // } else  if (data.weather[0].main == "Drizzle"){
  //   weatherIcon.src = "Assets/drizzle.png";
  // } else  if (data.weather[0].main == "Mist"){
  //   weatherIcon.src = "Assets/mist.png";
  // }
}

// Search Button Function , calling the current weather and store into local storage
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
  storeCity(searchBox.value);

  const createButton = document.createElement("button");
  createButton.textContent = searchBox.value;

  createButton.addEventListener("click", (event) => {
    console.log(event.target.innerHTML);
    checkWeather(event.target.innerHTML);
  });

  document.querySelector(".searchHistoryHtml").appendChild(createButton);
});

// Save to Local Storage
function storeCity(city) {
  console.log("[]", searchHistory);
  searchHistory.push(city);
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
}

// Clear Search Button
document
  .getElementsByClassName("clearSearch")[0]
  .addEventListener("click", clearHistory);
function clearHistory(event) {
  //clear localStorage with key search-history
  localStorage.removeItem("search-history");
  //clear DOM
  document.getElementsByClassName("searchHistoryHtml")[0].innerHTML = "";
}

// Search city history list function
function display() {
  const city = JSON.parse(localStorage.getItem("search-history")) || [];
  console.log(city);

  //create for loop
  for (let index = 0; index < city.length; index++) {
    const cityName = city[index];

    // create button to append to that city
    const createButton = document.createElement("button");

    // create button element
    // set button element textContent to city
    createButton.textContent = cityName;

    // add event listner to the button element
    createButton.addEventListener("click", (event) => {
      console.log(event.target.innerHTML);
      checkWeather(event.target.innerHTML);
    });

    document.querySelector(".searchHistoryHtml").appendChild(createButton);
  }
}

display();
