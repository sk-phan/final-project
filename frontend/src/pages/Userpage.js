import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";

export const Userpage = () => {


  const accessToken = useSelector((store) => store.user.accessToken);
  const name = useSelector((store) => store.user.username);
  const img = useSelector((store) => store.user.img)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickLogout = () => {
    dispatch(user.actions.setDeleteAccessToken(null));
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  console.log('img', img)
  console.log("name", name)
  console.log('accessToken', accessToken)

  return (
    <>
        <h1>Welcome {name}, this is your account!</h1>
        <img src={img}  width="200px" />
        <button onClick={onClickLogout}>Log out</button>
    </>
  );
};