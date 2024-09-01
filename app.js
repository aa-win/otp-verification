let generatedOtp = '';

// Generate and display OTP
function generateOtp() {
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    document.getElementById('otpForm').style.display = 'block';
    document.getElementById('result').textContent = '';
    document.getElementById('result').className = '';
    document.getElementById('otpDisplay').textContent = `Your OTP is: ${generatedOtp}`;

    // Create OTP inputs
    const otpFields = document.getElementById('otpFields');
    otpFields.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'otp-input';
        input.maxLength = 1;
        otpFields.appendChild(input);

        // Focus next input when filled
        input.addEventListener('input', () => {
            if (input.value && input.nextElementSibling) {
                input.nextElementSibling.focus();
            }
        });

        // Focus previous input on backspace
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && input.previousElementSibling) {
                input.previousElementSibling.focus();
            }
        });

        // Focus the first filled input
        input.addEventListener('focus', () => {
            const inputs = Array.from(document.querySelectorAll('.otp-input'));
            if (inputs.slice(0, inputs.indexOf(input)).some(i => !i.value)) {
                inputs[0].focus();
            }
        });
    }
}

// Verify OTP
function verifyOtp(inputOtp) {
    return inputOtp === generatedOtp;
}

// Event listeners
document.getElementById('generateOtp').addEventListener('click', generateOtp);
document.getElementById('otpForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const otpInputs = document.querySelectorAll('.otp-input');
    const inputOtp = Array.from(otpInputs).map(input => input.value).join('');

    const result = document.getElementById('result');
    if (verifyOtp(inputOtp)) {
        result.textContent = 'OTP verified successfully!';
        result.className = 'success';
    } else {
        result.textContent = 'Invalid OTP. Please try again.';
        result.className = 'error';
    }
});
