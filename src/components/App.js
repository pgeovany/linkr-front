import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from '../context/UserContext';
import Timeline from './layouts/Timeline';
import SignIn from './layouts/SignIn';
import SignUp from './layouts/SignUp';

export default function App() {
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ username, setUsername, image, setImage, token, setToken }}
      >
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
