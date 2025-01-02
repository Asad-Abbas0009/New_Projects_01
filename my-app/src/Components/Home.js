import React, { useEffect, useState } from 'react';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                {user ? (
                    <div>
                        <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">
                            Welcome, {user.name}!
                        </h1>
                        <p className="text-lg text-gray-700 text-center">
                            You are logged in as a <span className="font-semibold">{user.role}</span>.
                        </p>
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Your Details:
                            </h2>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <p className="mb-2">
                                    <strong className="text-gray-800">Name:</strong> {user.name}
                                </p>
                                <p className="mb-2">
                                    <strong className="text-gray-800">Email:</strong> {user.email}
                                </p>
                                <p className="mb-2">
                                    <strong className="text-gray-800">Role:</strong> {user.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
                        <p className="text-gray-700">No user information available. Please log in.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
