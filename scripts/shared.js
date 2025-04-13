// Shared JavaScript functionality for Zoobastiks Minecraft Server

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll buttons
    initScrollButtons();
    
    // Initialize navigation buttons
    initNavigationButtons();
    
    // Initialize back to top button
    initBackToTop();
    
    // Add copyright year
    updateCopyright();
    
    // Initialize copy to clipboard functionality
    initCopyToClipboard();
});

// Scroll buttons functionality
function initScrollButtons() {
    const scrollUpBtn = document.getElementById('scroll-up');
    const scrollDownBtn = document.getElementById('scroll-down');
    
    if (scrollUpBtn && scrollDownBtn) {
        window.addEventListener('scroll', function() {
            // Show/hide scroll up button based on position
            if (window.pageYOffset > 300) {
                scrollUpBtn.style.display = 'flex';
            } else {
                scrollUpBtn.style.display = 'none';
            }
            
            // Show/hide scroll down button based on if we're at the bottom
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 300) {
                scrollDownBtn.style.display = 'none';
            } else {
                scrollDownBtn.style.display = 'flex';
            }
        });
        
        // Initially check scroll position
        if (window.pageYOffset > 300) {
            scrollUpBtn.style.display = 'flex';
        } else {
            scrollUpBtn.style.display = 'none';
        }
        
        // Initially check if we're at the bottom
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 300) {
            scrollDownBtn.style.display = 'none';
        } else {
            scrollDownBtn.style.display = 'flex';
        }
        
        // Set click handlers
        scrollUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Navigation buttons functionality
function initNavigationButtons() {
    const backBtn = document.querySelector('.nav-button-back');
    const forwardBtn = document.querySelector('.nav-button-forward');
    
    if (backBtn && forwardBtn) {
        // Back button goes back in browser history
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            history.back();
        });
        
        // Forward button goes forward in browser history
        forwardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            history.forward();
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Update copyright year
function updateCopyright() {
    const copyrightElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// Copy to clipboard functionality
function initCopyToClipboard() {
    const copyableElements = document.querySelectorAll('.copyable');
    
    copyableElements.forEach(element => {
        element.addEventListener('click', function() {
            const textToCopy = this.textContent.trim();
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    showNotification('Скопировано!');
                })
                .catch(err => {
                    console.error('Не удалось скопировать текст: ', err);
                });
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('copy-notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Position notification near the cursor
    document.addEventListener('mousemove', function(e) {
        notification.style.top = (e.clientY - 40) + 'px';
        notification.style.left = (e.clientX + 10) + 'px';
    }, { once: true });
    
    // Show the notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 1500);
}

// Copy any text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showNotification('Скопировано!');
        })
        .catch(err => {
            console.error('Не удалось скопировать текст: ', err);
        });
} 