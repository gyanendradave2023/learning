import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className='flex justify-between'>
      <ul className="flex space-x-4">
        <li><Link to="/inbox">Inbox</Link></li>
        <li><Link to="/sent">Sent Items</Link></li>
        <li><Link to="/send-email">New Email</Link></li>
        
      </ul>
      <ul className="flex space-x-4">
       
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
