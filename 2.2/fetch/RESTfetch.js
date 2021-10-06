// fetch returns a promise by default
const historicalDataPromise = fetch("http://localhost:8080/data");
const forecastPromise = fetch("http://localhost:8080/forecast");

historicalDataPromise
.then(response => response.json())
.then(data => {
    console.log(data);
    getLatestMeasurements(data);
    getMinTempForTheLast5days(data);
    getMaxTempForTheLast5days(data);
    getTotalPrecipitationForTheLast5days(data);
    getAvgWindSpeedForTheLast5days(data);
})

forecastPromise
.then(response => response.json())
.then(data => {
    setInterval(hourlyPrediction(data), 1000 * 60 * 60);
})

function getLatestMeasurements(data) {
    const wind = data.filter(e => e.type == "wind speed");
    const rain = data.filter(e => e.type == "precipitation");
    const temp = data.filter(e => e.type == "temperature");
    const lastWind = getLatestMeasurement(wind);
    const lastRain = getLatestMeasurement(rain);
    const lastTemp = getLatestMeasurement(temp);
    document.getElementById("latestMeasurementWind").innerHTML += JSON.stringify(lastWind);
    document.getElementById("latestMeasurementRain").innerHTML += JSON.stringify(lastRain);
    document.getElementById("latestMeasurementTemp").innerHTML += JSON.stringify(lastTemp);
}

function getMinTempForTheLast5days(data) {
    const last5DaysTemp = getResultsOfLast5days(data).filter(e => e.type == "temperature");
    const minTemp = Math.min.apply(Math, last5DaysTemp.map(function (e) { return e.value; }))
    document.getElementById("minTempOf5days").innerHTML = minTemp;
}

function getMaxTempForTheLast5days(data) {
    const last5DaysTemp = getResultsOfLast5days(data).filter(e => e.type == "temperature");
    const maxTemp = Math.max.apply(Math, last5DaysTemp.map(function (e) { return e.value; }))
    document.getElementById("maxTempOf5days").innerHTML = maxTemp;
}

function getTotalPrecipitationForTheLast5days(data) {
    const last5Days = getResultsOfLast5days(data);
    let sum = last5Days.filter(e => e.type == "precipitation").reduce(function (sum, e) {
        return sum + e.value;
    }, 0);
    document.getElementById("totalPrecipitationOf5days").innerHTML = sum;
}

function getAvgWindSpeedForTheLast5days(data) {
    const last5Days = getResultsOfLast5days(data);
    const avg = last5Days.filter(e => e.type == "wind speed").reduce(function (sum, e) {
        return sum + e.value;
    }, 0) / last5Days.length;
    document.getElementById("avgWindSpeedOf5days").innerHTML = avg;
}

function hourlyPrediction(data) {
    const tomorrow = new Date();
    // What a monstrosity btw, only javascript could have something so disgusting
    tomorrow.setDate(tomorrow.getDate() + 1);
    const predictionFor24h = data.filter(element => new Date(element.time) <= tomorrow);
    document.getElementById("hourlyPrediction").innerHTML = JSON.stringify(data);
}

function getResultsOfLast5days(data) {
    const today = new Date();
    // Another monstrosity, I miss typescript
    today.setDate(today.getDate() - 5);
    return data.filter(element => new Date(element.time) >= today);
}

function getLatestMeasurement(data) {
    return data.reduce((a, b) => {
        return new Date(a.time) > new Date(b.time) ? a : b;
    })
}