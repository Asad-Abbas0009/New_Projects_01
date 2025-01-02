import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const TeacherDashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-64 flex flex-col">
                <div className="p-4 text-2xl font-bold text-center border-b border-gray-600">
                    Teacher Dashboard
                </div>
                <nav className="flex-grow">
                    <ul className="flex flex-col p-4 space-y-4">
                        <li>
                            <Link to="/teacher-dashboard/home" className="hover:text-blue-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher-dashboard/case-library" className="hover:text-blue-400">
                                Case Library
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher-dashboard/patient" className="hover:text-blue-400">
                                Patient Registration
                            </Link>
                        </li>
                        <li>
                            <Link to="/teacher-dashboard/report" className="hover:text-blue-400">
                                Report
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-grow bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default TeacherDashboard;
