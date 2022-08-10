import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from '../context/UserContext';
import '../assets/reset.css';

import Home from './layouts/Home';
import SignIn from './layouts/SignIn';
import SignUp from './layouts/SignUp';

export default function App() {
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{username, setUsername, image, setImage, token, setToken}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
