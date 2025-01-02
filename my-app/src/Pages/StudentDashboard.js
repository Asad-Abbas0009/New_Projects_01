import React from 'react';
import { useLocation } from 'react-router-dom';

const StudentDashboard = () => {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Welcome to the Student Dashboard
                </h1>

                {user ? (
                    <div className="space-y-4">
                        <p className="text-lg font-semibold text-gray-800">
                            <span className="font-bold text-blue-600">Name:</span> {user.name}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            <span className="font-bold text-blue-600">Email:</span> {user.email}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                            <span className="font-bold text-blue-600">Role:</span> {user.role}
                        </p>
                    </div>
                ) : (
                    <p className="text-red-500 font-semibold text-center">
                        No user details found. Please log in again.
                    </p>
                )}

                {/* Add additional dashboard sections */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Dashboard Features:</h2>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>View Assignments</li>
                        <li>Track Progress</li>
                        <li>Download Reports</li>
                        {/* Add more features */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
