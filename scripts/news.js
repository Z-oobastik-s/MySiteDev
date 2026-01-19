// News page functionality

// Tag filtering system
function filterNewsByTag(tag) {
    const newsArticles = document.querySelectorAll('.news-article');
    const activeTagBtn = document.querySelector('.tag-filter.active');
    
    if (activeTagBtn) {
        activeTagBtn.classList.remove('active');
    }
    
    if (tag === 'all') {
        // Show all news articles
        newsArticles.forEach(article => {
            article.style.display = 'block';
        });
        
        document.getElementById('allTagBtn').classList.add('active');
    } else {
        // Filter by selected tag
        newsArticles.forEach(article => {
            const articleTags = article.querySelectorAll('.news-tag');
            let hasTag = false;
            
            articleTags.forEach(articleTag => {
                if (articleTag.dataset.tag === tag) {
                    hasTag = true;
                }
            });
            
            article.style.display = hasTag ? 'block' : 'none';
        });
        
        document.querySelector(`.tag-filter[data-tag="${tag}"]`).classList.add('active');
    }
    
    // Reset to page 1 when filtering
    changePage(1);
}

// News pagination system
let currentPage = 1;
const articlesPerPage = 5;

function changePage(page) {
    const newsArticles = Array.from(document.querySelectorAll('.news-article:not([style*="display: none"])'));
    currentPage = page;
    
    // Calculate start and end index for visible articles
    const startIndex = (page - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    
    // Hide all articles first
    document.querySelectorAll('.news-article').forEach(article => {
        article.classList.remove('visible');
    });
    
    // Show only articles for current page
    for (let i = startIndex; i < endIndex && i < newsArticles.length; i++) {
        newsArticles[i].classList.add('visible');
    }
    
    // Update pagination UI
    updatePaginationUI(newsArticles.length);
}

function updatePaginationUI(totalArticles) {
    const paginationContainer = document.querySelector('.pagination');
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `<a href="#" ${currentPage === 1 ? 'class="disabled"' : ''} onclick="${currentPage > 1 ? 'changePage(' + (currentPage - 1) + '); return false;' : 'return false;'}">«</a>`;
    
    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `<a href="#" ${currentPage === i ? 'class="active"' : ''} onclick="changePage(${i}); return false;">${i}</a>`;
    }
    
    // Next button
    paginationHTML += `<a href="#" ${currentPage === totalPages ? 'class="disabled"' : ''} onclick="${currentPage < totalPages ? 'changePage(' + (currentPage + 1) + '); return false;' : 'return false;'}">»</a>`;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Share news article
function shareArticle(articleId) {
    const url = window.location.href.split('#')[0] + '#article-' + articleId;
    
    if (navigator.share) {
        navigator.share({
            title: document.querySelector(`#article-${articleId} h3`).textContent,
            url: url
        }).catch(err => {
            console.error('Error sharing: ', err);
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

// Copy URL to clipboard with notification
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Ссылка скопирована в буфер обмена');
    }).catch(function(err) {
        console.error('Не удалось скопировать ссылку: ', err);
        showNotification('Не удалось скопировать ссылку', true);
    });
}

// Show notification
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : 'success'}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initial pagination
    changePage(1);
    
    // Setup tag filter buttons
    document.querySelectorAll('.tag-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            filterNewsByTag(this.dataset.tag);
        });
    });
    
    // Check for hash in URL to open specific article
    if (window.location.hash) {
        const articleId = window.location.hash.substring(1);
        const article = document.getElementById(articleId);
        
        if (article) {
            // Find which page the article is on
            const articles = Array.from(document.querySelectorAll('.news-article'));
            const articleIndex = articles.indexOf(article);
            
            if (articleIndex !== -1) {
                const targetPage = Math.floor(articleIndex / articlesPerPage) + 1;
                changePage(targetPage);
                
                // Scroll to article
                setTimeout(() => {
                    article.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }
}); 