import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import UserContext from '../context/UserContext';
import Timeline from './layouts/Timeline/Timeline';
import SignIn from './layouts/SignIn';
import SignUp from './layouts/SignUp';
import Trend from './layouts/Timeline/Trend';
import UserPage from './layouts/UserPage';

export default function App() {
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [updateListPosts, setUpdateListPosts] = useState(0);

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          username,
          setUsername,
          image,
          setImage,
          token,
          setToken,
          userId,
          setUserId,
          setUpdateListPosts,
          updateListPosts,
        }}
      >
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtag/:hashtag" element={<Trend />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
