

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ProtectedRoute from './components/PtotectedRout'; // Import the ProtectedRoute component



function App() {
 
  return (
    <>
     <BrowserRouter>
      <Routes>     
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App
