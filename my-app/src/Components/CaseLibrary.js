import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CaseLibrary() {
  const [students, setStudents] = useState([]);
  // const [cases] = useState([
  //   {
  //     id: 1,
  //     title: 'Brain CT Case 1',
  //     question: 'Identify abnormalities in the frontal lobe.',
  //     image: 'https://via.placeholder.com/300x200?text=Brain+CT+1', // Placeholder image
  //     assignedTo: [],
  //   },
  //   {
  //     id: 2,
  //     title: 'Brain CT Case 2',
  //     question: 'Detect signs of hemorrhage in the parietal lobe.',
  //     image: 'https://via.placeholder.com/300x200?text=Brain+CT+2', // Placeholder image
  //     assignedTo: [],
  //   },
  //   {
  //     id: 3,
  //     title: 'Brain CT Case 3',
  //     question: 'Assess any potential swelling in the occipital lobe.',
  //     image: 'https://via.placeholder.com/300x200?text=Brain+CT+3', // Placeholder image
  //     assignedTo: [],
  //   },
  //   {
  //     id: 4,
  //     title: 'Brain CT Case 4',
  //     question: 'Analyze midline shift due to a traumatic injury.',
  //     image: 'https://via.placeholder.com/300x200?text=Brain+CT+4', // Placeholder image
  //     assignedTo: [],
  //   },
  // ]);

  const [cases] = useState([
    {
      id: 1,
      title: 'Brain CT Case 1',
      question: 'Identify abnormalities in the frontal lobe.',
      image: '/images/istockphoto-1311134358-612x612.jpg',
      assignedTo: [],
    },
    {
      id: 2,
      title: 'Brain CT Case 2',
      question: 'Detect signs of hemorrhage in the parietal lobe.',
      image: '/images/istockphoto-1311134358-612x612.jpg',
      assignedTo: [],
    },
    {
      id: 3,
      title: 'Brain CT Case 3',
      question: 'Assess any potential swelling in the occipital lobe.',
      image: '/images/istockphoto-1311134358-612x612.jpg',
      assignedTo: [],
    },
    {
      id: 4,
      title: 'Brain CT Case 4',
      question: 'Analyze midline shift due to a traumatic injury.',
      image: '/images/istockphoto-1311134358-612x612.jpg',
      assignedTo: [],
    },
  ]);
  
  useEffect(() => {
    // Fetch students from the server
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students'); // Replace with your server endpoint
        setStudents(response.data); // Assume server returns an array of student objects
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleAssignStudent = (caseId, studentName) => {
    if (!studentName) return;

    const updatedCases = cases.map((caseItem) =>
      caseItem.id === caseId
        ? {
            ...caseItem,
            assignedTo: [...new Set([...caseItem.assignedTo, studentName])], // Prevent duplicates
          }
        : caseItem
    );
    // Update cases directly since it's static in this example.
    updatedCases.forEach((c, index) => (cases[index] = c));
  };

  return (
    <div className="min-h-screen w-[100%] bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 p-6">
      <h1 className="text-5xl font-bold text-gray-800 text-center mb-8">
        Case Library
      </h1>

      {/* Case Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cases.map((caseItem) => (
          <div key={caseItem.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={caseItem.image} alt={caseItem.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{caseItem.title}</h3>
              <p className="text-gray-600 mb-4">{caseItem.question}</p>
              <div className="mb-4">
                <h4 className="text-sm font-bold text-gray-700">Assigned Students:</h4>
                {caseItem.assignedTo.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {caseItem.assignedTo.map((student, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        {student}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No students assigned yet.</p>
                )}
              </div>
              <select
                onChange={(e) => handleAssignStudent(caseItem.id, e.target.value)}
                className="border rounded w-full p-2 mb-2 bg-gray-100 focus:ring-2 focus:ring-blue-500">
                <option value="">Assign to a student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.name}>
                    {student.name}
                  </option>
                ))}
              </select>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CaseLibrary;
