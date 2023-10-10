const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weahter_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city){
    const api_key = "c68983de1800bd1cd1bd998c5fc970f4";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod == `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    weather_body.style.display = "flex";
    location_not_found.style.display = "none";

   temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
   description.innerHTML = `${weather_data.weather[0].description}`;
   humidity.innerHTML = `${weather_data.main.humidity}%`;
   wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

   switch(weather_data.weather[0].main){
    case 'Clouds':
        weahter_img.src = "/images/cloud.png";
        break;
    case 'Clear':
        weahter_img.src = "/images/clear.png";
        break;
    case 'Rain':
        weahter_img.src = "/images/rain.png";
        break;
    case 'Mist':
        weahter_img.src = "/images/mist.png";
        break;
    case 'Snow':
        weahter_img.src = "/images/snow.png";
        break;
   }
}


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});