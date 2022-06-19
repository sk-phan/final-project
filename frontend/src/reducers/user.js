import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    accessToken:null,
    userData: null,
    error: '',
    otherUsersData: [],
    reviews: []
    
  },
  reducers: {
    setUserData: (store, action) => {
      store.userData  = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setDeleteAccessToken: (store, action) => {
      store.accessToken = null
    },
    setOtherUsersData: (store, action) => {
      store.otherUsersData = [...action.payload]
    },

    setReviews: (store, action) => {
      store.reviews = [...action.payload]
    }
   
  },
});