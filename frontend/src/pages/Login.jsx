import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const controls = useAnimation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('userId', res.data.userId);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  const handAnimation = useCallback(async () => {
    await controls.start({ rotate: -5, transition: { duration: 0.5, ease: "easeInOut" } });
    await controls.start({ rotate: 5, transition: { duration: 0.5, ease: "easeInOut" } });
    await controls.start({ rotate: 0, transition: { duration: 0.5, ease: "easeInOut" } });
  }, [controls]);

  React.useEffect(() => {
    handAnimation();
    const intervalId = setInterval(handAnimation, 5000);

    return () => clearInterval(intervalId);
  }, [handAnimation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <motion.div
        className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-6 text-center"
            animate={controls}
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            Welcome Back
            <motion.span
              style={{ display: 'inline-block', transformOrigin: 'center' }}
            >
              👋
            </motion.span>
          </motion.h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-indigo-700 transition duration-300"
            >
              Login
            </motion.button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;