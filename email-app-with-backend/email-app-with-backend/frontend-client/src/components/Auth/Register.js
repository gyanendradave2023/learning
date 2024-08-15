import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    try {
      await dispatch(register({ username, email, password })).unwrap();
      setMessage('Registration successful! You can now log in.'); // Success message
      navigate('/login');
    } catch (error) {
      setMessage(error); // Error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md min-w-[360px]">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {message && <p className={`mb-4 ${error ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-[3rem] p-4 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[3rem] p-4 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[3rem] p-4 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600">
            {`Already have an account?`}{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login here
            </Link>
          </p>
      </div>
    </div>
  );
};

export default Register;
