import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ForecastData from '../../models/ForecastData'

// Define a type for the slice state
interface ForecastDataFilteredState {
  value: ForecastData[]
}

// Define the initial state using that type
const initialState: ForecastDataFilteredState = {
  value: []
}

export const dataFileteredSlice = createSlice({
  name: 'forecastDataFiltered',
  initialState,
  reducers: {
    updateForecastDataFiltered: (state, action: PayloadAction<ForecastData[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateForecastDataFiltered } = dataFileteredSlice.actions

export default dataFileteredSlice.reducer