import PredictionData from "./PredictionData";

export default interface WarningData {
    id: string,
    severity: number,
    prediction: PredictionData,
  }
