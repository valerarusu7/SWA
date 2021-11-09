import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import HistoricalData from '../../models/HistoricalData'

// Define a type for the slice state
interface DataFilteredByCityAndDateState {
  value: HistoricalData[]
}

// Define the initial state using that type
const initialState: DataFilteredByCityAndDateState = {
  value: []
}

export const dataFileteredByCityAndDateSlice = createSlice({
  name: 'historicalDataFilteredByCityAndDate',
  initialState,
  reducers: {
    updateDataFilteredByCityAndDate: (state, action: PayloadAction<HistoricalData[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateDataFilteredByCityAndDate } = dataFileteredByCityAndDateSlice.actions

export default dataFileteredByCityAndDateSlice.reducer