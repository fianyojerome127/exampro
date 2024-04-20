function renderCourseRemovalForm() {
    const formContainer = document.getElementById('form-render');
    formContainer.innerHTML = ''; // Clear any existing content
    
    // Create the form HTML
    const formHTML = `
        <h2>Course Removal Form</h2>
        <form id="courseRemovalForm">
            <label for="courseId">Course ID:</label>
            <input type="text" id="courseId" name="courseId" required>
            <button type="submit">Remove Course</button>
        </form>
    `;
    
    // Append the form HTML to the form container
    formContainer.innerHTML = formHTML;

    // Attach event listener to the form for submission
    document.getElementById('courseRemovalForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get course ID from the form input field
        const courseId = document.getElementById('courseId').value;

        // Call the function to handle the removal of the course
        removeCourse(courseId);
    });
}

async function removeCourse(courseId) {
    try {
        const response = await fetch('http://localhost:3000/api/courses/removecourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId })
        });
        const data = await response.json();
        console.log(data); // Log response data
        // Handle success message or redirect if needed
    } catch (error) {
        console.error('Error removing course:', error);
        // Handle error message display to the user
    }
}
