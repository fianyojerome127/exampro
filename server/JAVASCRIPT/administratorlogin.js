
// administratorlogin.js

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      // Store token in localStorage or handle it as needed
      console.log('Token:', data.token);
      // Redirect to admin dashboard or perform other actions based on login success
      window.location.href = '../Components/adminpage.html';
  } catch (error) {
      console.error('Error:', error.message);
      // Display error message to the user
  }
});
