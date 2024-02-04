import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../components/bg.jpg';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-2xl text-center mx-auto">
          <h2 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
          Project Management <br/> 
          <span className="text-blue-600" >
      <Link to="/dashboard">
        <button className="bg-blue-500 hover:bg-red-500 text-white text-xl py-2 px-3 border rounded-full mt-2">
          Explore
        </button>
      </Link>
    </span>
          </h2>
          <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">Manage your project from any part of the world.</p>
        </div>

        <div className="mt-10 relative max-w-5xl mx-auto">
          <div
            className="w-full object-cover h-96 sm:h-[480px] bg-cover rounded-xl"
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>

          {/* <div className="absolute inset-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <a
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play the overview
              </a>
            </div>
          </div> */}

          <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900">
            <div className="bg-white w-48 h-48 rounded-lg dark:bg-slate-900"></div>
          </div>

          <div className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
            <div className="bg-white w-48 h-48 rounded-full dark:bg-slate-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;