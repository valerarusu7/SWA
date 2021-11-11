import { useState, useEffect} from 'react';
import { useAppSelector } from '../../redux/hooks'
import HistoricalData from '../../models/HistoricalData';
import './LatestMeasurements.scss'

const LatestMeasurements = () => {
    const historicalDataFiltered: HistoricalData[] = useAppSelector(state => state.historicalDataFiltered.value)
    const [latestMeasurements, setLatestMeasurements] = useState<(HistoricalData | null)[]>([]);

    useEffect(() => {
        updateLatestMeasurements(historicalDataFiltered);
    }, [historicalDataFiltered])

    function updateLatestMeasurements(data: HistoricalData[]) : void {
        const wind = data.filter(e => e.type === "wind speed");
        const rain = data.filter(e => e.type === "precipitation");
        const temp = data.filter(e => e.type === "temperature");
        const latestMeasurements: (HistoricalData | null)[] = 
            [getLatestMeasurement(wind), getLatestMeasurement(rain), getLatestMeasurement(temp)]; 
        setLatestMeasurements(latestMeasurements);
    }

    function getLatestMeasurement(data: HistoricalData[]) : HistoricalData | null {
        if(data.length == 0) {
            return null;
        }
        return data.reduce((a, b) => {
            return new Date(a.time) > new Date(b.time) ? a : b;
        })
    }

    return (
        <div>
            <h3>Latest measurements:</h3>
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
                    {latestMeasurements.map(item => {
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
        </div>
    )
}

export default LatestMeasurements;