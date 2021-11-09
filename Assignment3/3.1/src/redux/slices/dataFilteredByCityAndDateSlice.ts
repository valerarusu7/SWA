import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Forecast from '../../models/Forecast'

// Define a type for the slice state
interface DataFilteredByCityAndDateState {
  value: Forecast[]
}

// Define the initial state using that type
const initialState: DataFilteredByCityAndDateState = {
  value: []
}

export const dataFileteredByCityAndDateSlice = createSlice({
  name: 'dataFilteredByCityAndDate',
  initialState,
  reducers: {
    updateDataFilteredByCityAndDate: (state, action: PayloadAction<Forecast[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateDataFilteredByCityAndDate } = dataFileteredByCityAndDateSlice.actions

export default dataFileteredByCityAndDateSlice.reducer