import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface AvailableCitiesState {
  value: string[]
}

// Define the initial state using that type
const initialState: AvailableCitiesState = {
  value: []
}

export const availableCitiesSlice = createSlice({
  name: 'availableCities',
  initialState,
  reducers: {
    updateAvailableCitiesData: (state, action: PayloadAction<string[]>) => {
        state.value = action.payload
    }
  }
})

export const { updateAvailableCitiesData } = availableCitiesSlice.actions

export default availableCitiesSlice.reducer