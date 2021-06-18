const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const uvEl = document.getElementById("uv");
const pastSearchEl = document.getElementById('past-search')
const today = new Date();
var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
console.log(date)

renderUserQuery();

function getWeatherApi(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
        .then(function (response){
            if(response.status === 404){
                alert("Please check the spelling of the city name and try again.")
            } return response.json();
        })
    .then(handleData);
}

const userInput = document.querySelector('.form-control');
const submitBtn = document.querySelector('.btn');

submitBtn.addEventListener('click', handleClick)

function handleClick(event){
    event.preventDefault();
    const userQuery = userInput.value;
    getWeatherApi(userQuery);
    localStorage.setItem('weather', userQuery);
}

function renderUserQuery(){
    pastSearchEl.textContent = localStorage.getItem("weather")
}

function handleData(data){
    console.log(data);
    const weatherData = data;
    getWeatherByCoords(weatherData)
    const cityName = data.name;
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    cityNameEl.textContent = cityName + " weather for " + date;
    tempEl.textContent = "Temp: " + temp + " degrees F";
    windEl.textContent = "Wind: " + wind + " MPH";
    humidityEl.textContent = "Humidity: " + humidity + "%";
    console.log(wind)
}

function getWeatherByCoords(coords){
    const lat = coords.coord.lat;
    const lon = coords.coord.lon;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d91f911bcf2c0f925fb6535547a5ddc9`)
    .then(function(response){
        return response.json();
    })
    .then(handleForecast);
}

function handleForecast(data){
    console.log(data)
    const uv = data.current.uvi;
    uvEl.textContent = 'UV Intex: ' + uv;
}





// Create form that has a formhandle function
    // Has "city input"
    // search button <-event listener that listens for click
        // create function to handle the click on submit
        // create variable to identify what city is typed in (get this city from form)
        // create if/else to make sure it's valid
        // if city -> call two functions to call current weather and future weather
        // call append city function

// Current weather function needs to fetch API
    // display relevant data
    // make variables for lat/long
    // call uv api to display data
    // bootstrap 'card'

// Forecast weather function fetch forecast API query
    // dispaly relevant data
    // bootstrap 'card deck'

// Append city function
    // adding city to list
    // if/else check if city is not on list by adding cities to array
    // call save city function
    // create button/onclick events OR add cities to form 

// Save city function
    // pushing city name to localStorage
    