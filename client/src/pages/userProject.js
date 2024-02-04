import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Project from './Project';

const UserProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const _id = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        if (!_id) {
          console.error('Invalid user ID:', _id);
          return;
        }

        const apiUrl = `http://localhost:5000/api/projects/${_id}`;
        console.log('API URL:', apiUrl);

        const res = await axios.get(apiUrl);
        const data = res.data;

        console.log('API Response:', data);

        if (data && data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          console.error('Invalid response format:', data);
        }
      } catch (err) {
        console.error('Error fetching user projects:', err);
        setError('Error fetching user projects');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {projects.map((project) => (
        <Project
          key={project._id}
          id={project._id}
          isUser={true}
          name={project.name}
          description={project.description}
          deadline={project.deadline}
          createdBy={project.createdBy?.username || 'Unknown User'}
          // Add other project-related props as needed
        />
      ))}
    </div>
  );
};

export default UserProjects;