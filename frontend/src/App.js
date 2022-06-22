import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "@reduxjs/toolkit";

import { Signup } from "./components/Signup";
import { Userpage } from "./pages/Userpage";
import MainPage from "./pages/MainPage";
import { Profile } from "./pages/Profile";
import { Login } from "./components/Login";
import {NotFound} from './pages/NotFound'
import {UserDetails} from './pages/UserDetails';
import {Favorites} from './pages/Favorites'


import { user } from "./reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

let preloadedStated = {};
const persistedStateJSON = localStorage.getItem("reduxState");

if (persistedStateJSON) {
  preloadedStated = JSON.parse(persistedStateJSON)
}

const store = createStore( reducer, preloadedStated );

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/userpage" element={<Userpage />} />
            <Route path='/userdetails/:userId' element={<UserDetails />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/favorites' element={<Favorites />} />
          
          <Route path="/*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};