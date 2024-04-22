// Fetch student information and upcoming exams
function fetchStudentData() {
    // Make a GET request to fetch student data from the server
    fetch('https://exampro-d36e23768ba5.herokuapp.com/api/studentData')
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Extract student info and upcoming exams from the response data
            const studentInfo = data.studentInfo;
            const upcomingExams = data.upcomingExams;

            // Call functions to render student info and upcoming exams
            renderStudentInfo(studentInfo);
            renderUpcomingExams(upcomingExams);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}




// Function to render student information
function renderStudentInfo(studentInfo) {
    // Get the HTML element where you want to render the student info
    const studentInfoContainer = document.getElementById('student-info');

    // Create HTML elements to display the student info
    const studentInfoHTML = `
        <h2>Student Information</h2>
        <p><strong>Name:</strong> ${studentInfo.Fname}</p>
        <p><strong>Roll Number:</strong> ${studentInfo.rollNumber}</p>
        <p><strong>Branch:</strong> ${studentInfo.branch}</p>
        <p><strong>Year:</strong> ${studentInfo.year}</p>
        <!-- Add more fields as needed -->
    `;

    // Update the HTML of the container element with the student info
    studentInfoContainer.innerHTML = studentInfoHTML;
}

// Function to fetch student data from the server
function fetchStudentData() {
    // Make a GET request to fetch student data from the server
    fetch('https://exampro-d36e23768ba5.herokuapp.com/api/studentInfo')
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Extract student info from the response
            const studentInfo = data.studentInfo;

            // Call the function to render student info
            renderStudentInfo(studentInfo);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}

// Call the function to fetch and render student data when the page loads
window.onload = fetchStudentData;




// Function to render upcoming exams
function renderUpcomingExams(upcomingExams) {
    // Get the HTML element where you want to render the upcoming exams
    const upcomingExamsContainer = document.getElementById('upcoming-exams');

    // Create HTML elements to display the upcoming exams
    const examsHTML = upcomingExams.map(Examination => `
        <div class="Examination">
            <h3>Exam ID: ${Examination.examId}</h3>
            <p><strong>Course ID:</strong> ${Examination.courseId}</p>
            <p><strong>Date:</strong> ${Examination.date}</p>
            <p><strong>Time:</strong> ${Examination.time}</p>
            <p><strong>Room Number:</strong> ${Examination.roomNumber}</p>
            <!-- Add more fields as needed -->
        </div>
    `).join('');

    // Update the HTML of the container element with the upcoming exams
    upcomingExamsContainer.innerHTML = examsHTML;
}

// Function to fetch upcoming exams data from the server
function fetchUpcomingExamsData() {
    // Make a GET request to fetch upcoming exams data from the server
    fetch('http://localhost:3000/api/upcomingExams')
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Failed to fetch upcoming exams data');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Extract upcoming exams data from the response
            const upcomingExams = data.upcomingExams;

            // Call the function to render upcoming exams
            renderUpcomingExams(upcomingExams);
        })
        .catch(error => {
            console.error('Error fetching upcoming exams data:', error);
        });
}

// Call the function to fetch and render upcoming exams data when the page loads
window.onload = fetchUpcomingExamsData;


// Function to initialize the page
function initializePage() {
    // Fetch student data from the server
    fetchStudentData();
}

// Call the initialize function when the page loads
window.onload = initializePage;
