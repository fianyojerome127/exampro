// Function to load examination details from localStorage
function loadExaminationDetails() {
    return JSON.parse(localStorage.getItem('examinationDetails')) || [];
}

// Function to save examination details to localStorage
function saveExaminationDetails(details) {
    localStorage.setItem('examinationDetails', JSON.stringify(details));
}

// Function to render examination details
function renderExaminationDetails(details) {
    const formContainer = document.getElementById('form-render');
    formContainer.innerHTML = ''; // Clear any existing content

    // Create the form HTML
    const formHTML = `
        <h2>Examination Details</h2>
        <form id="examinationForm">
            <label for="courseId">Course ID:</label>
            <input type="text" id="courseId" name="courseId" required>
            <label for="date">Date:</label>
            <input type="text" id="date" name="date" required>
            <label for="time">Time:</label>
            <input type="text" id="time" name="time" required>
            <label for="duration">Duration:</label>
            <input type="text" id="duration" name="duration" required>
            <button type="submit">Enroll</button>
        </form>
        <div id="examinationDetails">
            <h2>Current Examination Details</h2>
            <ul id="detailsList"></ul>
        </div>
    `;

    // Append the form HTML to the form container
    formContainer.innerHTML = formHTML;

    // Populate existing examination details
    const detailsList = document.getElementById('detailsList');
    details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = `Course ID: ${detail.courseId}, Date: ${detail.date}, Time: ${detail.time}, Duration: ${detail.duration}`;
        detailsList.appendChild(li);
    });

    // Attach event listener to the form for submission
    document.getElementById('examinationForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get examination details from the form input fields
        const courseId = document.getElementById('courseId').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const duration = document.getElementById('duration').value;

        // Call the function to handle the enrollment of the examination
        await enrollExamination(courseId, date, time, duration);
    });
}

// Function to handle enrollment of examination
async function enrollExamination(courseId, date, time, duration) {
    try {
        const response = await fetch('https://exampro-d36e23768ba5.herokuapp.com/api/examinations/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId, date, time, duration })
        });
        if (response.ok) {
            // Examination enrolled successfully
            alert('Examination enrolled successfully');
            console.log('Examination enrolled successfully');

            // Redirect to createexam.html
            window.location.href = 'createexam.html';
        } else {
            alert('Failed to enroll examination:', response.statusText);
            console.error('Failed to enroll examination:', response.statusText);
            // Handle error response
        }
    } catch (error) {
        alert('Error enrolling examination:', error.message);
        console.error('Error enrolling examination:', error.message);
        // Handle network errors or other issues
    }
}

// Initial rendering of examination details
renderExaminationDetails(loadExaminationDetails());
