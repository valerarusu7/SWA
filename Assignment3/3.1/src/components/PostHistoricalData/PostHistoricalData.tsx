import { useState} from 'react';
import HistoricalData from '../../models/HistoricalData';
import './PostHistoricalData.scss'

const PostHistoricalData = () => {

    const [place, setPlace] = useState<string>("");
    const [time, setTime] = useState<string>(new Date().toString());
    const [type, setType] = useState<string>("");
    const [unit, setUnit] = useState<string>("");
    const [value, setValue] = useState<number>(0);

    function postHistoricalData(): void {
        let newForecast : HistoricalData = {
            place: place,
            time: new Date(time),
            type: type,
            unit: unit,
            value: value
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newForecast)
        };
        fetch('http://localhost:8080/data', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <div className="post-data-form">
            <div>
                <label>
                    Place
                    <input type="text" value={place} onChange={event => setPlace(event.target.value)} />
                </label>
                <label>
                    Time
                    <input type="text" value={time.toString()} onChange={event => setTime(event.target.value)} />
                </label>
                <label>
                    Type
                    <input type="text" value={type} onChange={event => setType(event.target.value)} />
                </label>
                <label>
                    Unit
                    <input type="text" value={unit} onChange={event => setUnit(event.target.value)} />
                </label>
                <label>
                    Value
                    <input type="text" value={value} onChange={event => setValue(parseInt(event.target.value))} />
                </label>
                <button onClick={e => postHistoricalData()}>Submit</button>
            </div>
        </div>
    )
}

export default PostHistoricalData;