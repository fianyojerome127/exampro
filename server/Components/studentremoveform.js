function renderStudentRemovalForm() {
    const formContainer = document.getElementById('form-render');
    formContainer.innerHTML = ''; // Clear any existing content
    
    // Create the form HTML
    const formHTML = `
        <h2>Student Removal Form</h2>
        <form id="removalForm">
            <label for="studentId">Student ID:</label>
            <input type="text" id="studentId" name="studentId" required>
            <button type="submit">Remove Student</button>
        </form>
    `;
    
    // Append the form HTML to the form container
    formContainer.innerHTML = formHTML;

    // Attach event listener to the form for submission
    document.getElementById('removalForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the student ID from the form input field
        const studentId = document.getElementById('studentId').value;

        // Call the function to handle the removal of the student
        removeStudent(studentId);
    });
}

// Function to remove a student
async function removeStudent(studentId) {
    try {
        // Fetch request to remove the student using the studentId
        const response = await fetch('http://localhost:3000/api/removeStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ studentId })
        });

        if (response.ok) {
            // Handle successful removal
            console.log('Student removed successfully');
        } else {
            // Handle error response from server
            console.error('Error removing student:', response.statusText);
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error removing student:', error.message);
    }
}
