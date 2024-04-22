function validateSignUpForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form inputs
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const name = document.getElementById('signup-name').value;
  const username = document.getElementById('signup-username').value;
  const studentId = document.getElementById('signup-student-id').value;

  // Simple email validation
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // You can add more validation here for other fields

  // Create user data object
  const userData = { email, password, name, username, studentId };

  // Call signUpUser function to handle sign-up
  signUpUser(userData);
}

function signUpUser(userData) {
  // Submit the form data
  fetch('https://exampro-d36e23768ba5.herokuapp.com/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (response.ok) {
      // Redirect to home1.html on successful signup
      window.location.href = './Components/student.html';
    } else {
      throw new Error('Failed to signup');
    }
  })
  .catch(error => {
    console.error('Signup error:', error);
    alert('Failed to signup. Please try again.');
  });
}

function isValidEmail(email) {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
