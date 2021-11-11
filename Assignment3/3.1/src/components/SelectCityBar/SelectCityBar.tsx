import { useEffect, ChangeEvent } from 'react';
import HistoricalData from '../../models/HistoricalData';
import ForecastData from '../../models/ForecastData';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { updateAvailableCitiesData } from '../../redux/slices/availableCitiesSlice'
import './SelectCityBar.scss'

interface SelectCityBarProps {
    cityUpdateCallback(cityUpdate: string): void;
}

const SelectCityBar = (props: SelectCityBarProps) => {

    const historicalData: HistoricalData[] = useAppSelector(state => state.historicalData.value)
    const forecastData: ForecastData[] = useAppSelector(state => state.forecastData.value)
    const availableCities: string[] = useAppSelector(state => state.availableCities.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getCities(historicalData, forecastData);
    }, [historicalData])

  
    function getCities(historicalData: HistoricalData[], forecastData: ForecastData[]): void {
        const cityEachHistoricalData: string[] = historicalData.map(e => {
            return e.place
        })
        const cityEachForecastData: string[] = forecastData.map(e => {
            return e.place
        })
        const cityEach: string[] = cityEachForecastData.concat(cityEachHistoricalData);
        const uniqueCities: string[] = cityEach.filter(function (item, pos, self) {
            return self.indexOf(item) === pos;
        })
        dispatch(updateAvailableCitiesData(uniqueCities));
    }

    function cityUpdate(event: ChangeEvent<HTMLSelectElement>): void {
        const chosenCity = event.target.value;
        props.cityUpdateCallback(chosenCity);
    }

    return (
        <div className="select-city-bar">
            <h3>Choose city</h3>
            <select name="cities" id="select-city" onChange={(event) => cityUpdate(event)}>
                <option value="All">All</option>
                {availableCities.map(e => <option value={e} key={e}>{e}</option>)}
            </select>
        </div>

    )
}

export default SelectCityBar;