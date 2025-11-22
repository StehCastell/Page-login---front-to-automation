// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        window.location.href = '../index.html';
        return;
    }

    // Display user name
    document.getElementById('userName').textContent = loggedInUser;

    // Get output display element
    const outputDisplay = document.getElementById('outputDisplay');

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../index.html';
    });

    // 1. Text input handler
    document.getElementById('textInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Text input: ' + this.value);
        }
    });

    // 2. Password input handler
    document.getElementById('passwordInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Password input: ' + '*'.repeat(this.value.length));
        }
    });

    // 3. Email input handler
    document.getElementById('emailInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Email input: ' + this.value);
        }
    });

    // 4. Number input handler
    document.getElementById('numberInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Number input: ' + this.value);
        }
    });

    // 5. Tel input handler
    document.getElementById('telInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Phone number: ' + this.value);
        }
    });

    // 6. URL input handler
    document.getElementById('urlInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('URL entered: ' + this.value);
        }
    });

    // 7. Search input handler
    document.getElementById('searchInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Searching for: ' + this.value);
        }
    });

    // 8. Date input handler
    document.getElementById('dateInput').addEventListener('change', function() {
        if (this.value) {
            updateOutput('Selected date: ' + this.value);
        }
    });

    // 9. Time input handler
    document.getElementById('timeInput').addEventListener('change', function() {
        if (this.value) {
            updateOutput('Selected time: ' + this.value);
        }
    });

    // 10. Datetime-local input handler
    document.getElementById('datetimeInput').addEventListener('change', function() {
        if (this.value) {
            updateOutput('Selected date and time: ' + this.value);
        }
    });

    // 11. Month input handler
    document.getElementById('monthInput').addEventListener('change', function() {
        if (this.value) {
            updateOutput('Selected month: ' + this.value);
        }
    });

    // 12. Week input handler
    document.getElementById('weekInput').addEventListener('change', function() {
        if (this.value) {
            updateOutput('Selected week: ' + this.value);
        }
    });

    // 13. Color input handler
    document.getElementById('colorInput').addEventListener('input', function() {
        updateOutput('Selected color: ' + this.value);
        outputDisplay.style.backgroundColor = this.value;
        outputDisplay.style.color = getContrastColor(this.value);
    });

    // 14. Range input handler
    const rangeInput = document.getElementById('rangeInput');
    const rangeValue = document.getElementById('rangeValue');

    rangeInput.addEventListener('input', function() {
        rangeValue.textContent = this.value;
        updateOutput('Range value changed to: ' + this.value);
    });

    // 15. Checkbox handlers
    const checkboxes = document.querySelectorAll('input[name="checkboxGroup"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const checkedBoxes = document.querySelectorAll('input[name="checkboxGroup"]:checked');
            const values = Array.from(checkedBoxes).map(cb => cb.parentElement.textContent.trim());
            updateOutput('Checked: ' + (values.length > 0 ? values.join(', ') : 'None'));
        });
    });

    // 16. Radio button handlers
    const radios = document.querySelectorAll('input[name="radioGroup"]');
    radios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            updateOutput('Selected radio: ' + this.parentElement.textContent.trim());
        });
    });

    // 17. File input handler
    document.getElementById('fileInput').addEventListener('change', function() {
        if (this.files.length > 0) {
            updateOutput('File selected: ' + this.files[0].name);
        }
    });

    // Multiple file input handler
    document.getElementById('multiFileInput').addEventListener('change', function() {
        if (this.files.length > 0) {
            const fileNames = Array.from(this.files).map(f => f.name);
            updateOutput('Files selected: ' + fileNames.join(', '));
        }
    });

    // 19. Button input handler
    document.getElementById('buttonInput').addEventListener('click', function() {
        updateOutput('Button Input was clicked!');
    });

    // 20. Submit input handler
    document.getElementById('submitInput').addEventListener('click', function() {
        updateOutput('Submit Input was clicked!');
    });

    // 21. Reset input handler
    document.getElementById('resetInput').addEventListener('click', function() {
        updateOutput('Reset Input was clicked! Form fields reset.');
    });

    // 22. Image input handler
    document.getElementById('imageInput').addEventListener('click', function(e) {
        e.preventDefault();
        updateOutput('Image Input was clicked at coordinates X:' + e.offsetX + ' Y:' + e.offsetY);
    });

    // Select handler
    document.getElementById('selectInput').addEventListener('change', function() {
        if (this.value) {
            updateOutput('Selected option: ' + this.options[this.selectedIndex].text);
        }
    });

    // Multiple select handler
    document.getElementById('multiSelect').addEventListener('change', function() {
        const selectedOptions = Array.from(this.selectedOptions).map(opt => opt.text);
        if (selectedOptions.length > 0) {
            updateOutput('Selected items: ' + selectedOptions.join(', '));
        }
    });

    // Textarea handler
    document.getElementById('textareaInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Textarea content: ' + this.value.substring(0, 50) + (this.value.length > 50 ? '...' : ''));
        }
    });

    // Datalist input handler
    document.getElementById('datalistInput').addEventListener('input', function() {
        if (this.value) {
            updateOutput('Datalist input: ' + this.value);
        }
    });

    // Helper function to update output display
    function updateOutput(message) {
        outputDisplay.textContent = message;
        outputDisplay.style.animation = 'none';
        outputDisplay.offsetHeight; // Trigger reflow
        outputDisplay.style.animation = 'fadeIn 0.3s ease';
    }

    // Helper function to get contrast color for text
    function getContrastColor(hexcolor) {
        const r = parseInt(hexcolor.substr(1, 2), 16);
        const g = parseInt(hexcolor.substr(3, 2), 16);
        const b = parseInt(hexcolor.substr(5, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? '#000000' : '#ffffff';
    }

    // Add fade-in animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0.5; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});
