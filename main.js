const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getWeatherInfo(searchBox.value);
  }
}

function getWeatherInfo(city) {

  let promise = fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayWeather)
    .catch((err) => console.log(err));
}

function displayWeather(weather) {
  if (weather.cod == '200') {
    console.log(weather);

    document.querySelector('.current .hi-low').innerHTML = `${weather.main.temp_max}°c / ${weather.main.temp_min}°c`;
    document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp)}°c`;
    document.querySelector('.city').innerHTML = `${weather.name}, ${weather.sys.country}`;
    document.querySelector('.weather').innerHTML = `${weather.weather[0].main}`;
    document.querySelector('.date').innerHTML = formattedDate();

  } else {
    alert(weather.message);
  }
  
}

function formattedDate() {
  
  const date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[date.getDay()];
  const dateNum = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${dateNum} ${month} ${year}`;
}