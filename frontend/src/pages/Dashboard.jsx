import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tasks/${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [userId, navigate, fetchTasks]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', {
        userId,
        title,
        description,
        completed: false,
      });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const markComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="p-8 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-gradient"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">📋 Your Tasks</h2>

        <div className="flex flex-col items-center mb-10">
          <form onSubmit={handleAddTask} className="w-full max-w-md flex flex-col gap-4">
            <input
              type="text"
              placeholder="Task title"
              className="p-4 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow duration-300 ease-in-out"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Task description"
              className="p-4 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-shadow duration-300 ease-in-out"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-colors duration-300 ease-in-out shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Add Task
            </motion.button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tasks.length === 0 ? (
            <p className="text-gray-600 text-center">No tasks found! Add some tasks to get started.</p>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onComplete={markComplete}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;