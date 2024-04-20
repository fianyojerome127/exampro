function validateSignInForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form inputs
  const username = document.getElementById('signin-username').value;
  const password = document.getElementById('signin-password').value;

  // Basic validation
  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  // Create user data object
  const userData = { username, password };

  // Call signInUser function to handle sign-in
  signInUser(userData);
}

function signInUser(userData) {
  // Make AJAX request to signin endpoint
  fetch('http://localhost:3000/api/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    return response.json();
  })
  .then(data => {
    // Store JWT token securely (e.g., in local storage)
    localStorage.setItem('token', data.token);
    // Redirect to home.html
    window.location.href = '../Components/student.html';
  })
  .catch(error => {
    alert('Authentication failed');
    console.error(error);
  });
}
