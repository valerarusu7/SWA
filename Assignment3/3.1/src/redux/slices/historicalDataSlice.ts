import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Forecast from '../../models/Forecast'

// Define a type for the slice state
interface HistoricalDataState {
  value: Forecast[]
}

// Define the initial state using that type
const initialState: HistoricalDataState = {
  value: []
}

export const historicalDataSlice = createSlice({
  name: 'historicalData',
  initialState,
  reducers: {
    updateHistoricalData: (state, action: PayloadAction<Forecast[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateHistoricalData } = historicalDataSlice.actions

export default historicalDataSlice.reducer