import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registerSlice'; // This will be created in the next step

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});
