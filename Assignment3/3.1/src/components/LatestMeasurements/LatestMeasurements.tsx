import { useState, useEffect} from 'react';
import { useAppSelector } from '../../redux/hooks'
import HistoricalData from '../../models/HistoricalData';

const LatestMeasurements = () => {
    const dataFitleredByCity: HistoricalData[] = useAppSelector(state => state.historicalDataFilteredByCity.value)
    const [latestMeasurements, setLatestMeasurements] = useState<(HistoricalData | null)[]>([]);

    useEffect(() => {
        updateLatestMeasurements(dataFitleredByCity);
    }, [dataFitleredByCity])

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
            <p>{JSON.stringify(latestMeasurements)}</p>
        </div>
    )
}

export default LatestMeasurements;