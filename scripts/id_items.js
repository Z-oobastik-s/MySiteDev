// Tab switching functionality
function openTab(event, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Remove "active" class from all tab buttons
    const tabLinks = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // Show the current tab and add "active" class to the button
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
}

// Search functionality for enchantments
function searchEnchantments() {
    const input = document.getElementById("enchantmentSearch");
    const filter = input.value.toUpperCase();
    const table = document.getElementById("enchantmentsTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) { // Start from 1 to skip the header
        const tdName = tr[i].getElementsByTagName("td")[0];
        const tdApplicable = tr[i].getElementsByTagName("td")[2];
        if (tdName || tdApplicable) {
            const txtName = tdName.textContent || tdName.innerText;
            const txtApplicable = tdApplicable.textContent || tdApplicable.innerText;
            if (txtName.toUpperCase().indexOf(filter) > -1 || txtApplicable.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Search functionality for effects
function searchEffects() {
    const input = document.getElementById("effectSearch");
    const filter = input.value.toUpperCase();
    const positiveEffects = document.getElementById("positiveEffects").getElementsByClassName("effect-item");
    const negativeEffects = document.getElementById("negativeEffects").getElementsByClassName("effect-item");
    
    searchInEffectsList(positiveEffects, filter);
    searchInEffectsList(negativeEffects, filter);
}

function searchInEffectsList(effectItems, filter) {
    for (let i = 0; i < effectItems.length; i++) {
        const effect = effectItems[i];
        const effectName = effect.getElementsByClassName("effect-name")[0];
        const effectId = effect.getElementsByClassName("effect-id")[0];
        
        if (effectName && effectId) {
            const txtName = effectName.textContent || effectName.innerText;
            const txtId = effectId.textContent || effectId.innerText;
            
            if (txtName.toUpperCase().indexOf(filter) > -1 || txtId.toUpperCase().indexOf(filter) > -1) {
                effect.style.display = "";
            } else {
                effect.style.display = "none";
            }
        }
    }
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Show notification
        const notification = document.createElement("div");
        notification.classList.add("copy-notification");
        notification.textContent = "Скопировано!";
        document.body.appendChild(notification);
        
        // Position notification near cursor
        document.addEventListener("mousemove", function(e) {
            notification.style.top = (e.clientY - 40) + "px";
            notification.style.left = (e.clientX + 10) + "px";
        }, { once: true });
        
        // Remove notification after 1.5 seconds
        setTimeout(function() {
            notification.classList.add("fade-out");
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 300);
        }, 1500);
    }).catch(function(err) {
        console.error('Не удалось скопировать текст: ', err);
    });
}

// Initialize the page with default tab open
document.addEventListener("DOMContentLoaded", function() {
    // Simulate a click on the first tab to open it by default
    document.getElementsByClassName("tab-button")[0].click();
    
    // Add event listeners for search inputs
    document.getElementById("enchantmentSearch").addEventListener("keyup", searchEnchantments);
    document.getElementById("effectSearch").addEventListener("keyup", searchEffects);
    
    // Add event listeners to all copyable elements
    const copyElements = document.querySelectorAll(".copyable");
    copyElements.forEach(element => {
        element.addEventListener("click", function() {
            copyToClipboard(this.textContent);
        });
    });
}); 