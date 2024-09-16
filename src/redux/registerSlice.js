import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'registration',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = registerSlice.actions;
export default registerSlice.reducer;
