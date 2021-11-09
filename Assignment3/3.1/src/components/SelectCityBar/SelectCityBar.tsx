import { useEffect, ChangeEvent } from 'react';
import HistoricalData from '../../models/HistoricalData';
import ForecastData from '../../models/ForecastData';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { updateAvailableCitiesData } from '../../redux/slices/availableCitiesSlice'
import { updateDataFilteredByCity } from '../../redux/slices/historicalDataFilteredByCitySlice'
import { updateForecastDataFilteredByCity } from '../../redux/slices/forecastDataFilteredByCity';

const SelectCityBar = () => {

    const historicalData: HistoricalData[] = useAppSelector(state => state.historicalData.value)
    const forecastData: ForecastData[] = useAppSelector(state => state.forecastData.value)
    const availableCities: string[] = useAppSelector(state => state.availableCities.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getCities(historicalData);
    }, [historicalData])


    function getCities(data: HistoricalData[]): void {
        const cityEach: string[] = data.map(e => {
            return e.place
        })
        const uniqueCities: string[] = cityEach.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        dispatch(updateAvailableCitiesData(uniqueCities));
    }

    function filterByCity(event: ChangeEvent<HTMLSelectElement>): void {
        const chosenCity = event.target.value;
        if (chosenCity === "All") {
            dispatch(updateDataFilteredByCity(historicalData))
        } else {
            const filteredDataHistorical: HistoricalData[] = historicalData.filter(element => element.place == chosenCity);
            const filteredDataForecast: ForecastData[] = forecastData.filter(element => element.place == chosenCity);
            // console.log("Filtered forecast data: ")
            // console.log(filteredDataForecast)
            dispatch(updateDataFilteredByCity(filteredDataHistorical));
            dispatch(updateForecastDataFilteredByCity(filteredDataForecast));
        }
    }

    return (
        <div>
            <h3>Choose city</h3>
            <select name="cities" id="select-city" onChange={(event) => filterByCity(event)}>
                <option value="All">All</option>
                {availableCities.map(e => <option value={e} key={e}>{e}</option>)}
            </select>
        </div>

    )
}

export default SelectCityBar;