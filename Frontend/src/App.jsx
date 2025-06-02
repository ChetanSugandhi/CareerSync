import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Common Pages
import Landing from './Pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChartUploader from './components/ChartUploader';
import JobCard from './components/JobCard';
import CustomModel from './components/Model/CustomModel';

// Student Pages
import Dashboard from './pages/Student/Dashboard';
import Profile from './pages/Student/Profile';
import Jobs from './pages/Student/Jobs';
import Applications from './pages/Student/Applications';
import History from './pages/Student/History';
import Internship from './pages/Internship';
import Contact from './pages/Contact';
import Recruiter from "./pages/Recruiter/RecruiterHome";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterPostJob from "./pages/recruiter/PostJob";
import RecruiterApplicants from "./pages/recruiter/Applicants";

import Admin from './pages/Admin/Admin';
import Upload from './pages/Charts/Upload';
import HistoryCharts from './pages/Charts/History';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Component Routes (for testing/demo) */}
        <Route path="/chart-uploader" element={<ChartUploader />} />
        <Route path="/job-card" element={<JobCard />} />
        <Route path="/custom-model" element={<CustomModel />} />

        {/* Student Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/internships' element={<Internship />} />

        {/* Recruiter */}
        <Route path='/recruiter' element={<Recruiter />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />
        <Route path='/recruiter-postjob' element={<RecruiterPostJob />} />
        <Route path='/recruiter-applicants' element={<RecruiterApplicants />} />


        <Route path='/upload' element={<Upload/>} />
        <Route path='/historyCharts' element={<HistoryCharts />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
