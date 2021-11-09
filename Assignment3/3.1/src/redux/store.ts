import { configureStore } from '@reduxjs/toolkit'
import historicalDataSlice from './slices/historicalDataSlice'
import availableCitiesSlice from './slices/availableCitiesSlice'
import availableDateIntervalsSlice from './slices/availableDateIntervalsSlice'
import dataFileteredByCitySlice from './slices/historicalDataFilteredByCitySlice'
import dataFileteredByCitySliceAndDateSlice from './slices/historicalDataFilteredByCityAndDateSlice'
import forecastDataSliceSlice from './slices/forecastDataSlice'
import forecastDataSliceFilteredByCitySlice from './slices/forecastDataFilteredByCity'
import forecastDataSliceFilteredByCitySliceAndDate from './slices/forecastDataFilteredByCityAndDate'

export const store = configureStore({
    reducer: {
      historicalData: historicalDataSlice,
      availableCities: availableCitiesSlice,
      availableDateIntervals: availableDateIntervalsSlice,
      historicalDataFilteredByCity: dataFileteredByCitySlice,
      historicalDataFilteredByCityAndDate: dataFileteredByCitySliceAndDateSlice,
      forecastData: forecastDataSliceSlice,
      forecastDataFilteredByCity: forecastDataSliceFilteredByCitySlice,
      forecastDataFilteredByCityAndDate: forecastDataSliceFilteredByCitySliceAndDate
    },
  })


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch