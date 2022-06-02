import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import FileBase64 from 'react-file-base64';
function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [img, setImg] = useState("");
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
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
const onSubmit = (e) => {
  e.preventDefault();
  /*const options = {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      },
    body: JSON.stringify({ username, password, image}),
  }
  fetch('http://localhost:8080/signup', options)
  .then(res => res.json())
  .then(response => console.log(response))
  */
}
  // useEffect(() => {
  //  if (selectedImage) {
  //    const image = URL.createObjectURL(selectedImage) ;
  //    console.log(image)
  //    setImg(selectedImage)
  // }
  // }, [selectedImage])
  // useEffect(() => {
  //   if (selectedImage) {
  //     const reader = new FileReader();
  //     reader.onLoaden = () => {
  //     setImg(reader.result)
  //     }
  //     reader.readAsDataURL(selectedImage);
  //     console.log(reader,'result')
  //   }
  // }, [selectedImage])
  return (
    <div className="App">
      <form onSubmit={onSubmit}>
         <input
          type='text'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          />
         <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
             <input
              type="file"
              name="myImage"
              onChange={(e) => upload(e)}
        />
      <img src={img}  />
          <button type='submit'>Sign up</button>
      </form>
    </div>
  );
}
export default App;