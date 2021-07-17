const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const uvEl = document.getElementById("uv");
const pastSearchEl = document.getElementById('past-search');
const userInput = document.querySelector('.form-control');
const submitBtn = document.querySelector('.btn');
const dailyTempArr = [];
const dailyWindArr = [];
const dailyHumidArr = [];
const iconArr = [];
const storedCityArr = [];

// Retreives date and dates for the following 5 days
const today = new Date();
const date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

const day1 = new Date(today);
day1.setDate(day1.getDate() + 1);
const date1 =(day1.getMonth()+1) + '/' + day1.getDate() + '/' + day1.getFullYear();

const day2 = new Date(today);
day2.setDate(day2.getDate() + 2);
const date2 =(day2.getMonth()+1) + '/' + day2.getDate() + '/' + day2.getFullYear();

const day3 = new Date(today)
day3.setDate(day3.getDate() + 3)
const date3 =(day3.getMonth()+1) + '/' + day3.getDate() + '/' + day3.getFullYear();

const day4 = new Date(today)
day4.setDate(day4.getDate() + 4)
const date4 =(day4.getMonth()+1) + '/' + day4.getDate() + '/' + day4.getFullYear();

const day5 = new Date(today)
day5.setDate(day5.getDate() + 5)
const date5 =(day5.getMonth()+1) + '/' + day5.getDate() + '/' + day5.getFullYear();

const dateArr = [date1, date2, date3, date4, date5];

// Calls function to be the first item to load on the page
renderUserQuery();

// Retreives weather API data
function getWeatherApi(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial`)
        .then(function (response){
            if(response.status === 404){
                alert("Please check the spelling of the city name and try again.")
            } return response.json();
        })
    .then(handleData);
}

// Adds event listener to the search button then calls the handleClick function to use the city name the user enters
submitBtn.addEventListener('click', handleClick)

// enters city name into the weather API fetch funciton and calls the setStorage function
function handleClick(event){
    event.preventDefault();
    const userQuery = userInput.value;
    getWeatherApi(userQuery);
    setStorage(userQuery)
}

// sets localStorage using the city name the user enters
function setStorage(userQuery){
    storedCityArr.push(userQuery)
    localStorage.setItem('weather', storedCityArr);
}

// Renders local storage upon page load
function renderUserQuery(){
    const storedCity = localStorage.getItem("weather");
    const storedBtn = document.createElement("button");
    storedBtn.classList.add('btn-secondary')
    storedBtn.classList.add('col-12')
    const pasteEl = document.getElementById('paste')
    storedBtn.textContent = storedCity;
    pasteEl.append(storedBtn);

}

// Takes data from the API call and appends that data upon page based on parameters indicated 
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
}

// uses city coordinates to fetch forecast API data
function getWeatherByCoords(coords){
    const lat = coords.coord.lat;
    const lon = coords.coord.lon;
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=d91f911bcf2c0f925fb6535547a5ddc9&&units=imperial`)
    .then(function(response){
        return response.json();
    })
    .then(handleForecast);
}

// Takes data from the coordinates API to append 5 day forecaset to page along with UV index
function handleForecast(data){
    console.log(data)
    const uv = data.current.uvi;
    uvEl.textContent = 'UV Intex: ' + uv;
    for(i = 0; i < 5; i++){
        const cardHeaderEl = document.getElementById(`${i}`);
        const dailyTempEl = document.getElementById(`temp${i}`);
        const dailyWindEl = document.getElementById(`wind${i}`);
        const dailyHumidEl = document.getElementById(`humid${i}`);
        const iconEl = document.createElement('img');
        const dailyIcon = data.daily[i].weather[0].icon;
        const dailyTemp = data.daily[i].temp.day;
        const dailyWind = data.daily[i].wind_speed;
        const dailyHumid = data.daily[i].humidity;
        iconArr.push(dailyIcon);
        dailyTempArr.push(dailyTemp);
        dailyWindArr.push(dailyWind);
        dailyHumidArr.push(dailyHumid);
        cardHeaderEl.textContent = dateArr[i];
        dailyTempEl.textContent = `Temperature: ${dailyTempArr[i]} degrees`;
        dailyWindEl.textContent = `Wind Speed: ${dailyWindArr[i]} MPH`;
        dailyHumidEl.textContent = `Humidity: ${dailyHumidArr[i]}%`;
        iconEl.setAttribute('src', `http://openweathermap.org/img/wn/${iconArr[i]}@2x.png`)
        cardHeaderEl.appendChild(iconEl);

    }

}




    