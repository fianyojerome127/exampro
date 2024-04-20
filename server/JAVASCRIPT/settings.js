document.getElementById('upload-picture-btn').addEventListener('click', function() {
    // Trigger the hidden file input element
    document.getElementById('profile-picture-input').click();
});

// Handle file input change event
document.getElementById('profile-picture-input').addEventListener('change', function() {
    var input = this;

    if (input.files && input.files[0]) {
        var file = input.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function() {
            var profilePicture = document.getElementById('profile-picture');
            profilePicture.src = reader.result;

            var profilePictureSide = document.querySelector('.profile-pic-side img');
            profilePictureSide.src = reader.result;
        };
    }
});
