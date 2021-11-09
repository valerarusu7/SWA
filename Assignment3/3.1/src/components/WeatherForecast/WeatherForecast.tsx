import { useState, useEffect } from 'react'
import HistoricalData from '../../models/HistoricalData'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import PostHistoricalData from '../PostHistoricalData/PostHistoricalData'
import SelectCityBar from '../SelectCityBar/SelectCityBar'
import DataIntervalBar from '../DateIntervalBar/DateIntervalBar'
import LatestMeasurements from '../LatestMeasurements/LatestMeasurements'
import { updateHistoricalData } from '../../redux/slices/historicalDataSlice'
import { updateDataFilteredByCity } from '../../redux/slices/historicalDataFilteredByCitySlice'
import { updateDataFilteredByCityAndDate } from '../../redux/slices/historicalDataFilteredByCityAndDateSlice'
import { updateForecastData } from '../../redux/slices/forecastDataSlice'
import { updateForecastDataFilteredByCity } from '../../redux/slices/forecastDataFilteredByCity'
import { updateForecastDataFilteredByCityAndDate } from '../../redux/slices/forecastDataFilteredByCityAndDate'
import Forecast from '../../models/ForecastData'
import './WeatherForecast.scss'

const WeatherForecast = () => {
    const historicalDataFilteredByCityAndDate: HistoricalData[] = useAppSelector(state => state.historicalDataFilteredByCityAndDate.value)
    const [historicalDataIsReturned, setHistoricalDataIsReturned] = useState<boolean>(false);

    const forecastDataFilteredByCityAndDate: Forecast[] = useAppSelector(state => state.forecastDataFilteredByCityAndDate.value)
    const [forecastDataIsReturned, setForecastDataIsReturned] = useState<boolean>(false);

    const dispatch = useAppDispatch()

    useEffect(() => {
        reloadData();
    }, []);

    function reloadData(): void {
        const historicalDataPromise = fetch("http://localhost:8080/data");
        historicalDataPromise
            .then(response => response.json())
            .then(data => {
                dispatch(updateHistoricalData(data))
                dispatch(updateDataFilteredByCity(data))
                dispatch(updateDataFilteredByCityAndDate(data))
                setHistoricalDataIsReturned(true);
            });
        const forecastPromise = fetch("http://localhost:8080/forecast");
        forecastPromise
            .then(response => response.json())
            .then(data => {
                dispatch(updateForecastData(data));
                dispatch(updateForecastDataFilteredByCity(data));
                dispatch(updateForecastDataFilteredByCityAndDate(data));
                setForecastDataIsReturned(true);
            });
    }

    return (
        <div>
            <PostHistoricalData />
            <br />
            <button onClick={reloadData}>Reload data</button>
            {historicalDataIsReturned ? <SelectCityBar /> : <h6>Loading city bar...</h6>}
            {historicalDataIsReturned ? <DataIntervalBar /> : <h6>Loading data iterval bar...</h6>}
            {historicalDataIsReturned ? <LatestMeasurements /> : <h6>Loading latest measurements...</h6>}
            <h3>Forecast Data</h3>

            {forecastDataIsReturned ?
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Place</th>
                            <th>Type</th>
                            <th>Unit</th>
                            <th>From</th>
                            <th>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecastDataFilteredByCityAndDate.map(item => {
                            return (
                                <tr>
                                    <td>{item.time}</td>
                                    <td>{item.place}</td>
                                    <td>{item.type}</td>
                                    <td>{item.unit}</td>
                                    <td>{item.from}</td>
                                    <td>{item.to}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                : <h6>Loading forecast data...</h6>}
            <h3>Historical data: </h3>
            {historicalDataIsReturned ?
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Place</th>
                            <th>Type</th>
                            <th>Unit</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historicalDataFilteredByCityAndDate.map(item => {
                            return (
                                <tr>
                                    <td>{item?.time}</td>
                                    <td>{item?.place}</td>
                                    <td>{item?.type}</td>
                                    <td>{item?.unit}</td>
                                    <td>{item?.value}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                : <h6>Loading historicalData...</h6>}
        </div>
    )
}

export default WeatherForecast