import { useEffect, useState, ChangeEvent } from 'react';
import HistoricalData from '../../models/HistoricalData';
import ForecastData from '../../models/ForecastData';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { updateAvailableDateIntervals } from '../../redux/slices/availableDateIntervalsSlice';
import { updateDataFilteredByCityAndDate } from '../../redux/slices/historicalDataFilteredByCityAndDateSlice'
import { updateForecastDataFilteredByCityAndDate } from '../../redux/slices/forecastDataFilteredByCityAndDate';
import json5 from 'json5';

const DateIntervalBar = () => {

    const dataFitleredByCity: HistoricalData[] = useAppSelector(state => state.historicalDataFilteredByCity.value);
    const forecastDataFilteredByCity: ForecastData[] = useAppSelector(state => state.forecastDataFilteredByCity.value);
    const availableDateIntervals: string[] = useAppSelector(state => state.availableDateIntervals.value);
    const dispatch = useAppDispatch();
    const [fromDate, setFromDate] = useState<Date>();
    const [tillDate, setTillDate] = useState<Date>();
    const [tillDates, setTillDates] = useState<string[]>([]);

    useEffect(() => {
        updateDateIntervals(dataFitleredByCity, forecastDataFilteredByCity);
    }, [dataFitleredByCity, forecastDataFilteredByCity])

    function updateDateIntervals(historicalData: HistoricalData[], forecastData: ForecastData[]): void {
        const historicalDateEach: Date[] = historicalData.map(e => {
            return e.time
        })
        const forecastDateEach: Date[] = forecastData.map(e => {
            return e.time
        })
        const dateEach: Date[] = historicalDateEach.concat(forecastDateEach);
        const uniqueDates: Date[] = dateEach.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        const intervals: string[] = getAvailableDateIntervals(uniqueDates);
        dispatch(updateAvailableDateIntervals(intervals));
        setTillDates(intervals);

        dispatch(updateDataFilteredByCityAndDate(dataFitleredByCity));
        dispatch(updateForecastDataFilteredByCityAndDate(forecastDataFilteredByCity));
    }

    function getAvailableDateIntervals(all_dates: Date[]): string[] {
        const sortedDates = all_dates.sort();

        const min = sortedDates[0];
        const max = sortedDates[sortedDates.length - 1];

        const minDate = new Date(min);
        const maxDate = new Date(max);

        setFromDate(minDate);
        setTillDate(maxDate);

        let dates: string[] = [];
        let newDate = new Date(min);

        while (newDate <= maxDate) {
            dates.push(new Date(newDate).toString());
            newDate.setDate(newDate.getDate() + 1);
        }
        return dates;
    }

    function changeFromDate(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedDate = event.target.value;
        setFromDate(new Date(selectedDate));
        let dates: string[] = [];
        const maxDate: Date = new Date(availableDateIntervals[availableDateIntervals.length - 1]);
        let newDate = new Date(selectedDate);
        while (newDate <= maxDate) {
            dates.push(new Date(newDate).toString());
            newDate.setDate(newDate.getDate() + 1);
        }

        filterByDate(selectedDate, tillDate!.toString());
        setTillDates(dates);
    }

    function changeTillDate(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedDate: string = event.target.value;
        setTillDate(new Date(selectedDate));
        filterByDate(fromDate!.toString(), selectedDate);
    }

    function filterByDate(from: string, till: string): void {
        dataFitleredByCity.map(element => {
        })
        if(till !== "All") {
            const historicalFilteredData = dataFitleredByCity.filter(element => new Date(element.time) >= new Date(from) && new Date(element.time) <= new Date(till));
            dispatch(updateDataFilteredByCityAndDate(historicalFilteredData));
            const forecastFilteredData = forecastDataFilteredByCity.filter(element => new Date(element.time) >= new Date(from) && new Date(element.time) <= new Date(till));
            dispatch(updateForecastDataFilteredByCityAndDate(forecastFilteredData));
        } else {
            const historicalFilteredData = dataFitleredByCity.filter(element => new Date(element.time) >= new Date(from));
            dispatch(updateDataFilteredByCityAndDate(historicalFilteredData));
            const forecastFilteredData = forecastDataFilteredByCity.filter(element => new Date(element.time) >= new Date(from));
            dispatch(updateForecastDataFilteredByCityAndDate(forecastFilteredData));
        }

    }

    return (
        <div>
            <div>
                <h3>From:</h3>
                <select name="from-dates" id="select-from-date" onChange={(event) => changeFromDate(event)} value={fromDate?.toString()}>
                    {availableDateIntervals.map(e => <option value={e} key={e}>{e}</option>)}
                </select>
            </div>
            <div>
                <h3>Till:</h3>
                <select name="dates" id="select-till-date" onChange={(event) => changeTillDate(event)} value={tillDate?.toString()}>
                    <option value="All">All</option>
                    {tillDates.map(e => <option value={e} key={e}>{e}</option>)}
                </select>
            </div>
        </div>
    )
}

export default DateIntervalBar;