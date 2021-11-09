import { useState, useEffect } from 'react'
import Forecast from '../../models/Forecast'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { updateHistoricalData } from '../../redux/slices/historicalDataSlice'
import PostHistoricalData from '../PostHistoricalData/PostHistoricalData'
import SelectCityBar from '../SelectCityBar/SelectCityBar'
import DataIntervalBar from '../DateIntervalBar/DateIntervalBar'
import LatestMeasurements from '../LatestMeasurements/LatestMeasurements'
import { updateDataFilteredByCity } from '../../redux/slices/dataFilteredByCitySlice'
import { updateDataFilteredByCityAndDate } from '../../redux/slices/dataFilteredByCityAndDateSlice'

const WeatherForecast = () => {
    const dataFilteredByCityAndDate: Forecast[] = useAppSelector(state => state.dataFilteredByCityAndDate.value)
    const [dataIsReturned, setDataIsReturned] = useState<boolean>(false);
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
                setDataIsReturned(true);
            });
    }

    return (
        <div>
            <button onClick={reloadData}>Reload data</button>
            <PostHistoricalData />
            {dataIsReturned? <SelectCityBar /> : <h6>Loading city bar...</h6>}
            {dataIsReturned? <DataIntervalBar /> : <h6>Loading data iterval bar...</h6>}
            {dataIsReturned? <LatestMeasurements /> : <h6>Loading latest measurements...</h6>}
            <h3>Historical data: </h3>
            {JSON.stringify(dataFilteredByCityAndDate)}
        </div>
    )
}

export default WeatherForecast