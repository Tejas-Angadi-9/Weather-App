const apiKey = "74b3f14e2c1371a66b49acbd2187555b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const apiLatLong = "https://api.openweathermap.org/data/2.5/weather?lat=15.8398813&lon=74.5111606&appid=74b3f14e2c1371a66b49acbd2187555b&units=metric";

const apiLatLong = "https://api.openweathermap.org/data/2.5/weather?lat=";

const search = document.querySelector(".search");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const notFound = document.querySelector(".img-not-found");
const weatherInfo = document.querySelector(".weather-info");
const weather = document.querySelector(".weather");
const yourWeather = document.querySelector(".your-heading");
const searchWeather = document.querySelector(".search-weather");
const grantLocation = document.querySelector(".grant-location-container");
const countryIcon = document.querySelector(".countryFlag");

async function checkWeatherCity(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        notFound.src= "images/no-location-found.webp";
    }
    else{
        let data = await response.json();
        showData(data);
    }      
}

async function checkWeatherLatLong(lat,lon){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        notFound.src= "images/no-location-found.webp";
    }
    else{
        let data = await response.json();
        showData(data);
    }    
}


function showData(data){

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";  
    document.querySelector(".countryFlag").src = `http://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`; 
    // update the image
    if(data.weather[0].main == "Clouds"){
        weatherInfo.innerText = "Cloudy";
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherInfo.innerText = "Clear";
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherInfo.innerText = "Rainy";
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherInfo.innerText = "Drizzle";
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherInfo.innerText = "Misty";
        weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherInfo.innerText = "Snowy";
        weatherIcon.src = "images/snow.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeatherCity(searchBox.value);
})

searchBox.addEventListener("keypress", (e)=>{
    if(e.key == 'Enter'){
        checkWeatherCity(searchBox.value);
    }
});

yourWeather.classList.add("active");
search.style.display = "none";
searchWeather.addEventListener("click", ()=>{
    switchTabSearchWeather(searchWeather);
    checkWeatherLatLong(lat,lon);
})

yourWeather.addEventListener("click", ()=>{
    getLocation();
    switchTabYourWeather(yourWeather);
    grantLocation.style.display = "none";

})

function switchTabSearchWeather(searchWeather){
    if(searchWeather != yourWeather){
        searchWeather.classList.add("active");
        yourWeather.classList.remove("active");
        grantLocation.style.display = "none";
        search.style.display = "block";
        weather.style.display = "none";
    }
}
function switchTabYourWeather(yourWeather){
    if(yourWeather != searchWeather){
        yourWeather.classList.add("active");
        searchWeather.classList.remove("active");
        grantLocation.style.display = "block";
        search.style.display = "none";
    }
}

// Get the coordinates of the current location

const x = document.querySelector(".demo");

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        x.innerHTML = "Geolocation is not supported by this browser";
    }
}

function showPosition(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude; 
    
    checkWeatherLatLong(lat,lon);
    
}
getLocation();

if(getLocation){
    grantLocation.style.display = "none";
}