/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/header/navbar';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import { useSelector, useDispatch } from 'react-redux';
import Home from './pages/Home';
import CreateProject from './pages/CreateProject';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import UserProjects from './pages/userProject';
import Footer from './components/footer/footer';
import store, { authActions } from './store/auth';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              {/* Redirect to login if not logged in */}
            </>
          ) : (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects/create" element={<CreateProject />} />
              <Route path="/myproject" element={<UserProjects />} />
              <Route path="/projects" element={<Projects />} />
            </>
          )}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
