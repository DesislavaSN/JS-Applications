// SOMETHING'S WRONG!!!  NEEDS TO BE FIXED!!!!!!! ...

const locationInput = document.getElementById("location").value;
const getWeatherBtn = document.getElementById("submit");
getWeatherBtn.addEventListener("click", attachEvents);
const forecastDiv = document.getElementById("forecast");
const todayWeather = document.getElementById("current");
const upcomingWeather = document.getElementById("upcoming");
const baseUrl = "http://localhost:3030/jsonstore/forecaster";
 
locationInput.textContent = "";
 
async function attachEvents() {
  try {
    // GETTING A LOCATION:
    const responseLocation = await fetch(`${baseUrl}/locations`);
    if (responseLocation.ok == false) {
      throw new Error("Request error!");
    }
    const dataLocation = await responseLocation.json();
    // console.log(dataLocation);
    const codeLocation = dataLocation.find((d) => d.name === locationInput);
    // console.log(codeLocation.code);
 
    // • FOR CURRENT CONDITIONS :
    const resTodayWeather = await fetch(
      `${baseUrl}/today/${codeLocation.code}`
    );
    if (resTodayWeather.ok == false) {
      throw new Error("Request error!");
    }
    const dataTodayWeather = await resTodayWeather.json();
    // console.log(Object.entries(dataTodayWeather));
    const forecast = Object.entries(dataTodayWeather)[0][1];
    // console.log(forecast);
    // console.log(forecast.condition, forecast.high, forecast.low);
 
    const cityName = Object.entries(dataTodayWeather)[1][1];
    // console.log(cityName);
    forecastDiv.style.display = "block";
 
    // create div 'forecast' for today:
    const forecastInfoDiv1 = createElement("div", null, "forecasts");
    todayWeather.appendChild(forecastInfoDiv1);
 
    // create span for the symbol:
    const symbolSpan = createElement("span", null, "condition");
    symbolSpan.classList.add("symbol");
    if (forecast.condition == "Sunny") {
      symbolSpan.innerHTML = "&#x2600";
    } else if (forecast.condition == "Partly sunny") {
      symbolSpan.innerHTML = "&#x26C5";
    } else if (forecast.condition == "Overcast") {
      symbolSpan.innerHTML = "&#x2601";
    } else if (forecast.condition == "Rain") {
      symbolSpan.innerHTML = "&#x2614";
    }
    forecastInfoDiv1.appendChild(symbolSpan);
 
    // create span for the condition of the weather
    const conditionSpan = createElement("span", null, "condition");
    forecastInfoDiv1.appendChild(conditionSpan);
 
    // span for the city name:
    const citySpan = createElement("span", cityName, "forecast-data");
    conditionSpan.appendChild(citySpan);
 
    //span for the degrees:
    const degreesSpan = createElement("span", null, "forecast-data");
    degreesSpan.innerHTML = `${forecast.low}&#176/${forecast.high}&#176`;
    conditionSpan.appendChild(degreesSpan);
 
    //span for the weather condition in words:
    const weatherWordSpan = createElement(
      "span",
      forecast.condition,
      "forecast-data"
    );
    conditionSpan.appendChild(weatherWordSpan);
 
    // • FOR A 3-DAY FORECAST:
    const resUpcomingWeather = await fetch(
      `${baseUrl}/upcoming/${codeLocation.code}`
    );
    if (resUpcomingWeather.ok == false) {
      throw new Error("Request error!");
    }
    const data3DaysWeather = await resUpcomingWeather.json();
 
    const forecast3Days = Object.entries(data3DaysWeather)[0][1];
    // console.log(forecast3Days);
 
    // create div 'forecast-info' for upcoming 3 days:
    const forecastInfoDiv2 = createElement("div", null, "forecast-info");
    upcomingWeather.appendChild(forecastInfoDiv2);
 
    const upcomingSpan = createElement("span", null, "upcoming");
    forecastInfoDiv2.appendChild(upcomingSpan);
 
    for (const singleDay of forecast3Days) {
      //console.log(singleDay.condition);
      //console.log(singleDay.low, singleDay.high);
 
      const symbolSpan3Days = createElement("span", null, "symbol");
      if (singleDay.condition == "Sunny") {
        symbolSpan3Days.innerHTML = "&#x2600";
      } else if (singleDay.condition == "Partly sunny") {
        symbolSpan3Days.innerHTML = "&#x26C5";
      } else if (singleDay.condition == "Overcast") {
        symbolSpan3Days.innerHTML = "&#x2601";
      } else if (singleDay.condition == "Rain") {
        symbolSpan3Days.innerHTML = "&#x2614";
      }
      upcomingSpan.appendChild(symbolSpan3Days);
 
      const degreesSpan3Days = createElement("span", null, "forecast-data");
      degreesSpan3Days.innerHTML = `${singleDay.low}&#176/${singleDay.high}&#176`;
      upcomingSpan.appendChild(degreesSpan3Days);
 
      const weatherWordSpan3Days = createElement(
        "span",
        singleDay.condition,
        "forecast-data"
      );
      upcomingSpan.appendChild(weatherWordSpan3Days);
    }
  } catch (error) {
    alert(error.message);
  }
}
 
// attachEvents();
 
function createElement(type, content, className) {
  const element = document.createElement(type);
  element.textContent = content;
  if (className) {
    element.classList.add(className);
  }
  return element;
}