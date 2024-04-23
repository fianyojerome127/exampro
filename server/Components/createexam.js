

// Load examination details from localStorage
function loadExaminationDetails() {
    const details = JSON.parse(localStorage.getItem('examinationDetails'));
    console.log('Loaded examination details:', details); // For debugging
    return details || []; // Return an empty array if no details are available
}


// Function to save examination details to localStorage
function saveExaminationDetails(details) {
    console.log('Saving examination details:', details); // Add this line for debugging
    localStorage.setItem('examinationDetails', JSON.stringify(details));
}

// Function to render examination details
function renderExaminationForm(details) {
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

    const detailsList = document.getElementById('detailsList');   

    if (details && details.length > 0) {
        details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = `Course ID: ${detail.courseId}, Date: ${detail.date}, Time: ${detail.time}, Duration: ${detail.duration}`;
            detailsList.appendChild(li);
        });
    } else {
        // Handle case where details are not available
        const li = document.createElement('li');
        li.textContent = 'No examination details available';
        detailsList.appendChild(li);
    }

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

async function enrollExamination(courseId, date, time, duration) {
    try {
        // Generate unique examId
        const examId = uuidv4();

        const response = await fetch('https://exampro-d36e23768ba5.herokuapp.com/api/examinations/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ examId, courseId, date, time, duration })
        });

        if (response.ok) {
            // Examination enrolled successfully
            alert('Examination enrolled successfully');
            console.log('Examination enrolled successfully');

            // Save examination details to localStorage
            const newDetail = { examId, courseId, date, time, duration };
            const details = loadExaminationDetails() || [];
            details.push(newDetail);
            saveExaminationDetails(details);
            renderExaminationForm(details);
        } else {
            // Failed to enroll examination
            const responseData = await response.json();
            alert('Failed to enroll examination: ' + responseData.error);
            console.error('Failed to enroll examination:', responseData.error);
        }
    } catch (error) {
        // Error enrolling examination
        alert('Error enrolling examination:', error.message);
        console.error('Error enrolling examination:', error.message);
    }
}


// Initial rendering of examination details
renderExaminationForm(loadExaminationDetails());
