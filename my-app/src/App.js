import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import StudentDashboard from './Pages/StudentDashboard';
import TeacherDashboard from './Pages/TeacherDashboard';
import Home from './Components/Home';
import CaseLibrary from './Components/CaseLibrary';
import Patient from './Components/PatientRegistration';
import Report from './Components/Reports';
import { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on app load
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user); // Set true if user exists in localStorage
  }, []);

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle logout
  
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    setIsLoggedIn(false); // Update state
};


  return (
    <div>
      {/* Navbar with dynamic props */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
      <Routes>
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/student-dashboard' element={<StudentDashboard />} />
        <Route path='/teacher-dashboard/*' element={<TeacherDashboard />}>
          <Route path='home' element={<Home />} />
          <Route path='case-library' element={<CaseLibrary />} />
          <Route path='patient' element={<Patient />} />
          <Route path='report' element={<Report />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
