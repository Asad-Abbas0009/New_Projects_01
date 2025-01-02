import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from '../Components/Home';
import CaseLibrary from '../Components/CaseLibrary';
import PatientRegistration from '../Components/PatientRegistration';
import Reports from '../Components/Reports';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/home"
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/case-library"
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
              >
                Case Library
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/patient-registration"
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
              >
                Patient Registration
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/reports"
                className="block px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
              >
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Routes>
          {/* Define sub-routes for dashboard */}
          <Route path="home" element={<Home />} />
          <Route path="case-library" element={<CaseLibrary />} />
          <Route path="patient-registration" element={<PatientRegistration />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
