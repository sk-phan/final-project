import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    userData: null,
    error: ''
    
  },
  reducers: {
    setUserData: (store, action) => {
      store.userData = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    }
   
  },
});