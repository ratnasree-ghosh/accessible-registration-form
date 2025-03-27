document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    let hasError = false;
    let firstErrorField = null;

    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
        document.getElementById('firstNameError').style.display = 'block';
        hasError = true;
        if (!firstErrorField) firstErrorField = firstName;
    }

    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
        document.getElementById('lastNameError').style.display = 'block';
        hasError = true;
        if (!firstErrorField) firstErrorField = lastName;
    }

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
        if (!firstErrorField) firstErrorField = email;
    }

    const address1 = document.getElementById('address1');
    if (!address1.value.trim()) {
        document.getElementById('address1Error').style.display = 'block';
        hasError = true;
        if (!firstErrorField) firstErrorField = address1;
    }

    const password = document.getElementById('password');
    if (!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        document.getElementById('passwordError').style.display = 'block';
        hasError = true;
        if (!firstErrorField) firstErrorField = password;
    }

    if (hasError) {
        firstErrorField.focus();
    } else {
        const formStatus = document.getElementById('formStatus');
        formStatus.textContent = 'Registration successful!';
        this.reset();
        
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    }
});


document.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', function(e) {
        let isValid = true;
        const errorElement = document.getElementById(`${field.id}Error`);


        switch(field.id) {
            case 'firstName':
            case 'lastName':
            case 'address1':
                isValid = field.value.trim() !== '';
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
                break;
            case 'pincode':
                isValid = /^[0-9]{6}$/.test(field.value);
                break;
            case 'password':
                isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(field.value);
                break;
        }


        if (errorElement) {
            errorElement.style.display = isValid ? 'none' : 'block';
        }


    });



});

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide';
        toggleButton.ariaLabel = 'Hide password';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show';
        toggleButton.ariaLabel = 'Show password'
    }
}

document.getElementById('password').addEventListener('input', function(e) {
    const password = e.target.value;
    
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[@$!%*?&]/.test(password)
    };

    Object.entries(requirements).forEach(([requirement, isValid]) => {
        const element = document.querySelector(`[data-requirement="${requirement}"]`);
        element.classList.remove('valid', 'invalid');
        element.classList.add(isValid ? 'valid' : 'invalid');
        element.querySelector('.requirement-icon').textContent = isValid ? '✓' : '○';        
        element.setAttribute('aria-hidden', isValid? 'true': 'false')
    });

    const hasError = !Object.values(requirements).every(Boolean);
    document.getElementById('passwordError').style.display = hasError ? 'block' : 'none';
});

const termsCheckbox = document.getElementById('termsAgreement');
const infoButton = document.getElementById('infoButton');
const infoTooltip = document.getElementById('infoTooltip');

infoButton.addEventListener('mouseover', () => {
    infoTooltip.classList.add('show');

});

infoButton.addEventListener('mouseout', () => {
    infoTooltip.classList.remove('show');

});



termsCheckbox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        termsCheckbox.checked = !termsCheckbox.checked;
    }
});


infoButton.addEventListener('focus', () => {
    infoTooltip.classList.add('show');
});

document.addEventListener('click', (e) => {
    if (!infoButton.contains(e.target) && !infoTooltip.contains(e.target)) {
        infoTooltip.classList.remove('show');
    }
});
infoButton.addEventListener('blur', () => {
    infoTooltip.classList.remove('show');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoTooltip.classList.contains('show')) {
        infoTooltip.classList.remove('show');
    }
});


const pincodeInput = document.getElementById("pincode");
    const messageDiv = document.getElementById("pincodeMessage");

    pincodeInput.addEventListener("input", function() {
        console.log(this.value.length)
        if (this.value.length == 6) {
            console.log('inside')
            messageDiv.innerHTML = "You have added 6 digit";
        } else {
            messageDiv.innerHTML = "";
        }
    });
