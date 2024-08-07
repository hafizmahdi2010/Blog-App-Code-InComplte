import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import "./css/Mobile.css"
import SingleBlog from './pages/SingleBlog';
import AddNewBlog from './pages/AddNewBlog';
import Profile from './pages/Profile';

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/singUp' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<Home />} />
          <Route path='/singleBlog/:blogId' element={<SingleBlog />} />
          <Route path='/addNewBlog' element={<AddNewBlog />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App