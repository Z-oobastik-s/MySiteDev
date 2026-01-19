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
    const scrollUpBtn = document.getElementById('scroll-up');
    const scrollDownBtn = document.getElementById('scroll-down');
    
    // Получаем текущий путь страницы
    const currentPath = window.location.pathname;
    
    // Проверяем, находимся ли мы в корне или в подпапке pages
    const isInPages = currentPath.includes('/pages/');
    
    // Определяем порядок страниц для навигации с правильными путями
    const pageOrder = [
        { name: 'index', path: isInPages ? '../index.html' : 'index.html' },
        { name: 'wiki', path: isInPages ? 'wiki.html' : 'pages/wiki.html' },
        { name: 'voting', path: isInPages ? 'voting.html' : 'pages/voting.html' },
        { name: 'commands', path: isInPages ? 'commands.html' : 'pages/commands.html' },
        { name: 'rules', path: isInPages ? 'rules.html' : 'pages/rules.html' },
        { name: 'news', path: isInPages ? 'news.html' : 'pages/news.html' },
        { name: 'help', path: isInPages ? 'help.html' : 'pages/help.html' },
        { name: 'id_items', path: isInPages ? 'id_items.html' : 'pages/id_items.html' }
    ];
    
    // Находим индекс текущей страницы в pageOrder
    let currentPageIndex = -1;
    
    // Получаем имя текущего файла
    const currentFileName = currentPath.split('/').pop() || 'index.html';
    
    // Находим индекс текущей страницы в pageOrder
    for (let i = 0; i < pageOrder.length; i++) {
        if (currentFileName === pageOrder[i].path.split('/').pop() || 
           (currentFileName === '' && pageOrder[i].name === 'index')) {
            currentPageIndex = i;
            break;
        }
    }
    
    if (backBtn && forwardBtn) {
        // Кнопка назад: переход на предыдущую страницу в pageOrder
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPageIndex > 0) {
                window.location.href = pageOrder[currentPageIndex - 1].path;
            } else if (currentPageIndex === 0) {
                // Если мы на первой странице, переходим на последнюю
                window.location.href = pageOrder[pageOrder.length - 1].path;
            } else {
                // Если страница не найдена в списке, используем browser history
                history.back();
            }
        });
        
        // Кнопка вперед: переход на следующую страницу в pageOrder
        forwardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentPageIndex >= 0 && currentPageIndex < pageOrder.length - 1) {
                window.location.href = pageOrder[currentPageIndex + 1].path;
            } else if (currentPageIndex === pageOrder.length - 1) {
                // Если мы на последней странице, переходим на первую
                window.location.href = pageOrder[0].path;
            } else {
                // Если страница не найдена в списке, используем browser history
                history.forward();
            }
        });
    }
    
    // Кнопки скролла вверх и вниз
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
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