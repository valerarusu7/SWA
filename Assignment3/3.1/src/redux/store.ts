import { configureStore } from '@reduxjs/toolkit'
import historicalDataSlice from './slices/historicalDataSlice'
import availableCitiesSlice from './slices/availableCitiesSlice'
import availableDateIntervalsSlice from './slices/availableDateIntervalsSlice'
import dataFileteredByCitySlice from './slices/dataFilteredByCitySlice'
import dataFileteredByCitySliceAndDate from './slices/dataFilteredByCityAndDateSlice'

export const store = configureStore({
    reducer: {
      historicalData: historicalDataSlice,
      availableCities: availableCitiesSlice,
      availableDateIntervals: availableDateIntervalsSlice,
      dataFilteredByCity: dataFileteredByCitySlice,
      dataFilteredByCityAndDate: dataFileteredByCitySliceAndDate
    },
  })


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch