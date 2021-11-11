import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import HistoricalData from '../../models/HistoricalData'

// Define a type for the slice state
interface DataFilteredState {
  value: HistoricalData[]
}

// Define the initial state using that type
const initialState: DataFilteredState = {
  value: []
}

export const dataFileteredSlice = createSlice({
  name: 'historicalDataFiltered',
  initialState,
  reducers: {
    updateHistoricalDataFiltered: (state, action: PayloadAction<HistoricalData[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateHistoricalDataFiltered } = dataFileteredSlice.actions

export default dataFileteredSlice.reducer