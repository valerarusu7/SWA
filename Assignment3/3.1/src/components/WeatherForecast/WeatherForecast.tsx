import { useState, useEffect } from 'react'
import HistoricalData from '../../models/HistoricalData'
import ForecastData from '../../models/ForecastData'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import PostHistoricalData from '../PostHistoricalData/PostHistoricalData'
import SelectCityBar from '../SelectCityBar/SelectCityBar'
import DataIntervalBar from '../DateIntervalBar/DateIntervalBar'
import LatestMeasurements from '../LatestMeasurements/LatestMeasurements'
import ForecastDataTable from '../ForecastDataTable/ForecastDataTable'
import HistoricalDataTable from '../HistoricalDataTable/HistoricalDataTable'
import { updateHistoricalData } from '../../redux/slices/historicalDataSlice'
import { updateForecastData } from '../../redux/slices/forecastDataSlice'
import { updateForecastDataFiltered } from '../../redux/slices/forecastDataFilteredSlice'
import { updateHistoricalDataFiltered } from '../../redux/slices/historicalDataFilteredSlice'
import './WeatherForecast.scss'

const WeatherForecast = () => {
    const historicalData: HistoricalData[] = useAppSelector(state => state.historicalData.value)
    const forecastData: ForecastData[] = useAppSelector(state => state.forecastData.value)

    const [historicalDataIsReturned, setHistoricalDataIsReturned] = useState<boolean>(false);
    const [forecastDataIsReturned, setForecastDataIsReturned] = useState<boolean>(false);

    let chosenCity: string = "All";
    let selectedFromDate: Date;
    let selectedTillDate: Date;

    const dispatch = useAppDispatch()

    useEffect(() => {
        reloadData();
    }, []);

    function reloadData(): void {
        const historicalDataPromise = fetch("http://localhost:8080/data");
        historicalDataPromise
            .then(response => response.json())
            .then(data => {
                dispatch(updateHistoricalData(data));
                dispatch(updateHistoricalDataFiltered(data));
                setHistoricalDataIsReturned(true);
            });
        const forecastPromise = fetch("http://localhost:8080/forecast");
        forecastPromise
            .then(response => response.json())
            .then(data => {
                dispatch(updateForecastData(data));
                dispatch(updateForecastDataFiltered(data));
                setForecastDataIsReturned(true);
            });
    }

    function cityUpdated(city: string): void {
        chosenCity = city;
        filterData();
    }

    function fromDateUpdated(date: Date) : void {
        selectedFromDate = date;
        filterData();
    }


    function tillDateUpdated(date: Date) : void {
        selectedTillDate = date;
        filterData();
    }

    function filterData(): void {
        let filteredHistoricalDataToDisplay: HistoricalData[] = [...historicalData];
        let filteredForecastDataToDisplay: ForecastData[] = [...forecastData];
        if (chosenCity !== "All") {
          filteredHistoricalDataToDisplay =
            filteredHistoricalDataToDisplay.filter(element => element.place == chosenCity);
          filteredForecastDataToDisplay =
            filteredForecastDataToDisplay.filter(element => element.place == chosenCity);
        }
        if (selectedFromDate !== undefined) {
          let fromDate: Date = selectedFromDate;
          filteredHistoricalDataToDisplay = filteredHistoricalDataToDisplay.filter(element => new Date(element.time) >= new Date(fromDate));
          filteredForecastDataToDisplay = filteredForecastDataToDisplay.filter(element => new Date(element.time) >= new Date(fromDate));
        }
        if (selectedTillDate !== undefined) {
          let tillDate: Date = selectedTillDate;
          filteredHistoricalDataToDisplay = filteredHistoricalDataToDisplay.filter(element => new Date(element.time) <= new Date(tillDate));
          filteredForecastDataToDisplay = filteredForecastDataToDisplay.filter(element => new Date(element.time) <= new Date(tillDate));
    
        }
        dispatch(updateHistoricalDataFiltered(filteredHistoricalDataToDisplay));
        dispatch(updateForecastDataFiltered(filteredForecastDataToDisplay));
      }

    return (
        <div>
            <PostHistoricalData />
            <br />
            <button onClick={reloadData}>Reload data</button>
            {historicalDataIsReturned ? <SelectCityBar cityUpdateCallback={cityUpdated}/> : <h6>Loading city bar...</h6>}
            {historicalDataIsReturned ? <DataIntervalBar fromDateUpdate={fromDateUpdated} tillDateUpdate={tillDateUpdated}/> : <h6>Loading data iterval bar...</h6>}
            {historicalDataIsReturned ? <LatestMeasurements /> : <h6>Loading latest measurements...</h6>}
            {forecastDataIsReturned ? <ForecastDataTable /> : <h6>Loading forecast data table...</h6>}
            {historicalDataIsReturned ? <HistoricalDataTable /> : <h6>Loading historicalData...</h6>}
        </div>
    )
}

export default WeatherForecast