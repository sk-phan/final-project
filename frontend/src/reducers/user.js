import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    userId: null,
    // profileType: null,
    username: null,
    // email: null,
    // animalType: null, 
    // location: null, 
    // duration: null,
    // startDate: null, 
    // endDate: null, 
    accessToken: null,
    // error: null,
    img: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    // setProfileTypr: (store, action) => {
    //   store.profileType = action.payload;
    // },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    // setEmail: (store, action) => {
    //     store.email = action.payload;
    // },
    // setAnimalType: (store, action) => {
    //     store.animalType = action.payload;
    // },
    // setLocation: (store, action) => {
    //     store.location = action.payload;
    // },
    // setDuration: (store, action) => {
    //     store.duration = action.payload;
    // },
    // setStartDate: (store, action) => {
    //     store.startDate = action.payload;
    // },
    // setEndDate: (store, action) => {
    //     store.endDate = action.payload;
    // },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    // setError: (store, action) => {
    //   store.error = action.payload;
    // },
    setImg: (store, action) => {
      store.img = action.payload;
    },
    setDeleteAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
  },
});