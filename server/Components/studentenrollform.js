// Logic to render Student Enrollment form
// For example, you can show/hide HTML elements to display the form

function renderStudentEnrollmentForm() {
    // Get the container element where the form will be rendered
    const formContainer = document.getElementById('form-render');

    // Clear any existing content in the form container
    formContainer.innerHTML = '';

    // Create a new form element
    const form = document.createElement('form');

    // Create and append a heading for the form
    const heading = document.createElement('h2');
    heading.textContent = 'Student Enrollment Form';
    form.appendChild(heading);

    // Create and append input fields for student information
    const studentIdInput = createInputField('text', 'Student ID', 'S_ID');
    form.appendChild(studentIdInput);

    const semesterInput = createInputField('text', 'Semester', 'Semester');
    form.appendChild(semesterInput);


    // Create and append a submit button
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Enroll';
    submitButton.addEventListener('click', function(event){
        enroll(event, form);
    }); // Attach the enroll function to handle form submission
    form.appendChild(submitButton);

    // Append the form to the container element
    formContainer.appendChild(form);
}

function createInputField(type, placeholder, name) {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.name = name;
    return input;
}

function enroll(event, form) {
    // Handle form submission logic here

    event.preventDefault(); // Prevent the default form submission behavior

    // You can access form data using form.elements
    const formData = new FormData(form);
    const S_ID = formData.get('S_ID');
    const Semester = formData.get('Semester');

    // Perform any necessary actions, such as sending the data to the backend API
    // You can use fetch or other AJAX methods to send the form data to your backend server
    // For example:
    fetch('https://exampro-d36e23768ba5.herokuapp.com/api/enroll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            S_ID: S_ID,
            Semester: Semester,
            //Fname: Fname,
            //Lname: Lname,
            //Email: Email,
            //Password: Password
        })
    })
    .then(response => {
        if (response.ok) {
            // Handle successful form submission
            alert('Form submitted successfully');
            console.log('Form submitted successfully');
            // You may want to display a success message to the user
        } else {
            // Handle error response from the server
            alert('Error submitting form');
            console.error('Error submitting form');
            // You may want to display an error message to the user
        }
    })
    .catch(error => {
        // Handle network errors or other issues
        console.error('Error submitting form:', error);
        // You may want to display an error message to the user
    });
}
