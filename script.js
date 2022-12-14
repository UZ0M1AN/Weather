console.log('uzomian...');

const log = (...a) => console.log(...a);

// Variables
const API_KEY = 'cc9c74fd816c494f8a6ead63bd4c8a10';

// DOM
const city = document.querySelector('input');
const btn = document.querySelector('button');
const result = document.querySelector('.result');
const weather = document.querySelector('.weather');
const others = document.querySelectorAll('.others li');

btn.addEventListener('click', displayWeather);



// Event Handlers
async function displayWeather(e) {
    const data = await getWeather(city.value);
    const weatherDescription = data.weather[0].description;
    const {temp, humidity, pressure} = data.main;
    const windSpeed = data.wind.speed;

    result.classList.remove('hidden');

    weather.innerHTML = weatherDescription[0].toUpperCase() + weatherDescription.slice(1);
    others[0].innerHTML = `Temperature: ${(temp-273).toFixed(0)}&ordm;C`;
    others[1].innerHTML = `Humidity: ${humidity}%`;
    others[2].innerHTML = `Pressure: ${pressure}hPa`;
    others[3].innerHTML = `Wind speed: ${windSpeed}m/s`;
}



// Functions
async function getCoords(location) {
    try {
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`, {mode: "cors"});
        const data = await res.json();
        const {lat, lon} = data[0];
        return {lat, lon};
    }
    catch(err) {
        console.error(err);
    }
}

async function getWeather(location) {
    try {
        const {lat, lon} = await getCoords(location);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`, {mode: 'cors'});
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}