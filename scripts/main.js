// Main JavaScript file for Zoobastiks Minecraft Server Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize server status checker
    checkServerStatus();
    
    // Initialize clipboard copy functionality
    initClipboardCopy();
    
    // Initialize notification system
    initNotifications();
});

// Mobile Navigation
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', 
                mobileToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav-container') && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Прокрутить вверх');
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Server Status Checker
function checkServerStatus() {
    const statusElement = document.querySelector('.server-status');
    if (!statusElement) return;
    
    // In a real implementation, you would fetch the server status from an API
    // For demo purposes, we'll randomly set the server as online or offline
    const isOnline = Math.random() > 0.2; // 80% chance of being online
    
    if (isOnline) {
        statusElement.classList.add('online');
        statusElement.classList.remove('offline');
        statusElement.innerHTML = '<span class="status-indicator online"></span> Онлайн';
    } else {
        statusElement.classList.add('offline');
        statusElement.classList.remove('online');
        statusElement.innerHTML = '<span class="status-indicator offline"></span> Оффлайн';
    }
    
    // Refresh status every 60 seconds
    setTimeout(checkServerStatus, 60000);
}

// Clipboard Copy Functionality
function initClipboardCopy() {
    const copyElements = document.querySelectorAll('[data-copy]');
    
    copyElements.forEach(element => {
        element.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            copyToClipboard(textToCopy);
        });
    });
    
    // Server IP copy functionality
    const serverIpElement = document.querySelector('.server-ip');
    if (serverIpElement) {
        serverIpElement.addEventListener('click', function() {
            const ipText = this.textContent.trim();
            copyToClipboard(ipText);
        });
    }
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    // Use the Clipboard API if available
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showNotification('Скопировано в буфер обмена!', false);
            })
            .catch(err => {
                showNotification('Не удалось скопировать текст: ' + err, true);
            });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification('Скопировано в буфер обмена!', false);
            } else {
                showNotification('Не удалось скопировать текст', true);
            }
        } catch (err) {
            showNotification('Ошибка при копировании: ' + err, true);
        }
        
        document.body.removeChild(textArea);
    }
}

// Notification System
function initNotifications() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notifications-container')) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
}

// Show Notification
function showNotification(message, isError = false) {
    const container = document.querySelector('.notifications-container') || document.body;
    const notification = document.createElement('div');
    notification.className = 'notification ' + (isError ? 'error' : 'success');
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Animate the notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 3000);
}

// Function to set active link in navigation
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        if (currentPath === linkPath || 
            (currentPath.includes('pages/') && linkPath.includes(currentPath.split('/').pop()))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Handle links with smooth scroll to sections on the same page
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Share content using Web Share API if available
function shareContent(title, text, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url || window.location.href
        })
        .catch(error => console.log('Error sharing:', error));
    } else {
        // Fallback to copying the URL
        copyToClipboard(window.location.href);
        showNotification('Ссылка скопирована в буфер обмена!', false);
    }
}

// Call this function when populating dynamic content
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver support
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
} 
}); 