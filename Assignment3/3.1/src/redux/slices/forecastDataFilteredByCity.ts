import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ForecastData from '../../models/ForecastData'

// Define a type for the slice state
interface ForecastDataFilteredByCityState {
  value: ForecastData[]
}

// Define the initial state using that type
const initialState: ForecastDataFilteredByCityState = {
  value: []
}

export const dataFileteredByCitySlice = createSlice({
  name: 'forecastDataFilteredByCity',
  initialState,
  reducers: {
    updateForecastDataFilteredByCity: (state, action: PayloadAction<ForecastData[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateForecastDataFilteredByCity } = dataFileteredByCitySlice.actions

export default dataFileteredByCitySlice.reducer