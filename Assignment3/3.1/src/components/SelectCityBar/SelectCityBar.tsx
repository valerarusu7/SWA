import { useEffect, ChangeEvent } from 'react';
import Forecast from '../../models/Forecast';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { updateAvailableCitiesData } from '../../redux/slices/availableCitiesSlice'
import { updateDataFilteredByCity } from '../../redux/slices/dataFilteredByCitySlice'

const SelectCityBar = () => {

    const historicalData: Forecast[] = useAppSelector(state => state.historicalData.value)
    const availableCities: string[] = useAppSelector(state => state.availableCities.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getCities(historicalData);
    }, [historicalData])


    function getCities(data: Forecast[]): void {
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
            const filteredData: Forecast[] = historicalData.filter(element => element.place == chosenCity);
            dispatch(updateDataFilteredByCity(filteredData))
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