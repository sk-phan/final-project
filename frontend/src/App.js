import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { Signup } from "./components/Signup";
import { Userpage } from "./pages/Userpage";
import MainPage from "./pages/MainPage";
import { Profile } from "./pages/Profile";
import { Login } from "./components/Login";
import {NotFound} from './pages/NotFound'
import { NavBar } from "./components/NavBar";
import {UserDetails} from './pages/UserDetails'


import { user } from "./reducers/user";

const reducer = combineReducers({
  user: user.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<NavBar/>} /> 
            {/* <Route path="/" element={<MainPage />} />  */}
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} /> 
          <Route path="/userpage" element={<Userpage />} />
          <Route path='/userdetails/:userId' element={<UserDetails />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="/*" element={<NotFound />} /> 
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};