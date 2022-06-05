
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { user } from "../reducers/user";
import stylyed from 'styled-components'

export const Signup = () => {
  const [mode, setMode] = useState("signup");
  // const [profileType, setProfileType] = useState("")
  const [username, setUsername] = useState("")
  // const [email, setEmail] = useState("")
  // const [animalType, setAnimalType] = useState("")
  // const [location, setLocation] = useState("")
  // const [duration, setDuration] = useState("")
  // const [startDate, setStartDate] = useState("")
  // const [endDate, setEndDate] = useState("")
  const [password, setPassword] = useState("")
  const [img, setImg] = useState("")

  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/userpage");
    }
  }, [accessToken, navigate]);

  const upload = async (e) => {
    const file = e.target.files[0];
    const base64  = await convertBase64(file)
    setImg(base64)
  }
  const convertBase64 = (file) => {
    return new Promise ((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        username, 
        // email, 
        // animalType, 
        // location, 
        // duration, 
        // startDate,
        // endDate,
        password,
        img,
      }),
    };

    fetch("http://localhost:8080/signup", options)
    .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setImg(data.response.img));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setImg(null));
            dispatch(user.actions.setAccessToken(null));
          });
        }
      });
  };


  return (
    <div className="App">
      <form onSubmit={onFormSubmit}>

         <label>Username
         <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          </label>

          <label>Password
         <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          </label>


             <input
              type="file"
              name="myImage"
              onChange={(e) => upload(e)}
        />
      <img src={img}  width="200px" />
          <button type='submit'>Sign up</button>
      </form>
    </div>
  );
}
