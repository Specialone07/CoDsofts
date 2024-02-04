
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Project from './Project';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const sendRequest = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      const data = res.data;
      console.log('Received data:', data);
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
      console.log('Project deleted successfully!');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sendRequest();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-wrap justify-center mt-2">
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 w-full"
        />
      </div>
      {filteredProjects.map((project) => (
        // Skip rendering if the user is unknown
        (project.createdBy && project.createdBy.username) ? (
          <Link key={project._id} to={`/projects/${project._id}`}>
            <div className="m-2">
              <Project
                id={project._id}
                isUser={localStorage.getItem('userId') === project.createdBy?._id}
                name={project.name}
                description={project.description}
                deadline={project.deadline}
                username={project.createdBy?.username || 'Unknown User'}
                todos={project.todos}
                status={project.status}
                handleDelete={() => handleDelete(project._id)}
              />
            </div>
          </Link>
        ) : null
      ))}
    </div>
  );
};

export default Projects;