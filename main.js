const myAPIKey = `fe929c8b878144e880e225611231508`
const BaseURL = `http://api.weatherapi.com/v1/forecast.json`
let searchLocation = document.querySelector("#findLocation")

searchLocation.addEventListener("change", function () {
  getWeather(searchLocation.value)
})

searchLocation.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    getWeather(searchLocation.value)
  }
})



async function getWeather(country) {
  try {
  document.querySelector(".weatherCards").innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
    let response = await fetch(`${BaseURL}?key=${myAPIKey}&q=${country}&days=7`)
    let finalResponse = await response.json()
    displayWeatherData(finalResponse)
    console.log(finalResponse);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter a valid location or check your internet",
    });
    searchLocation.value = ""
    document.querySelector(".weatherCards").innerHTML = ""
  }
}



function displayWeatherData(data) {
  let dataArray = data.forecast.forecastday
  document.querySelector("#location").innerHTML = data.location.country
  document.querySelector(".todayDate").innerHTML = dataArray[0].date
  document.querySelector(".today-weather").innerHTML = `
            <h1 class="cityName fw-bolder fs-3">${data.location.name}</h1>
            <h2 class="fw-bolder display-4 " id="weatherTemp">${data.current.temp_c}°</h2>
            <p id="weatherCondition" class="fw-semibold fs-5">${data.current.condition.text}</p>
            <div class="d-flex align-items-center gap-3">
                <p>
                    <img src="./images/wind.png" width="30px" alt="">
                    <span id="windSpeed" class="ms-2 fw-semibold">${data.current.wind_kph} Km/h</span>
                </p>
                <p>
                    <img src="./images/humidity.png" width="30px" alt="">
                    <span id="humidity" class="fw-semibold">${data.current.humidity}%</span>
                </p>
`
  let weatherBox = ``
  for (i = 0; i < dataArray.length; i++) {
    const date = new Date(dataArray[i].date)
    const weekDay = date.toLocaleDateString("us-uk", { weekday: "long" })
    weatherBox += `
                <div class="today flex-grow-1 m-2">
                    <div class="innerCard bg-primary-subtle rounded-3 py-2 px-4">
                        <p class="weekDay text-center fw-bolder text-black ">${weekDay}</p>
                        <div class="d-flex justify-content-between">
                            <div class="text-center">
                                <p id="maxTemp" class="temp-type fw-bold m-1">Max Temp</p>
                                <p class="">${dataArray[i].day.maxtemp_c}°</p>
                            </div>
                            <div class="text-center">
                                <p id="avgTemp" class="temp-type fw-bold m-1">Avg Temp</p>
                                <p class="">${dataArray[i].day.avgtemp_c}°</p>
                            </div>
                              <div class="text-center m-0 p-0">
                                <p id="minTemp" class="temp-type fw-bold m-1">Min Temp</p>
                                <p class="">${dataArray[i].day.mintemp_c}°</p>
                            </div>
                        
                        </div>
                        <p class="text-center fw-semibold text-dark-emphasis m-0 p-0">${dataArray[i].day.condition.text}</p>
                        <img src="https:${dataArray[i].day.condition.icon}" width="50px" class="m-auto d-block" alt="">
                    </div>
                </div>
`
  }
  document.querySelector(".weatherCards").innerHTML = weatherBox;
}


function myCurrentLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude
  let myCurrentPosition = `${latitude},${longitude}`
  getWeather(myCurrentPosition)
}

navigator.geolocation.getCurrentPosition(myCurrentLocation)













