// Function to fetch student Name from server
function fetchStudentName() {
    // Make a GET request to fetch student data from the server
    fetch('https://exampro-d36e23768ba5.herokuapp.com/api/studentName')
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Failed to fetch student Name and student Id');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Extract student info from the response
            const studentName = data.studentName;

            // Call the function to render student info
            renderStudentName(studentName);
        })
        .catch(error => {
            console.error('Error fetching student data and Id:', error);
        });
}

// Function to fetch student data from the server
function fetchStudentInfo() {
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

// Function to fetch upcoming exams data from the server
function fetchUpcomingExamsData() {
    // Make a GET request to fetch upcoming exams data from the server
    fetch('https://exampro-d36e23768ba5.herokuapp.com/api/upcomingExams')
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

// Function to render student Name
function renderStudentName(studentName) {
    // Get the HTML element where you want to render the student Name
    const studentInfoContainer = document.getElementById('student-name');

    // Create HTML elements to display the student Name
    const studentInfoHTML = `
        <h2>Student Information</h2>
        <p><strong>Name:</strong> ${studentName.name}</p>
        <p><strong>Student ID:</strong> ${studentName.studentId}</p>
    `;

    // Update the HTML of the container element with the student info
    studentInfoContainer.innerHTML = studentInfoHTML;
}

// Function to render student information
function renderStudentInfo(studentInfo) {
    // Get the HTML element where you want to render the student info
    const studentInfoContainer = document.getElementById('student-info');

    // Create HTML elements to display the student info
    const studentInfoHTML = `
        <p><strong>Roll Number:</strong> ${studentInfo.rollNumber}</p>
        <p><strong>Location:</strong> ${studentInfo.branch}</p>
        <p><strong>Year:</strong> ${studentInfo.year}</p>
        <p><strong>Department:</strong> ${studentInfo.Dept}</p>
        <!-- Add more fields as needed -->
    `;

    // Update the HTML of the container element with the student info
    studentInfoContainer.innerHTML = studentInfoHTML;
}

function renderUpcomingExams(upcomingExams) {
    const upcomingExamsContainer = document.getElementById('upcoming-exams');

    // Clear previous content
    upcomingExamsContainer.innerHTML = '';

    // Loop through each exam and generate HTML
    upcomingExams.forEach(exam => {
        const examHTML = `
            <div class="Examination">
                <p><strong>Course ID:</strong> ${exam.courseId}</p>
                <p><strong>Date:</strong> ${exam.date}</p>
                <p><strong>Time:</strong> ${exam.time}</p>
                <p><strong>Location:</strong> ${exam.location}</p>
                <!-- Add more fields as needed -->
            </div>
        `;
        // Append HTML for each exam to the container
        upcomingExamsContainer.innerHTML += examHTML;
    });
}


// Function to fetch student data and check enrollment status
function fetchStudentDataAndCheckEnrollment() {
    // Make a GET request to fetch student data from the server
    fetch('https://exampro-d36e23768ba5.herokuapp.com/api/studentInfo')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            return response.json();
        })
        .then(data => {
            // Extract student info from the response
            const studentInfo = data.studentInfo;

            // Check if the student is enrolled
            checkEnrollment(studentInfo.studentId);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}

// Function to check enrollment status
function checkEnrollment(studentId) {
    // Make a GET request to check if the student is enrolled
    fetch(`https://exampro-d36e23768ba5.herokuapp.com/api/checkEnrollment/${studentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to check enrollment status');
            }
            return response.json();
        })
        .then(data => {
            const isEnrolled = data.isEnrolled;

            // If enrolled, fetch and render student info and upcoming exams
            if (isEnrolled) {
                fetchStudentName(); // Fetch and render student Name
                fetchStudentInfo(); // Fetch and render student info
                fetchUpcomingExamsData(); // Fetch and render upcoming exams
            } else {
                renderNoExamsScheduled(); // Render message for no exams scheduled
            }
        })
        .catch(error => {
            console.error('Error checking enrollment status:', error);
        });
}

// Function to render a message indicating no exams scheduled
function renderNoExamsScheduled() {
    const upcomingExamsContainer = document.getElementById('upcoming-exams');
    upcomingExamsContainer.innerHTML = '<p>No exams scheduled.</p>';
}

// Function to initialize the page
function initializePage() {
    fetchStudentDataAndCheckEnrollment(); // Fetch student data and check enrollment status
}

// Call the initialize function when the page loads
window.onload = initializePage;



