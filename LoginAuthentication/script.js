document.getElementById('show-register').addEventListener('click', function() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('register').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('auth').style.display = 'block';
    document.getElementById('register').style.display = 'none';
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const registerError = document.getElementById('register-error');

    if (!validateUsername(username)) {
        registerError.textContent = 'Username cannot be empty.';
        return;
    }

    if (!validatePassword(password)) {
        registerError.textContent = 'Password does not meet the strength requirements.';
        return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    alert('Registration successful!');
    document.getElementById('auth').style.display = 'block';
    document.getElementById('register').style.display = 'none';
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    const loginError = document.getElementById('login-error');

    if (!validateUsername(username)) {
        loginError.textContent = 'Invalid username.';
        return;
    }

    if (!validatePassword(password)) {
        loginError.textContent = 'Invalid password.';
        return;
    }

    if (username === storedUsername && password === storedPassword) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('secure-page').style.display = 'block';
    } else {
        loginError.textContent = 'Invalid username or password.';
    }
});

document.getElementById('logout').addEventListener('click', function() {
    document.getElementById('secure-page').style.display = 'none';
    document.getElementById('auth').style.display = 'block';
});

document.getElementById('register-password').addEventListener('input', function() {
    const password = document.getElementById('register-password').value;
    const strengthMessage = checkPasswordStrength(password);
    document.getElementById('register-password-strength').innerText = strengthMessage;
});

document.getElementById('login-password').addEventListener('input', function() {
    const password = document.getElementById('login-password').value;
    const strengthMessage = checkPasswordStrength(password);
    document.getElementById('login-password-strength').innerText = strengthMessage;
});

function validateUsername(username) {
    return username.trim() !== '';
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

function checkPasswordStrength(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long.';
    } else if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter.';
    } else if (!/\d/.test(password)) {
        return 'Password must contain at least one digit.';
    } else if (!/[@$!%*?&]/.test(password)) {
        return 'Password must contain at least one special character.';
    } else {
        return 'Password is strong.';
    }
}
