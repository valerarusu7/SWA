import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ForecastData from '../../models/ForecastData'

// Define a type for the slice state
interface ForecastDataFilteredByCityAndDateState {
  value: ForecastData[]
}

// Define the initial state using that type
const initialState: ForecastDataFilteredByCityAndDateState = {
  value: []
}

export const dataFileteredByCityAndDateSlice = createSlice({
  name: 'forecastDataFilteredByCityAndDate',
  initialState,
  reducers: {
    updateForecastDataFilteredByCityAndDate: (state, action: PayloadAction<ForecastData[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateForecastDataFilteredByCityAndDate } = dataFileteredByCityAndDateSlice.actions

export default dataFileteredByCityAndDateSlice.reducer