import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import HistoricalData from '../../models/HistoricalData'

// Define a type for the slice state
interface DataFilteredByCityState {
  value: HistoricalData[]
}

// Define the initial state using that type
const initialState: DataFilteredByCityState = {
  value: []
}

export const dataFileteredByCitySlice = createSlice({
  name: 'historicalDataFilteredByCity',
  initialState,
  reducers: {
    updateDataFilteredByCity: (state, action: PayloadAction<HistoricalData[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateDataFilteredByCity } = dataFileteredByCitySlice.actions

export default dataFileteredByCitySlice.reducer