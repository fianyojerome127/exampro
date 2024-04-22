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
            const studentName = data.studentName;
            const studentInfo = data.studentInfo;
            const upcomingExams = data.upcomingExams;

            // Call functions to render student info and upcoming exams
            renderStudentName(studentName);
            renderStudentInfo(studentInfo);
            renderUpcomingExams(upcomingExams);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
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
        <p><strong>Name:</strong> ${studentName.studentId}</p>
    `;

    // Update the HTML of the container element with the student info
    studentInfoContainer.innerHTML = studentInfoHTML;
}

// Function to fetch student data from the server
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

// Call the function to fetch and render student data when the page loads
window.onload = fetchStudentName;







// Function to render student information
function renderStudentInfo(studentInfo) {
    // Get the HTML element where you want to render the student info
    const studentInfoContainer = document.getElementById('student-info');

    // Create HTML elements to display the student info
    const studentInfoHTML = `
        <p><strong>Roll Number:</strong> ${studentInfo.rollNumber}</p>
        <p><strong>Location:</strong> ${studentInfo.branch}</p>
        <p><strong>Year:</strong> ${studentInfo.year}</p>
        <p><strong>Name:</strong> ${studentInfo.Dept}</p>
        <!-- Add more fields as needed -->
    `.join('');

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
    const examsHTML =  `
        <div class="Examination">
            <p><strong>Course ID:</strong> ${upcomingExams.courseId}</p>
            <p><strong>Date:</strong> ${upcomingExams.date}</p>
            <p><strong>Time:</strong> ${upcomingExams.time}</p>
            <!-- Add more fields as needed -->
        </div>
    `.join('');

    // Update the HTML of the container element with the upcoming exams
    upcomingExamsContainer.innerHTML = examsHTML;
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

// Call the function to fetch and render upcoming exams data when the page loads
window.onload = fetchUpcomingExamsData;


// Function to initialize the page
function initializePage() {
    //Fetch student Name fom server
    fetchStudentName();
    // Fetch student data from the server
    fetchStudentData();
    // Fetch student upcoming exam details from the server
    fetchUpcomingExamsData();
}

// Call the initialize function when the page loads
window.onload = initializePage;
