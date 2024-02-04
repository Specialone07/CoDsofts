import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {authActions} from '../../store/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const isLoggedIn=useSelector((state)=> state.isLoggedIn);
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(authActions.logout());
    navigate('/login')
    // Perform logout logic
  };

  return (
    <nav className="bg--100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-black font-bold text-xl hover:text-red-500">
          PM
        </Link>
        <div className={`md:flex items-center space-x-4 md:space-x-5`}>
          <Link to="/dashboard" className="text-black hover:text-red-500">
            Dashboard
          </Link>
          <Link to="/projects" className="text-black hover:text-red-500">
            Projects
          </Link>
          {/* <Link to="/tasklist" className="text-black hover:text-red-500">
            Tasks
          </Link> */}

          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-black hover:text-red-500 cursor-pointer">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          ) : (
            <>
              <Link to="/signup" className="text-black hover:text-red-500">
                <FontAwesomeIcon icon={faUserPlus} /> 
              </Link>
              <Link to="/login" className="text-black hover:text-red-500">
                <FontAwesomeIcon icon={faSignInAlt} /> 
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;