import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Inbox from './pages/Inbox';
import Sent from './pages/Sent';
import EmailView from './pages/EmailView';
import EmailForm from './components/EmailForm';
import { useSelector } from 'react-redux';

const App = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      {/* Conditionally render Navbar based on authentication status */}
      {token && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? '/inbox' : '/login'} />}
        />
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/inbox" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/inbox" />}
        />
        <Route
          path="/inbox"
          element={token ? <Inbox /> : <Navigate to="/login" />}
        />
        <Route
          path="/sent"
          element={token ? <Sent /> : <Navigate to="/login" />}
        />
        <Route
          path="/send-email"
          element={token ? <EmailForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/email/:id"
          element={token ? <EmailView /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
