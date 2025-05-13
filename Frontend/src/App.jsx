import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChartUploader from './components/ChartUploader';
import JobCard from './components/JobCard';
import Dashboard from './pages/Student/Dashboard';
import CustomModel from './components/Model/CustomModel';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        
        <Route path="/ChartUploader" element={<ChartUploader />} />
        <Route path="/JobCard" element={<JobCard />} />
        <Route path="/CustomModel" element={<CustomModel />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
