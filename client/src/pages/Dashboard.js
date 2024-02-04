import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState({ pending: [], inProgress: [], completed: [] });
  const [status, setStatus] = useState('loading'); // loading, succeeded, failed
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setStatus('loading');
      const response = await axios.get('http://localhost:5000/api/projects');
      const data = response.data;

      // Check if data is an array, otherwise, set it to an empty array
      const projectsArray = Array.isArray(data) ? data : [];

      const pendingProjects = projectsArray.filter((project) => project.status === 'todo');
      const inProgressProjects = projectsArray.filter((project) => project.status === 'in-progress');
      const completedProjects = projectsArray.filter((project) => project.status === 'done');

      setProjects({
        pending: pendingProjects,
        inProgress: inProgressProjects,
        completed: completedProjects,
      });

      setStatus('succeeded');
    } catch (err) {
      setError(`Error fetching projects: ${err.message}`);
      setStatus('failed');
      console.error(err); // Log the error for further analysis
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProjectClick = () => {
    navigate('/projects/create');
  };

  return (
    <div className='p-4'>
      <div className='bg-white p-4 rounded shadow'>
        <h2 className='text-2xl font-bold mb-4'>Project Status Dashboard</h2>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && (
          <div>
            <div className='flex'>
              <div className='w-1/3 pr-2'>
                <Link to='/projects/pending'>
                  <div className='bg-blue-500 text-white p-4 rounded mb-2'>
                    Not Started - {projects.pending.length}
                  </div>
                </Link>
              </div>
              <div className='w-1/3 px-2'>
                <Link to='/projects/in-progress'>
                  <div className='bg-yellow-500 text-white p-4 rounded mb-2'>
                    In Progress - {projects.inProgress.length}
                  </div>
                </Link>
              </div>
              <div className='w-1/3 pl-2'>
                <Link to='/projects/completed'>
                  <div className='bg-green-500 text-white p-4 rounded mb-2'>
                    Completed - {projects.completed.length}
                  </div>
                </Link>
              </div>
            </div>
            <div className='mt-4'>
              <button onClick={handleCreateProjectClick} className='bg-indigo-500 text-white py-2 px-4 rounded'>
               Create Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;