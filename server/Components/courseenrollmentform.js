function renderCourseEnrollmentForm() {
    const formContainer = document.getElementById('form-render');
    formContainer.innerHTML = ''; // Clear any existing content
    
    // Create the form HTML
    const formHTML = `
        <h2>Course Enrollment Form</h2>
        <form id="courseEnrollmentForm">
            <label for="courseId">Course ID:</label>
            <input type="text" id="courseId" name="courseId" required>
            <label for="courseName">Course Name:</label>
            <input type="text" id="courseName" name="courseName" required>
            <label for="credits">Credits:</label>
            <input type="text" id="credits" name="credits" required>
            <button type="submit">Enroll Course</button>
        </form>
    `;
    
    // Append the form HTML to the form container
    formContainer.innerHTML = formHTML;

    // Attach event listener to the form for submission
    document.getElementById('courseEnrollmentForm').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Get course details from the form input fields
        const courseId = document.getElementById('courseId').value;
        const courseName = document.getElementById('courseName').value;
        const credits = document.getElementById('credits').value;

        // Call the function to handle the enrollment of the course
        enrollCourse(courseId, courseName, credits);
    });
}

async function enrollCourse(courseId, courseName, credits) {
    try {
        const response = await fetch('http://localhost:3000/api/courses/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                courseId: courseId,
                courseName: courseName,
                credits: credits
            })
        });
        if (response.ok) {
            // Handle successful enrollment
            console.log('Course enrolled successfully');
            // You can display a success message to the user if needed
        } else {
            // Handle error response from the server
            console.error('Error enrolling course');
            // You can display an error message to the user if needed
        }
    } catch (error) {
        // Handle network errors or other issues
        console.error('Error enrolling course:', error);
        // You can display an error message to the user if needed
    }
}
