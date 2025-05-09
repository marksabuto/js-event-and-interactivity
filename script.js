// Event Handling Section
document.addEventListener('DOMContentLoaded', function() {
    // Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.style.color = '#e74c3c';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Waiting for your click...';
            clickOutput.style.color = '';
        }, 2000);
    });

    // Hover Effect
    const hoverBox = document.querySelector('.hover-box');
    
    hoverBox.addEventListener('mouseenter', function() {
        console.log('Mouse entered the hover box');
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        console.log('Mouse left the hover box');
    });

    // Keypress Detection
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${e.target.value}`;
    });

    // Secret Action (Double click or long press)
    const secretBox = document.querySelector('.secret-box');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 2000);
    });
    
    // Long press (1 second)
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'), 2000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });

    // Interactive Elements Section
    // Color Changing Button
    const colorBtn = document.getElementById('color-btn');
    
    colorBtn.addEventListener('click', function() {
        const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        this.style.backgroundColor = randomColor;
        this.style.color = getContrastColor(randomColor);
        this.textContent = `My color is ${randomColor}`;
    });

    // Image Gallery
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentImageIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach((img, i) => {
            img.classList.toggle('hidden', i !== index);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(currentImageIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(currentImageIndex);
    });

    // Accordion
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all first
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open current if wasn't active
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });

    // Form Validation
    const signupForm = document.getElementById('signup-form');
    
    // Real-time validation
    document.getElementById('name').addEventListener('input', validateName);
    document.getElementById('email').addEventListener('input', validateEmail);
    document.getElementById('password').addEventListener('input', validatePassword);
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully!');
            this.reset();
            document.querySelectorAll('.error-message').forEach(el => {
                el.textContent = '';
            });
        }
    });
    
    function validateName() {
        const nameInput = document.getElementById('name');
        const errorElement = nameInput.nextElementSibling;
        
        if (nameInput.value.trim() === '') {
            showError(nameInput, errorElement, 'Name is required');
            return false;
        } else {
            clearError(nameInput, errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const emailInput = document.getElementById('email');
        const errorElement = emailInput.nextElementSibling;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            showError(emailInput, errorElement, 'Email is required');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, errorElement, 'Please enter a valid email');
            return false;
        } else {
            clearError(emailInput, errorElement);
            return true;
        }
    }
    
    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const errorElement = passwordInput.nextElementSibling;
        
        if (passwordInput.value.trim() === '') {
            showError(passwordInput, errorElement, 'Password is required');
            return false;
        } else if (passwordInput.value.length < 8) {
            showError(passwordInput, errorElement, 'Password must be at least 8 characters');
            return false;
        } else {
            clearError(passwordInput, errorElement);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        errorElement.textContent = message;
    }
    
    function clearError(input, errorElement) {
        input.classList.remove('invalid');
        errorElement.textContent = '';
    }
});

// Helper function for color contrast
function getContrastColor(hexColor) {
    // Convert hex to RGB
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black or white depending on luminance
    return luminance > 0.5 ? '#000000' : '#ffffff';
}