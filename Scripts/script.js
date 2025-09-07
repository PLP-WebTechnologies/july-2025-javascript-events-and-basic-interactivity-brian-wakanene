// Toggle: 
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode')
        ? 'Toggle Light Mode'
        : 'Toggle Dark Mode';
});

// FAQ Section:
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('active');
        question.classList.toggle('active');
    });
});

// Form Validation: 
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const formMessage = document.getElementById('form-message');

function validateName(name) {
    if (name.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePassword(password) {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number';
    }
    return '';
}

function displayError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    input.classList.toggle('invalid', !!message);
}

function validateForm() {
    let isValid = true;
    const nameError = validateName(nameInput.value.trim());
    const emailError = validateEmail(emailInput.value.trim());
    const passwordError = validatePassword(passwordInput.value.trim());

    displayError(nameInput, 'name-error', nameError);
    displayError(emailInput, 'email-error', emailError);
    displayError(passwordInput, 'password-error', passwordError);

    if (nameError || emailError || passwordError) {
        isValid = false;
    }
    return isValid;
}

// Real-time validation on input
nameInput.addEventListener('input', () => {
    displayError(nameInput, 'name-error', validateName(nameInput.value.trim()));
});
emailInput.addEventListener('input', () => {
    displayError(emailInput, 'email-error', validateEmail(emailInput.value.trim()));
});
passwordInput.addEventListener('input', () => {
    displayError(passwordInput, 'password-error', validatePassword(passwordInput.value.trim()));
});

// Form submission handling
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        formMessage.textContent = 'Form submitted successfully!';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
        form.reset();
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        document.querySelectorAll('input').forEach(input => input.classList.remove('invalid'));
    } else {
        formMessage.textContent = 'Please fix the errors above.';
        formMessage.classList.add('error');
        formMessage.classList.remove('success');
    }
});