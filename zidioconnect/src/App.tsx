import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import StudentDashboard from './components/dashboard/StudentDashboard';
import RecruiterDashboard from './components/dashboard/RecruiterDashboard';
import JobListing from './components/jobs/JobListing';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Unauthorized from './components/auth/Unauthorized';
import theme from './theme';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'recruiter';
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    }
  }
}

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppProvider>
            <div className="App">
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected Student Routes */}
                <Route 
                  path="/student/*" 
                  element={
                    <ProtectedRoute requiredRole="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Recruiter Routes */}
                <Route 
                  path="/recruiter/*" 
                  element={
                    <ProtectedRoute requiredRole="recruiter">
                      <RecruiterDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Protected Job Routes */}
                <Route 
                  path="/jobs" 
                  element={
                    <ProtectedRoute>
                      <JobListing />
                    </ProtectedRoute>
                  } 
                />

                {/* Default Route - Redirect based on user role */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute>
                      {(user: User | null) => {
                        if (!user) return <Navigate to="/login" replace />;
                        if (user.role === 'student') {
                          return <Navigate to="/student" replace />;
                        }
                        if (user.role === 'recruiter') {
                          return <Navigate to="/recruiter" replace />;
                        }
                        return <Navigate to="/jobs" replace />;
                      }}
                    </ProtectedRoute>
                  } 
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </AppProvider>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
