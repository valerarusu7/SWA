import { useEffect, ChangeEvent } from 'react';
import HistoricalData from '../../models/HistoricalData';
import ForecastData from '../../models/ForecastData';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { updateAvailableDateIntervals } from '../../redux/slices/availableDateIntervalsSlice';

interface DateIntervalBarProps {
    fromDateUpdate(dateUpdate: Date): void;
    tillDateUpdate(dateUpdate: Date): void;
}


const DateIntervalBar = (props: DateIntervalBarProps) => {

    const historicalData: HistoricalData[] = useAppSelector(state => state.historicalData.value)
    const forecastData: ForecastData[] = useAppSelector(state => state.forecastData.value)
    const availableDateIntervals: string[] = useAppSelector(state => state.availableDateIntervals.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        updateDateIntervals(historicalData, forecastData);
    }, [historicalData, forecastData])

    function updateDateIntervals(historicalData: HistoricalData[], forecastData: ForecastData[]): void {
        const historicalDateEach: Date[] = historicalData.map(e => {
            return e.time
        })
        const forecastDateEach: Date[] = forecastData.map(e => {
            return e.time
        })
        const dateEach: Date[] = historicalDateEach.concat(forecastDateEach);
        const uniqueDates: Date[] = dateEach.filter(function (item, pos, self) {
            return self.indexOf(item) === pos;
        })
        const intervals: string[] = getAvailableDateIntervals(uniqueDates);
        dispatch(updateAvailableDateIntervals(intervals));
    }

    function getAvailableDateIntervals(all_dates: Date[]): string[] {
        const sortedDates = all_dates.sort();

        const min = sortedDates[0];
        const max = sortedDates[sortedDates.length - 1];

        const minDate = new Date(min);
        const maxDate = new Date(max);

        let dates: string[] = [];
        let newDate = new Date(min);

        while (newDate <= maxDate) {
            dates.push(new Date(newDate).toString());
            newDate.setDate(newDate.getDate() + 1);
        }
        return dates;
    }

    function changeFromDate(event: ChangeEvent<HTMLSelectElement>): void {
        props.fromDateUpdate(new Date(event.target.value));
    }

    function changeTillDate(event: ChangeEvent<HTMLSelectElement>): void {
        props.tillDateUpdate(new Date(event.target.value));
    }

    return (
        <div>
            <div>
                <h3>From:</h3>
                <select name="from-dates" id="select-from-date" onChange={(event) => changeFromDate(event)}>
                    {availableDateIntervals.map(e => <option value={e} key={e}>{e}</option>)}
                </select>
            </div>
            <div>
                <h3>Till:</h3>
                <select name="dates" id="select-till-date" onChange={(event) => changeTillDate(event)}>
                    <option value="All">All</option>
                    {availableDateIntervals.map(e => <option value={e} key={e}>{e}</option>)}
                </select>
            </div>
        </div>
    )
}

export default DateIntervalBar;