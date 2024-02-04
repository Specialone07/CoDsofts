import React, {useState, useEffect} from 'react'
import 'animate.css';
import '../index.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail]=useState('')
    const [username, setUsername]=useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate()

    useEffect(()=>{
        fetchUsers();
    }, [] )

    const fetchUsers=()=>{
        axios
        .get('http://localhost:5000/api/users/')
        .then((res)=>{
            // console.log(res.data)
        })

    }
    const handleRegister=(event)=>{
        event.preventDefault()
        axios
        .post('http://localhost:5000/api/users/signup/',{email, username, password})
        .then(()=>{
            alert('Registration Succesful')
            setEmail('')
            setUsername('')
            setPassword('')
            fetchUsers()
            navigate('/login')
        })
        .catch((err)=>{
            alert("Error with Registration")
        })
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-iceWhite">
      <div className="relative">
        <div className="bg-white p-8 rounded-md shadow-md w-96 relative overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none ml-32"
            >
              Signup
            </button>
          </form>
        </div>
        {/* <div className="absolute inset-0 border-4 border-gradient"></div> */}
      </div>
    </div>
  );
};

export default Signup;