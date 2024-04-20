function showNotification(item) {
    // Hide all notifications
    var notifications = document.querySelectorAll('.notification');
    notifications.forEach(function(notification) {
      notification.style.display = 'none';
    });
  
    // Show the corresponding notification
    var notificationId = item + '-notification';
    var notification = document.getElementById(notificationId);
    if (notification) {
      notification.style.display = 'block';
    }
  }

  function closeNotification(item) {
    var notificationId = item + '-notification';
    var notification = document.getElementById(notificationId);
    if (notification) {
      notification.style.display = 'none';
    }
  }
  
  
  function redirectToPage() {
    // Redirect to the desired page
    window.location.href = '../HTML/proindex.html'; // Replace 'your-page-url.html' with the URL of the page you want to navigate to
  }
  