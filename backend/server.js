const express = require('express');
// const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure MySQL connection
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'onesimulation_learning',
  password: 'asadabbas',
  database: 'one_simulation'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});


// Create an API endpoint to fetch data
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM my_table'; // Replace with your table name
  db.query(query, (err, results) => {
    if (err) {
      console.error('Failed to fetch data:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

 // Ensure bcrypt is imported

// app.post('/api/login', (req, res) => {
//   const { email, password, role } = req.body;

//   // Check if the user exists
//   const query = `SELECT * FROM users WHERE email = ? AND role = ?`;
//   db.query(query, [email, role], (err, results) => {
//     if (err) {
//       console.error('Database query error:', err);
//       res.status(500).json({ error: 'Server error' });
//       return;
//     }

//     if (results.length > 0) {
//       const user = results[0];

//       // Compare the provided password with the hashed password
//       bcrypt.compare(password, user.password, (err, isMatch) => {
//         if (err) {
//           console.error('Error comparing passwords:', err);
//           res.status(500).json({ error: 'Server error' });
//           return;
//         }

//         if (isMatch) {
//           // Passwords match, login successful
//           res.status(200).json({ message: 'Login successful', user });
//         } else {
//           // Passwords do not match
//           res.status(401).json({ error: 'Invalid email or password' });
//         }
//       });
//     } else {
//       // No user found with the given email and role
//       res.status(404).json({ error: 'User not found' });
//     }
//   });
// });

  
// const bcrypt = require('bcrypt');

app.post('/api/login', (req, res) => {
  const { email, password, role } = req.body;

  const query = `SELECT * FROM users WHERE email = ? AND role = ?`;
  db.query(query, [email, role], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'Database error occurred.' });
      return;
    }

    if (results.length > 0) {
      const user = results[0];

      // Compare the provided password with the hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).json({ error: 'Password comparison failed.' });
          return;
        }

        if (isMatch) {
          // Password matches, login successful
          res.status(200).json({
            message: 'Login successful',
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          });
        } else {
          // Password does not match
          res.status(401).json({ error: 'Invalid email or password.' });
        }
      });
    } else {
      // No user found with the given email and role
      res.status(404).json({ error: 'User not found.' });
    }
  });
});
  

//   const bcrypt = require('bcrypt'); // For password hashing

app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if the user already exists
  const checkQuery = `SELECT * FROM users WHERE email = ?`;
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).json({ error: 'An error occurred while checking for existing users.' });
      return;
    }

    if (results.length > 0) {
      res.status(400).json({ error: 'User already exists with this email.' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertQuery = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.query(insertQuery, [name, email, hashedPassword, role], (err, results) => {
      if (err) {
        console.error('Database insert error:', err);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
        return;
      }

      res.status(201).json({ message: 'User created successfully!' });
    });
  });
});


// Create an API endpoint to insert data
app.post('/api/data', (req, res) => {
  const { field1, field2 } = req.body; // Replace with your table's fields
  const query = 'INSERT INTO my_table (field1, field2) VALUES (?, ?)';
  db.query(query, [field1, field2], (err, results) => {
    if (err) {
      console.error('Failed to insert data:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Data inserted successfully');
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
