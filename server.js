require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path'); // Import the path module


const app = express();
const PORT = process.env.PORT || 3000;



// Connect to MongoDB using the provided MongoDB URI
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Access JWT secret key
const secretKey = process.env.JWT_SECRET;


// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);


// Define schema and model for admin credentials
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);




// Define Student model schema
const studentSchema = new mongoose.Schema( {
  S_ID: String,
  Semester: String,
  //Fname: String,
  //Lname: String,
  //Email: String,
  //Password: String,
  Dept: String,
  rollNumber: { type: String, default: 'Row no 3' }, 
  branch: { type: String, default: 'Center A' }, // Define enum for branch
  year: { type: String, default: getCurrentAcademicYear } // Set default value for year
    // Add more fields as needed
});

// Function to get the current academic year (e.g., 2023/2024)
function getCurrentAcademicYear() {
  const currentYear = new Date().getFullYear();
  return `${currentYear}/${currentYear + 1}`;
}

const Student = mongoose.model('Student', studentSchema);


//Define Course enrollment model schema
const Course = mongoose.model('Course', {
  courseId: String,
  courseName: String,
  credits: Number
});

// Define Examination model schema
const examinationSchema = new mongoose.Schema({
  courseId: String,
  date: String,
  time: String,
  duration: String,
  roomNumber: { type: String }, // Remove required flag for automatic generation
  examId: { type: String, required: true, unique: true }, // Keep required flag for uniqueness

});

// Pre-save middleware to generate room number and exam ID
examinationSchema.pre('save', async function (next) {
  try {
      // Generate room number (example: RN001)
      this.roomNumber = 'RN' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

      // Generate unique exam ID (example: EXAM001)
      this.examId = 'EXAM' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

      // Proceed to save
      next();
  } catch (error) {
      next(error);
  }
});

const Examination = mongoose.model('Examination', examinationSchema);



// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'EXAM PRO')));

// Enable CORS for all routes
app.use(cors());



// Routes
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name, username, studentId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, username, studentId });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ username: user.username, userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Login route for admin
app.post('/api/admin/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      // Find admin by email
      const admin = await Admin.findOne({ email });
      if (!admin) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Compare passwords
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Generate JWT token
      const token = jwt.sign({ email: admin.email }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});



// Routes
// Student enrollment endpoint
app.post('/api/enroll', async (req, res) => {
  try {
      // Extract student data from request body
      const { S_ID, Semester } = req.body;

      // Create new student document
      const student = new Student({ S_ID, Semester });

      // Save student data to MongoDB
      await student.save();

      // Send success response
      res.status(201).json({ message: 'Student enrolled successfully' });
  } catch (error) {
      // Send error response
      res.status(500).json({ error: error.message });
  }
});



// API route to remove a student
app.post('/api/removeStudent', async (req, res) => {
  try {
      const { studentId } = req.body;
      await Student.findOneAndDelete({ S_ID: studentId });
      res.status(200).json({ message: `${studentId} has been removed successfully` });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// API route for course enrollment
app.post('/api/courses/enroll', async (req, res) => {
  try {
    // Extract course data from request body
    const { courseId, courseName, credits } = req.body;

    // Create new course document
    const course = new Course({ courseId, courseName, credits });

    // Save course data to MongoDB
    await course.save();

    // Send success response
    res.status(201).json({ message: 'Course enrolled successfully' });
  } catch (error) {
    // Send error response
    res.status(500).json({ error: error.message });
  }
});


// API Routes for course removal
app.post('/api/courses/removecourse', async (req, res) => {
  try {
    const { courseId } = req.body;
    // Remove course from MongoDB
    await Course.findOneAndDelete({ courseId });
    res.status(200).json({ message: `${courseId} removed successfully` });
  } catch (error) {
    console.error('Error removing course:', error.message);
    res.status(500).json({ error: 'Failed to remove course' });
  }
});


// API endpoint for enrolling an examination
app.post('/api/examinations/enroll', async (req, res) => {
  try {
      const { courseId, date, time, duration } = req.body;
      // Create a new examination document in the database
      const examination = new Examination({ courseId, date, time, duration });
      await examination.save();
      res.status(200).json({ message: 'Examination enrolled successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


app.get('/api/studentInfo', async (req, res) => {
  try {
      // Fetch student information from the database
      const studentInfo = await Student.findOne();

      // Send the student information to the client
      res.status(200).json({ studentInfo });
  } catch (error) {
      console.error('Error fetching student information:', error);
      res.status(500).json({ error: 'Failed to fetch student information' });
  }
});


// Define a route to fetch student data
app.get('/api/studentData', async (req, res) => {
  try {
      // Fetch student data from the database or any other source
      const studentInfo = await Student.findOne(); // Example: Retrieving student info from MongoDB
      const upcomingExams = await Examination.find(); // Example: Retrieving upcoming exams from MongoDB

      // Send the student data back to the client
      res.status(200).json({ studentInfo, upcomingExams });
  } catch (error) {
      console.error('Error fetching student data:', error);
      res.status(500).json({ error: 'Failed to fetch student data' });
  }
});


// Route to fetch student information
app.get('/api/studentInfo', async (req, res) => {
  try {
      // Fetch student information from the database
      const studentInfo = await Student.findOne();

      // Send the student information to the client
      res.status(200).json({ studentInfo });
  } catch (error) {
      console.error('Error fetching student information:', error);
      res.status(500).json({ error: 'Failed to fetch student information' });
  }
});


// Route to fetch upcoming exams data
app.get('/api/upcomingExams', async (req, res) => {
  try {
      // Fetch upcoming exams data from the database
      const upcomingExams = await Examination.find();

      // Send the upcoming exams data to the client
      res.status(200).json({ upcomingExams });
  } catch (error) {
      console.error('Error fetching upcoming exams data:', error);
      res.status(500).json({ error: 'Failed to fetch upcoming exams data' });
  }
});








// Route for user signup
app.post('/api/signup', async (req, res) => {
  try {
      const { email, password, name, username, studentId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create a new user document
      const user = new User({ email, password: hashedPassword, name, username, studentId });

      // Save the user to the database
      await user.save();

      // Redirect to student.html upon successful signup
      res.json({ redirect: '/api/redirect' });
  } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// New route for redirection after successful login or signup
app.get('/api/redirect', (req, res) => {
  // Redirect to student.html
  res.redirect('/student.html');
});




// Existing route for user login
app.post('/api/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find the user with the provided username (student ID)
      const user = await User.findOne({ username });

      // If user is found and password matches, redirect to /api/redirect
      if (user && await bcrypt.compare(password, user.password)) {
          res.json({ redirect: '/api/redirect' });
      } else {
          res.status(401).json({ message: 'Authentication failed' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// New route for redirection after successful login
app.get('/api/redirect', (req, res) => {
  // Redirect to student.html
  res.redirect('/student.html');
});



// Define a route handler for the root path
//app.get('/', (req, res) => {
  res.send('Welcome to ExamPro!');
//});




// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
