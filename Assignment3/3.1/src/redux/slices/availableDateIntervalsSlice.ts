import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AvailableDateIntervalsState {
  value: string[]
}

// Define the initial state using that type
const initialState: AvailableDateIntervalsState = {
  value: []
}

export const availableDateIntervalsSlice = createSlice({
  name: 'availableDateIntervals',
  initialState,
  reducers: {
    updateAvailableDateIntervals: (state, action: PayloadAction<string[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateAvailableDateIntervals } = availableDateIntervalsSlice.actions

export default availableDateIntervalsSlice.reducer