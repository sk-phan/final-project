import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    accessToken:null,
    userData: null,
    
  },
  reducers: {
    setUserData: (store, action) => {
      store.userData = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setDeleteAccessToken: (store, action) => {
      store.accessToken = null
    }

   
  },
});