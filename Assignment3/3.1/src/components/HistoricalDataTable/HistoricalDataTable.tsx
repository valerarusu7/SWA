import { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import HistoricalData from "../../models/HistoricalData";

const HistoricalDataTable = () => {
  const historicalDataFiltered: HistoricalData[] = useAppSelector(
    (state) => state.historicalDataFiltered.value
  );

  return (
    <div>
      <h3>Historical data: </h3>
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
          {historicalDataFiltered.map((item) => {
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
  );
};

export default HistoricalDataTable;
