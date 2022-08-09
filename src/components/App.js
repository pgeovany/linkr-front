import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import UserContext from '../context/UserContext';

import Home from './layouts/Home';
import SignIn from './layouts/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <UserContext.Provider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
