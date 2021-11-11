import { configureStore } from '@reduxjs/toolkit'
import historicalDataSlice from './slices/historicalDataSlice'
import availableCitiesSlice from './slices/availableCitiesSlice'
import availableDateIntervalsSlice from './slices/availableDateIntervalsSlice'
import forecastDataSliceSlice from './slices/forecastDataSlice'
import historicalDataFilteredSlice from './slices/historicalDataFilteredSlice'
import forecastDataFilteredSlice from './slices/forecastDataFilteredSlice'

export const store = configureStore({
    reducer: {
      historicalData: historicalDataSlice,
      forecastData: forecastDataSliceSlice,
      availableCities: availableCitiesSlice,
      availableDateIntervals: availableDateIntervalsSlice,
      historicalDataFiltered: historicalDataFilteredSlice,
      forecastDataFiltered: forecastDataFilteredSlice,
    },
  })


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch