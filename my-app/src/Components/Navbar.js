import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const navigate = useNavigate(); // Initialize navigate hook

    const handleLogoutClick = () => {
        handleLogout(); // Clear login state and localStorage
        navigate('/'); // Redirect to landing page
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-100">
            <div>
                <Link to="/">
                    <h1 className="text-xl font-bold">One Simulation</h1>
                </Link>
            </div>
            <div>
                {!isLoggedIn ? (
                    <>
                        <Link to="/login">
                            <button className="mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button className="mx-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Signup
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="mx-2 text-gray-800 font-semibold">Welcome, User!</span>
                        <button
                            onClick={handleLogoutClick}
                            className="mx-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
