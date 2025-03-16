import {createSlice, configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
  name:"",
  initialState:{},
  reducers:{},
});

export const authActions = authSlice.authActions;

export const store = configureStore({
  reducer: aurthSlice.reducer,
})