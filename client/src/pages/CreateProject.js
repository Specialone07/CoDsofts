import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedInUserId = localStorage.getItem('userId');

      if (!loggedInUserId) {
        console.error('User ID not found. Unable to create a project.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/projects/add', {
        name,
        description,
        deadline,
        createdBy: loggedInUserId,
      });

      const createdProject = response.data;
      console.log('Project created successfully:', createdProject);

      setSuccessMessage('Project created successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        // Redirect to the project page
        navigate(`/projects/${createdProject._id}`);
      }, 2000); // Adjust the timeout duration as needed
    } catch (error) {
      console.error('Error creating project:', error.response.data);
      // Handle the error or display a user-friendly message.
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Project</h2>
      {successMessage && (
        <div className="mb-4 text-green-600 font-semibold">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Project Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-600">
            Project Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
            Project Deadline
          </label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;