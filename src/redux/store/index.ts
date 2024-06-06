import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from '../slices/authSlice'

export const store = configureStore({
    reducer: {
        auth: authenticationSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch