import { useEffect, useState, ChangeEvent } from 'react';
import Forecast from '../../models/Forecast';
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { updateAvailableDateIntervals } from '../../redux/slices/availableDateIntervalsSlice';
import { updateDataFilteredByCityAndDate } from '../../redux/slices/dataFilteredByCityAndDateSlice'

const DateIntervalBar = () => {

    const dataFitleredByCity: Forecast[] = useAppSelector(state => state.dataFilteredByCity.value);
    const availableDateIntervals: string[] = useAppSelector(state => state.availableDateIntervals.value);
    const dispatch = useAppDispatch();
    const [fromDate, setFromDate] = useState<Date>();
    const [tillDate, setTillDate] = useState<Date>();
    const [tillDates, setTillDates] = useState<string[]>([]);

    useEffect(() => {
        updateDateIntervals(dataFitleredByCity);
    }, [dataFitleredByCity])

    function updateDateIntervals(data: Forecast[]): void {
        const dateEach: Date[] = data.map(e => {
            return e.time
        })
        const uniqueDates: Date[] = dateEach.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        const intervals: string[] = getAvailableDateIntervals(uniqueDates);
        dispatch(updateAvailableDateIntervals(intervals));
        setTillDates(intervals);
        dispatch(updateDataFilteredByCityAndDate(dataFitleredByCity));
    }

    function getAvailableDateIntervals(all_dates: Date[]): string[] {
        const min = all_dates.reduce(function (a, b) { return a < b ? a : b; });
        const max = all_dates.reduce(function (a, b) { return a > b ? a : b; });

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
        const selectedDate: string= event.target.value;
        setTillDate(new Date(selectedDate));
        filterByDate(fromDate!.toString(), selectedDate);
    }

    function filterByDate(from: string, till: string): void {
        dataFitleredByCity.map(element => {
        })
        const filteredData = dataFitleredByCity.filter(element => new Date(element.time) >= new Date(from) && new Date(element.time) <= new Date(till));
        dispatch(updateDataFilteredByCityAndDate(filteredData));
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
                    {tillDates.map(e => <option value={e} key={e} selected>{e}</option>)}
                </select>
            </div>
        </div>
    )
}

export default DateIntervalBar;