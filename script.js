const x = document.getElementById("demo");
let lat,
  lon = null;
let infoPage = null;
let main,
  description,
  temp,
  sensation,
  humidity,
  wind,
  country,
  icon = null;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(savePosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function savePosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(
    `Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`
  );
  getWeatherInfo();
}

function getWeatherInfo() {
  const promise = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${parseInt(
      lat
    )}&lon=${parseInt(
      lon
    )}&appid=23e5a05731f655695ad6ff2274778387&units=metric&lang=pt_br`
  );
  promise.then((manuel) => {
    workWithWeatherInfo(manuel.data);
  });
  promise.catch((err) => {
    console.log(err);
  });
}

function workWithWeatherInfo(data) {
  main = data.weather[0].main;
  description = data.weather[0].description;
  temp = data.main.temp;
  sensation = data.main.feels_like;
  humidity = data.main.humidity;
  wind = data.wind.speed;
  country = data.sys.country;
  icon = data.weather[0].icon;
}

function getUserWeatherInfo() {
  infoPage = document.querySelector(".clima");
  infoPage.classList.remove("meio");
  infoPage.classList.add("informaçoes");
  infoPage.innerHTML = `
  <div class="current-weather-status">
    <div clas="description">${description}</div>
    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon" width="50" height="50">
    <div clas="country">${country}</div>
  </div>
  <div class="current-weather-status">
    <div clas="temp"><span class="span-bold">Temperatura:</span> ${temp} ºC</div>
    <div clas="sensation"><span class="span-bold">Sensação termica:</span> ${sensation} ºC</div>
    <div clas="humidity"><span class="span-bold">Humidade:</span> ${humidity} %</div>
    <div clas="wind"><span class="span-bold">Velocidade do vento:</span> ${wind} m/s</div>
  </div>
  `;
  //document.querySelector(".request-weather-info").remove();
}

//workWithWeatherInfo();
getLocation();
