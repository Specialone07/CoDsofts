import React, { useState } from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Project = ({ name, description, deadline, username, isUser, id, status }) => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/projects/${id}`);
  };

  const confirmDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');
    if (confirmed) {
      try {
        await deleteRequest();
        alert('Project deleted successfully');
        navigate('/projects');
      } catch (error) {
        console.error('Handle delete error:', error);
      }
    }
  };

  const deleteRequest = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  const updateStatusRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/api/projects/update/${id}`, {
        status: selectedStatus,
      });
    } catch (error) {
      console.error('Error updating project status:', error);
      throw error;
    }
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    updateStatusRequest(); // Automatically update status when a new one is selected
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex items-center">
        {/* <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl">
          {name.charAt(0)}
        </div> */}
        <div className="ml-4 flex-grow">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-gray-700 mb-2">{description}</div>
          <div className="flex items-center mb-2 text-sm text-gray-500">
            <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
          <div>
          </div>
          </div>
          <div className="text-gray-700 mb-2"> Created by: {username}</div>
        </div>
        {isUser && (
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? 'Select Status' : selectedStatus}
              </button>
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="none">
                    <button
                      onClick={() => handleStatusChange('todo')}
                      className={`${
                        selectedStatus === 'todo' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                    >
                      Not Started
                    </button>
                    <button
                      onClick={() => handleStatusChange('in-progress')}
                      className={`${
                        selectedStatus === 'in-progress' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusChange('done')}
                      className={`${
                        selectedStatus === 'done' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                    >
                      Completed
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              <BsPencil size={20} />
            </button>
            <button onClick={() => confirmDelete()} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              <BsTrash size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;