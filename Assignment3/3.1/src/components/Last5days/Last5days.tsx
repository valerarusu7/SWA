import { useEffect } from 'react';
import HistoricalData from '../../models/HistoricalData'

const last5Days = () => {

    useEffect(() => {
    }, [])

    function getMinTempForTheLast5days(data : HistoricalData[]) {
        const last5DaysTemp = getResultsOfLast5days(data).filter(e => e.type == "temperature");
        const minTemp = Math.min.apply(Math, last5DaysTemp.map(function (e) { return e.value; }))
    }

    function getMaxTempForTheLast5days(data: HistoricalData[]) {
        const last5DaysTemp = getResultsOfLast5days(data).filter(e => e.type == "temperature");
        const maxTemp = Math.max.apply(Math, last5DaysTemp.map(function (e) { return e.value; }))
    }

    function getTotalPrecipitationForTheLast5days(data: HistoricalData[]) {
        const last5Days = getResultsOfLast5days(data);
        let sum = last5Days.filter(e => e.type == "precipitation").reduce(function (sum, e) {
            return sum + e.value;
        }, 0);
    }

    function getAvgWindSpeedForTheLast5days(data: HistoricalData[]) {
        const last5Days = getResultsOfLast5days(data);
        const avg = last5Days.filter(e => e.type == "wind speed").reduce(function (sum, e) {
            return sum + e.value;
        }, 0) / last5Days.length;
    }

    function getResultsOfLast5days(data: HistoricalData[]) {
        const today = new Date();
        // Another monstrosity, I miss typescript
        today.setDate(today.getDate() - 5);
        return data.filter(element => new Date(element.time) >= today);
    }

    return (
        <div className="last5days">
            <h3>Minimum temperature for the last 5 days</h3>
            <p></p>
            <h3>Maximum temperature for the last 5 days</h3>
            <p></p>
            <h3>Total precipitation for the last 5 days:</h3>
            <p></p>
            <h3>Average wind speed for the last 5 days:</h3>
            <p></p>
            <h3>Hourly predictions for the next 24 hours:</h3>
            <p></p>
        </div>
    )
}