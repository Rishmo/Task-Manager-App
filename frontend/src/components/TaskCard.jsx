import React from 'react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onComplete, onDelete }) => {
  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-md border ${
        task.completed ? 'bg-green-100 border-green-200' : 'bg-white border-gray-200'
      } transition-transform duration-300 ease-in-out hover:shadow-lg hover:transform-translateY(-3px)`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <h3 className="text-lg font-semibold mb-3">{task.title}</h3>
      <p className="text-gray-600 mb-5">{task.description}</p>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onComplete(task._id)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 ease-in-out"
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 ease-in-out"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;