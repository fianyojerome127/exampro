document.querySelector('.hamburger-menu').addEventListener('click', function() {
    document.querySelector('.side-menu').style.left = '0';
});

document.querySelector('.close-menu').addEventListener('click', function() {
    document.querySelector('.side-menu').style.left = '-250px';
});
