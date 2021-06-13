const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const uvEl = document.getElementById("uv");

function getCityCoords(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
        .then(function (response){
            if(response.status === 404){
                alert("Please check the spelling of the city name and try again.")
            } return response.json();
        })
    .then(handleData);
        // var lat = data.coord.lat;
        // var lon = data.coord.lon;
        // console.log(data)
        // // getWeatherbyCity();
        // console.log(data.coord.lon)  
        // console.log(`weather in ${city} is: `,data);
    
}

const userInput = document.querySelector('.form-control');
const submitBtn = document.querySelector('.btn');

submitBtn.addEventListener('click', handleClick)
function handleClick(){
    const userQuery = userInput.value;
    getCityCoords(userQuery);
}

function handleData(data){
    console.log(data);
    const cityName = data.name;
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    cityNameEl.textContent = cityName;
    tempEl.textContent = "Temp: " + temp + " degrees F";
    windEl.textContent = "Wind: " + wind + " MPH";
    humidityEl.textContent = "Humidity: " + humidity + "%";
    console.log(wind)
}

// function getWeatherbyCity(lat, lon){
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d91f911bcf2c0f925fb6535547a5ddc9`)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function (data){
//        console.log(data) 
//     })
// }






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
    