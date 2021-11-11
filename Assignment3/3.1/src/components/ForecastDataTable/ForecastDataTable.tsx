import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import ForecastData from "../../models/ForecastData";

const ForecastDataTable = () => {
  const forecastDataFiltered: ForecastData[] = useAppSelector(
    (state) => state.forecastDataFiltered.value
  );

  return (
    <div>
      <h3>Forecast Data Table</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Place</th>
            <th>Type</th>
            <th>Unit</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {forecastDataFiltered.map((item) => {
            return (
              <tr key={item.time + item.place + item.type}>
                <td>{item.time}</td>
                <td>{item.place}</td>
                <td>{item.type}</td>
                <td>{item.unit}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastDataTable;
