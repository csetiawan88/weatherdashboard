//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=-6.2146&lon=106.8451&appid=75abdcee6ea6aefd99105a234a59bd7b";

// const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

// var today = dayjs();
// $("#currentDay").text(today.format("D MMMM YYYY"));    

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var searchHistory = JSON.parse(localStorage.getItem('search-history')) || [];

today = '(' + yyyy+ '-' + mm + '-' + dd + ')';
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

//const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=75abdcee6ea6aefd99105a234a59bd7b`;

const apiUrl3 = "https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}";

// const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";



const searchBox = document.querySelector(".left input");
const searchBtn = document.querySelector(".left button");
const weatherIcon = document.querySelector(".weather-icon");

//Geolocation
function geoLoc(city){

  var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}&units=metric`;
  fetch(url)
  .then(function(res) {return res.json()})
  .then(function(data) {getWeather(data[0])})
  .catch(function (err) {
    console.error(err);
  });
}

// 5 day forecast append to index.html
function getWeather (city){
  // var lat = city.lat
  // var lon = city.lon
  // console.log(lat,lon);
  const apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=75abdcee6ea6aefd99105a234a59bd7b`;
  fetch(apiUrl2)
  .then(function(res) {return res.json()})
  .then(function(data) {
    console.log(data)
    let day = 1;
      for (let i = 7; i < data.list.length; i+= 8) {
        document.querySelector(`.date${day}`).innerHTML = data.list[i].dt_txt.slice(0,10);
        document.querySelector(`.icon${day}`).src=`http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        document.querySelector(`.temp${day}`).innerHTML = "Temp: " + data.list[i].main.temp + " °C";
        document.querySelector(`.wind${day}`).innerHTML = "Wind: " + data.list[i].wind.speed + " km/h";
        document.querySelector(`.humidity${day}`).innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
        day++;
      }
 
  })
  .catch(function (err) {
    console.error(err);
    
  });
}

function geoLocation(city) {
  fetch(apiUrl3 + `q=${search}` + `&appid=${apiKey}`).then(function(res) {return res.json()});
  then()
  .catch()
}
//Apend the data to index.html


//Current date city details

async function checkWeather(city){
  getWeather(city);
const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
var data = await response.json();

console.log(data);


document.querySelector(".city").innerHTML = data.name + ' ' + today;
document.querySelector(".temp").innerHTML = "Temp: " + data.main.temp + " °C";
document.querySelector(".wind").innerHTML = "Wind: " + data.wind.speed + " km/h";
document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
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



searchBtn.addEventListener("click", ()=>{
  checkWeather(searchBox.value);
  storeCity(searchBox.value);
})



// Get Geo Location
// var x = document.getElementById("input");
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude +
//   "<br>Longitude: " + position.coords.longitude;
// }
// console.log(position);
// console.log(showPosition);

// Apend the data to 5-Day Forecast.


// Save to Local Storage
function storeCity(city) {
  console.log('[]',searchHistory);
  searchHistory.push(city)
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
}

function appendCity(){
  searchHistory.forEach((city) => {
    // localStorage.getItem('search-history', JSON.stringify(searchHistory));
    document.getElementsByClassName('searchHistoryHtml ')[0].append(city);
  });
  
}

appendCity ()

// {
//   $(".searchButton").click(function () {
//     var thisValue = $(this).siblings(".description").val();
//     console.log(thisValue);

//     var timeSlot = $(this).siblings(".description").attr("id");
//     console.log(timeSlot);
//     localStorage.setItem(timeSlot, thisValue);

//     saveTask();
//   });
// }


// localStorage.setItem("inputSearch", );
// document.getElementById("demo").innerHTML = localStorage.getItem("lastname");

// Clear Search
document.getElementsByClassName('clearSearch')[0].addEventListener('click', clearHistory);
function clearHistory(event){
  //clear localStorage with key search-history
localStorage.removeItem("search-history");
//clear DOM
document.getElementsByClassName('searchHistoryHtml')[0].innerHTML = "";
}

//To achieve the desired functionality there are a few changes you need to make to your existing code.
//1. In your storeCity function, you're pushing the city to the searchHistory array and storing it in local storage. However, you're not updating the search history column in the HTML. Modify the appendCity function to update the search history column.
//2. In your searchBtn event listener, after calling the checkWeather function, you should also call the storeCity function to add the searched city to the search history.
//3. In your checkWeather function, you're currently calling the getWeather function to retrieve the 5-day forecast for the city. However, you're not passing the correct parameters to the getWeather function.
//With these changes, when you search for a city, it will be added to the search history column. When you click on a city in the search history, the weather forecast for that city will be displayed. 

// if local storage is not null, then get the final element of array
// else.....
// 

//Okay, essentially you'll create button element. Set the textContent of the element to the city name. and then add an event listener to call the getLoc function and pass the city name to the getLoc function. Then you'll append that element to the search history element

// I'd probably change const element variable name to const cityName or something more specific (line 211

// Search history function
function display() {
  const city = JSON.parse(localStorage.getItem("search-history"))||[];
  console.log(city);
  //create for loop
  for (let index = 0; index < city.length; index++) {
    const cityName = city[index];
  // create button to append to that city
  const createButton= document.createElement('button')
  createButton.innerText= 'search-history'
  document.body.appendChild(city);
  // create button element
  // set button element textContent to city
  // add event listner to the button element
  button.addEventListener("click", ()=>{
  checkWeather(searchBox.value)
  })
  // append button element to search history element (you may have to getElementById for search history if you don't have it as a global variable first)
  }
  

  }

display();



// function clearHistory(event){
//   event.preventDefault();
//   sCity=[];
//   localStorage.removeItem("cityname");
//   document.location.reload();
