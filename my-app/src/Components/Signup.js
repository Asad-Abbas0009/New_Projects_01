// import React, { useState } from 'react';

// const SignUp = () => {
//     const [role, setRole] = useState('teacher'); // Default role is 'teacher'
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Role:', role, 'Data:', formData);
//         // Add API call or logic to handle sign-up
//     };

//     return (
//         <div className="bg-gray-100 min-h-screen flex items-center justify-center">
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
//                 {/* Role Toggle */}
//                 <div className="flex justify-center mb-6">
//                     <button
//                         className={`w-1/2 py-2 text-lg font-bold ${
//                             role === 'teacher'
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-gray-200 text-gray-700'
//                         } rounded-l-lg`}
//                         onClick={() => setRole('teacher')}
//                     >
//                         Teacher
//                     </button>
//                     <button
//                         className={`w-1/2 py-2 text-lg font-bold ${
//                             role === 'student'
//                                 ? 'bg-blue-500 text-white'
//                                 : 'bg-gray-200 text-gray-700'
//                         } rounded-r-lg`}
//                         onClick={() => setRole('student')}
//                     >
//                         Student
//                     </button>
//                 </div>

//                 {/* Sign-Up Form */}
//                 <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
//                 <form onSubmit={handleSubmit}>
//                     {/* Name Field */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                             Full Name:
//                         </label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
//                         />
//                     </div>
//                     {/* Email Field */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                             Email:
//                         </label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
//                         />
//                     </div>
//                     {/* Password Fields */}
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                             Password:
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
//                             Confirm Password:
//                         </label>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
//                         />
//                     </div>
//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
//                     >
//                         Sign Up
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUp;
import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [role, setRole] = useState('teacher'); // Default role is 'teacher'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/signup', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role,
            });
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during signup.');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                {/* Role Toggle */}
                <div className="flex justify-center mb-6">
                    <button
                        className={`w-1/2 py-2 text-lg font-bold ${
                            role === 'teacher'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        } rounded-l-lg`}
                        onClick={() => setRole('teacher')}
                    >
                        Teacher
                    </button>
                    <button
                        className={`w-1/2 py-2 text-lg font-bold ${
                            role === 'student'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                        } rounded-r-lg`}
                        onClick={() => setRole('student')}
                    >
                        Student
                    </button>
                </div>

                {/* Sign-Up Form */}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Full Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    {/* Password Fields */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
