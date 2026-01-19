// Plugins page functionality

// Filter plugins by category
function filterPlugins(category, searchQuery) {
    const pluginItems = document.querySelectorAll('.plugin-item');
    const activeButton = document.querySelector('.category-filter.active');
    
    // Update active button
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    document.querySelector(`.category-filter[data-category="${category}"]`).classList.add('active');
    
    // Filter plugins
    pluginItems.forEach(item => {
        const pluginCategory = item.getAttribute('data-category');
        const pluginName = item.querySelector('.plugin-name').textContent.toLowerCase();
        const pluginDescription = item.querySelector('.plugin-description').textContent.toLowerCase();
        
        // Check if category matches
        const matchesCategory = (category === 'all' || pluginCategory === category);
        
        // Check if search query matches
        const matchesSearch = (searchQuery === '' || 
            pluginName.includes(searchQuery.toLowerCase()) || 
            pluginDescription.includes(searchQuery.toLowerCase()));
        
        // Show or hide item
        if (matchesCategory && matchesSearch) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Search functionality for plugins
function searchPlugins() {
    const searchInput = document.getElementById('pluginSearch');
    const searchTerm = searchInput.value.toLowerCase();
    const pluginItems = document.querySelectorAll('.plugin-item');
    
    pluginItems.forEach(item => {
        const pluginName = item.querySelector('.plugin-name').textContent.toLowerCase();
        const pluginDescription = item.querySelector('.plugin-description').textContent.toLowerCase();
        
        if (pluginName.includes(searchTerm) || pluginDescription.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Reset category filter when searching
    const activeButton = document.querySelector('.category-filter.active');
    if (activeButton) {
        activeButton.classList.remove('active');
    }
    document.querySelector('.category-filter[data-category="all"]').classList.add('active');
}

// Show plugin details in modal
function showPluginDetails(pluginId) {
    const modal = document.getElementById('pluginModal');
    const detailsContent = document.getElementById('plugin-details-content');
    
    // Set modal content based on plugin ID
    switch(pluginId) {
        case 'worldguard':
            detailsContent.innerHTML = `
                <div class="modal-header">
                    <h2 class="modal-title">WorldGuard</h2>
                    <span class="plugin-details-category">Защита территории</span>
                </div>
                <p>WorldGuard – плагин для защиты регионов на сервере, предотвращающий гриферство и позволяющий настраивать различные флаги для территорий.</p>
                
                <div class="plugin-meta">
                    <div class="meta-item">Версия: 7.0.7</div>
                    <div class="meta-item">Автор: sk89q</div>
                    <div class="meta-item">Зависимости: WorldEdit</div>
                </div>
                
                <h3>Описание</h3>
                <p>WorldGuard позволяет создавать защищенные регионы, в которых только владельцы и участники могут строить. Вы можете настраивать множество параметров для каждого региона, включая возможность PvP, урон от мобов, рост растений и многое другое.</p>
                
                <div class="commands-section">
                    <h3>Основные команды</h3>
                    <table class="command-table">
                        <tr>
                            <th>Команда</th>
                            <th>Описание</th>
                            <th>Разрешение</th>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/rg claim [название]');">/rg claim [название]</span></td>
                            <td>Создать регион вокруг текущей области выделения WorldEdit</td>
                            <td>worldguard.region.claim</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/rg info [название]');">/rg info [название]</span></td>
                            <td>Показать информацию о регионе</td>
                            <td>worldguard.region.info</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/rg addmember [регион] [игрок]');">/rg addmember [регион] [игрок]</span></td>
                            <td>Добавить участника в регион</td>
                            <td>worldguard.region.addmember</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/rg addowner [регион] [игрок]');">/rg addowner [регион] [игрок]</span></td>
                            <td>Добавить владельца в регион</td>
                            <td>worldguard.region.addowner</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/rg flag [регион] [флаг] [значение]');">/rg flag [регион] [флаг] [значение]</span></td>
                            <td>Установить флаг для региона</td>
                            <td>worldguard.region.flag</td>
                        </tr>
                    </table>
                </div>
                
                <div class="permissions-section">
                    <h3>Основные флаги</h3>
                    <table class="permission-table">
                        <tr>
                            <th>Флаг</th>
                            <th>Описание</th>
                        </tr>
                        <tr>
                            <td>pvp</td>
                            <td>Разрешает или запрещает PvP в регионе</td>
                        </tr>
                        <tr>
                            <td>mob-spawning</td>
                            <td>Разрешает или запрещает спавн мобов</td>
                        </tr>
                        <tr>
                            <td>fire-spread</td>
                            <td>Разрешает или запрещает распространение огня</td>
                        </tr>
                        <tr>
                            <td>use</td>
                            <td>Разрешает или запрещает использование предметов (кнопки, рычаги и т.д.)</td>
                        </tr>
                        <tr>
                            <td>greeting</td>
                            <td>Сообщение при входе в регион</td>
                        </tr>
                        <tr>
                            <td>farewell</td>
                            <td>Сообщение при выходе из региона</td>
                        </tr>
                    </table>
                </div>
            `;
            break;
            
        case 'essentialsx':
            detailsContent.innerHTML = `
                <div class="modal-header">
                    <h2 class="modal-title">EssentialsX</h2>
                    <span class="plugin-details-category">Утилиты</span>
                </div>
                <p>EssentialsX – набор основных команд и утилит для Minecraft сервера, предоставляющий множество функций для игроков и администраторов.</p>
                
                <div class="plugin-meta">
                    <div class="meta-item">Версия: 2.19.7</div>
                    <div class="meta-item">Автор: EssentialsX Team</div>
                    <div class="meta-item">Зависимости: Нет</div>
                </div>
                
                <h3>Описание</h3>
                <p>EssentialsX добавляет множество полезных команд для телепортации, обмена сообщениями, экономики, управления инвентарем и многого другого. Это один из самых популярных и полезных плагинов для серверов Minecraft.</p>
                
                <div class="commands-section">
                    <h3>Основные команды</h3>
                    <table class="command-table">
                        <tr>
                            <th>Команда</th>
                            <th>Описание</th>
                            <th>Разрешение</th>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/home');">/home</span></td>
                            <td>Телепортация на точку дома</td>
                            <td>essentials.home</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/sethome [название]');">/sethome [название]</span></td>
                            <td>Установить точку дома</td>
                            <td>essentials.sethome</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/tpa [игрок]');">/tpa [игрок]</span></td>
                            <td>Запросить телепортацию к игроку</td>
                            <td>essentials.tpa</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/msg [игрок] [сообщение]');">/msg [игрок] [сообщение]</span></td>
                            <td>Отправить приватное сообщение игроку</td>
                            <td>essentials.msg</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/bal');">/bal</span></td>
                            <td>Показать ваш баланс</td>
                            <td>essentials.balance</td>
                        </tr>
                    </table>
                </div>
                
                <h3>Модули плагина</h3>
                <p>EssentialsX включает несколько модулей, которые расширяют функциональность:</p>
                <ul>
                    <li><strong>EssentialsX Chat</strong> - расширенный чат с форматированием</li>
                    <li><strong>EssentialsX Spawn</strong> - управление точками спавна игроков</li>
                    <li><strong>EssentialsX GeoIP</strong> - определение страны игрока по IP</li>
                    <li><strong>EssentialsX Discord</strong> - интеграция с Discord</li>
                </ul>
            `;
            break;
            
        case 'mcmmo':
            detailsContent.innerHTML = `
                <div class="modal-header">
                    <h2 class="modal-title">McMMO</h2>
                    <span class="plugin-details-category">Геймплей</span>
                </div>
                <p>McMMO – RPG-плагин, добавляющий навыки и способности, которые игроки могут развивать для получения различных бонусов.</p>
                
                <div class="plugin-meta">
                    <div class="meta-item">Версия: 2.1.220</div>
                    <div class="meta-item">Автор: nossr50</div>
                    <div class="meta-item">Зависимости: Нет</div>
                </div>
                
                <h3>Описание</h3>
                <p>McMMO добавляет систему навыков, которые развиваются по мере выполнения соответствующих действий. Каждый навык имеет свои уникальные способности и бонусы, которые разблокируются при достижении определенных уровней.</p>
                
                <div class="commands-section">
                    <h3>Основные команды</h3>
                    <table class="command-table">
                        <tr>
                            <th>Команда</th>
                            <th>Описание</th>
                            <th>Разрешение</th>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/mcstats');">/mcstats</span></td>
                            <td>Показать все навыки и их текущие уровни</td>
                            <td>mcmmo.commands.mcstats</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/mctop [навык]');">/mctop [навык]</span></td>
                            <td>Показать лидеров по конкретному навыку</td>
                            <td>mcmmo.commands.mctop</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/[навык]');">/[навык]</span></td>
                            <td>Показать информацию о конкретном навыке</td>
                            <td>mcmmo.skills.[навык]</td>
                        </tr>
                        <tr>
                            <td><span class="copy-code" onclick="copyToClipboard('/mcability');">/mcability</span></td>
                            <td>Включить/выключить активацию способностей</td>
                            <td>mcmmo.commands.mcability</td>
                        </tr>
                    </table>
                </div>
                
                <h3>Навыки</h3>
                <ul>
                    <li><strong>Добыча</strong> - увеличивает шанс дропа руды и активирует суперкопание</li>
                    <li><strong>Лесорубство</strong> - увеличивает эффективность рубки деревьев</li>
                    <li><strong>Травничество</strong> - увеличивает шанс дропа семян и растений</li>
                    <li><strong>Акробатика</strong> - уменьшает урон от падения</li>
                    <li><strong>Мечи</strong> - увеличивает урон и добавляет кровотечение</li>
                    <li><strong>Топоры</strong> - увеличивает урон и разрушение брони</li>
                    <li><strong>Стрельба</strong> - увеличивает урон от лука и добавляет спецэффекты</li>
                    <li><strong>Рыбалка</strong> - увеличивает шанс поймать сокровища</li>
                    <li><strong>Алхимия</strong> - улучшает эффекты зелий</li>
                    <li><strong>Ремонт</strong> - эффективное восстановление инструментов</li>
                </ul>
            `;
            break;
            
        default:
            detailsContent.innerHTML = `
                <div class="modal-header">
                    <h2 class="modal-title">Информация о плагине</h2>
                </div>
                <p>Подробная информация об этом плагине в настоящее время обновляется. Пожалуйста, проверьте позднее.</p>
            `;
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Close on click outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('pluginModal');
    modal.style.display = 'none';
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set up search
    const searchInput = document.getElementById('pluginSearch');
    searchInput.addEventListener('input', searchPlugins);
    
    // Set up category filters
    const categoryButtons = document.querySelectorAll('.category-filter');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterPlugins(category, searchInput.value);
        });
    });
    
    // Set up plugin detail modals
    const pluginItems = document.querySelectorAll('.plugin-item');
    pluginItems.forEach(item => {
        item.addEventListener('click', function() {
            const pluginId = this.getAttribute('data-id');
            showPluginDetails(pluginId);
        });
    });
    
    // Default to showing all plugins
    filterPlugins('all', '');
});

// Copy to clipboard functionality
window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Скопировано в буфер обмена: ' + text);
    }).catch(err => {
        console.error('Ошибка при копировании: ', err);
    });
} 