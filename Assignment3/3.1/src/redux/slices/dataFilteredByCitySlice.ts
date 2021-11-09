import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Forecast from '../../models/Forecast'

// Define a type for the slice state
interface DataFilteredByCityState {
  value: Forecast[]
}

// Define the initial state using that type
const initialState: DataFilteredByCityState = {
  value: []
}

export const dataFileteredByCitySlice = createSlice({
  name: 'dataFilteredByCity',
  initialState,
  reducers: {
    updateDataFilteredByCity: (state, action: PayloadAction<Forecast[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateDataFilteredByCity } = dataFileteredByCitySlice.actions

export default dataFileteredByCitySlice.reducer