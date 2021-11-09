import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Forecast from '../../models/ForecastData'

// Define a type for the slice state
interface ForecastDataState {
  value: Forecast[]
}

// Define the initial state using that type
const initialState: ForecastDataState = {
  value: []
}

export const historicalDataSlice = createSlice({
  name: 'forecastData',
  initialState,
  reducers: {
    updateForecastData: (state, action: PayloadAction<Forecast[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateForecastData } = historicalDataSlice.actions

export default historicalDataSlice.reducer