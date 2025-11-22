// Register JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const errorMessage = document.getElementById('errorMessage');

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = 'view/dashboard.html';
    }

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Clear previous error message
        errorMessage.textContent = '';

        // Validation
        if (!name) {
            showError('Please enter your name.');
            return;
        }

        if (!email) {
            showError('Please enter your email.');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        // Check if email already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const emailExists = existingUsers.some(user => user.email === email);
        if (emailExists) {
            showError('This email is already registered.');
            return;
        }

        if (!password) {
            showError('Please enter your password.');
            return;
        }

        if (password.length < 6) {
            showError('Password must be at least 6 characters.');
            return;
        }

        if (!isValidPassword(password)) {
            showError('Password must contain at least one letter and one number.');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match.');
            return;
        }

        // Save user data to localStorage
        const userData = {
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        existingUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Redirect to login page
        window.location.href = 'view/login.html';
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        return hasLetter && hasNumber;
    }
});
