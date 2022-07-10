const faringate = document.querySelector('#faringate')
const celsium = document.querySelector('#celsium')


 function convertF () {
let temp = document.querySelector('.temp')
temp.innerHTML = Math.round((+temp.textContent * 9) / 5 + 32)
faringate.classList.add('open')
celsium.classList.remove('open')
faringate.removeEventListener ('click', convertF)
celsium.addEventListener ('click', convertC)
}


function convertC () {
  let temp = document.querySelector('.temp')
  temp.innerHTML = Math.round((+temp.textContent - 32)*5/9)
  celsium.classList.add('open') 
  faringate.classList.remove('open')
  celsium.removeEventListener('click', convertC)
  faringate.addEventListener('click', convertF)
}

faringate.addEventListener('click', convertF)

function searchCity(event) {
  event.preventDefault();
  let town = document.querySelector('.town')
  let searchInput = document.querySelector('input').value
  town.textContent = searchInput

let apiKey = '982b4bc2871092f28978e82b0cbd7c0a'
let unit = 'metric'
let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=${unit}&appid=${apiKey}`
axios.get(apiCall).then(weather) 
}

function weather (response){
  celsium.removeEventListener('click', convertC)
  let temp = document.querySelector('.temp') 
  celsium.classList.add('open')
  faringate.classList.remove('open')
  faringate.addEventListener('click', convertF)
 currentTemp = response.data.main.temp
 let town = document.querySelector('.town')
 town.innerHTML = response.data.name
 let description = document.querySelector('.curW2')
 description.innerHTML =  `Description : ${response.data.weather[0].description}`
 document.querySelector('#maxT').innerHTML = `Max temperature is ${Math.round(response.data.main.temp_max)}°C`
 document.querySelector('#minT').innerHTML = `Min temperature is ${Math.round(response.data.main.temp_min)}°C`
  document.querySelector('#humidity').innerHTML = `Humidity is ${Math.round(response.data.main.humidity)}%` 
   document.querySelector('#pressure').innerHTML = `Pressure is ${Math.round(response.data.main.pressure)} hPa` 
    document.querySelector('#windSpeed').innerHTML = `Wind speed is ${Math.round(response.data.wind.speed)} m/s` 
    document.querySelector('#visibility').innerHTML = `Visibility is ${Math.round(response.data.visibility)} m` 

    temp.innerHTML = Math.round(+currentTemp)
let lat = (response.data.coord.lat)
let lon =(response.data.coord.lon)

forecast (lat, lon)
}



  let form = document.querySelector("form");
 form.addEventListener("submit", searchCity);

 let now = new Date();
let week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
];
let day = week[now.getDay()];
let time = document.querySelector ('#time')
let dayWeek = document.querySelector ('#day')
dayWeek.innerHTML = (`${day}`)
let timeM = now.getMinutes();
if (timeM < 10) {
  time.innerHTML = `${now.getHours()} : 0${now.getMinutes()}`;
} else {
  time.innerHTML = `${now.getHours()} : ${now.getMinutes()}`;
}


function showPosition(position){
  let lat = position.coords.latitude
let lon = position.coords.longitude
let units = 'metric'


let apiKey = '982b4bc2871092f28978e82b0cbd7c0a'
 let apiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weather);


} 
function navi() {navigator.geolocation.getCurrentPosition(showPosition)}
document.querySelector(".location").addEventListener('click', navi)








function displayForecast(response) {  
   
var day_of_week = new Date().getDay();
var dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", 'Thursday', "Friday", "Saturday"]
  var sorted_list = dayList.slice(day_of_week + 1).concat(dayList.slice(0,day_of_week));
days = []
days[0] = [sorted_list[0], response.data.daily[1].temp.min, response.data.daily[1].temp.max, response.data.daily[1].weather[0].icon]
days[1] = [sorted_list[1], response.data.daily[2].temp.min, response.data.daily[2].temp.max, response.data.daily[2].weather[0].icon]
days[2] = [sorted_list[2], response.data.daily[3].temp.min, response.data.daily[3].temp.max, response.data.daily[3].weather[0].icon]
days[3] = [sorted_list[3], response.data.daily[4].temp.min, response.data.daily[4].temp.max, response.data.daily[4].weather[0].icon]
days[4] = [sorted_list[4], response.data.daily[5].temp.min, response.data.daily[5].temp.max, response.data.daily[5].weather[0].icon]

  
const toHtml = day =>
    ` <div class="card" style="width: 8rem">
            <h5 class="card-title"><strong>${day[0]}</strong></h5>
            <img class="weatherIcon"
          src="http://openweathermap.org/img/wn/${
            day[3]
          }@2x.png"
          alt=""
          width="42"
        />
            <div class="card-body">
              <p class="card-text"><strong>${Math.round(day[2])}°C</strong> / ${Math.round(day[1])}°C</p>
            </div>
          </div>`
  
function render(){
    const html = days.map(day => toHtml(day)).join('')
    document.querySelector('#forecast').innerHTML = html
}
render()
 }

function forecast (lat, lon) {
   let town = document.querySelector('.town')
  
let apiKey = '982b4bc2871092f28978e82b0cbd7c0a'
let units = 'metric'
 let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecast) 
console.log(town)
 
}
 


function f () {
   let town = document.querySelector('.town')
  
  
let apiKey = '982b4bc2871092f28978e82b0cbd7c0a'
let unit = 'metric'
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=${unit}&appid=${apiKey}`
axios.get(apiUrl).then(weather) 
} f()