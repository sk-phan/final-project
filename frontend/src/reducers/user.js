import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    userData: null,
    
  },
  reducers: {
    setUserData: (store, action) => {
      store.userData = action.payload;
    },
   
  },
});