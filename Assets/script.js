//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=-6.2146&lon=106.8451&appid=75abdcee6ea6aefd99105a234a59bd7b";

// const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

// var today = dayjs();
// $("#currentDay").text(today.format("D MMMM YYYY"));    

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = '(' + dd + '/' + mm + '/' + yyyy + ')';
document.write(today);

// var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
// var day = currentDate.getDate()
// var month = currentDate.getMonth() + 1
// var year = currentDate.getFullYear()
// document.write("<b>" + day + "/" + month + "/" + year + "</b>")

// var currentDate = new Date();
// currentDate.setDate(currentDate.getDate() + 3);


const apiKey = "75abdcee6ea6aefd99105a234a59bd7b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=75abdcee6ea6aefd99105a234a59bd7b";

// const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";



const searchBox = document.querySelector(".left input");
const searchBtn = document.querySelector(".left button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
var data = await response.json();

console.log(data);


document.querySelector(".city").innerHTML = data.name + ' ' + today;
document.querySelector(".temp").innerHTML = "Temp: " + data.main.temp + " °C";
document.querySelector(".wind").innerHTML = "Wind: " + data.wind.speed + " km/h";
document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";

if(data.weather[0].main == "Clouds") {
  weatherIcon.src = "Assets/clouds.png";
} else  if (data.weather[0].main == "Clear"){
  weatherIcon.src = "Assets/clear.png";
} else  if (data.weather[0].main == "Rain"){
  weatherIcon.src = "Assets/rain.png";
} else  if (data.weather[0].main == "Drizzle"){
  weatherIcon.src = "Assets/drizzle.png";
} else  if (data.weather[0].main == "Mist"){
  weatherIcon.src = "Assets/mist.png";
}
}



searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
})

// Get Geo Location
var x = document.getElementById("input");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}
// console.log(position);
// console.log(showPosition);

// Apend the data to 5-Day Forecast.


// Save to Local Storage

{
  $(".searchButton").click(function () {
    var thisValue = $(this).siblings(".description").val();
    console.log(thisValue);

    var timeSlot = $(this).siblings(".description").attr("id");
    console.log(timeSlot);
    localStorage.setItem(timeSlot, thisValue);

    saveTask();
  });
}


// localStorage.setItem("inputSearch", );
// document.getElementById("demo").innerHTML = localStorage.getItem("lastname");

// Clear Search




function clearHistory(event){
  event.preventDefault();
  sCity=[];
  localStorage.removeItem("cityname");
  document.location.reload();

}


