document.addEventListener('DOMContentLoaded', function () {
    const scrollUpButton = document.getElementById('scroll-up');
    const scrollDownButton = document.getElementById('scroll-down');
    const header = document.querySelector('.header-content');
    const hiddenContent = document.querySelector('.hidden-content');
    const serverIPElement = document.getElementById('server-ip');
    const statusElement = document.getElementById("server-online-text");
    const serverAddress = serverIPElement.querySelector('.server-address'); // IP-адрес

    // Функция для копирования IP
    function copyServerIP() {
        const ipAddress = serverAddress.innerText;

        navigator.clipboard.writeText(ipAddress).then(() => {
            // Меняем текст на "Айпи скопировано", но сохраняем стиль
            serverAddress.innerText = "Айпи скопировано"; // Меняем текст внутри IP-адреса

            // Восстанавливаем оригинальный IP через 2 секунды
            setTimeout(() => {
                serverAddress.innerText = "zoobastiks.20tps.name"; // Восстановление IP
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования: ', err);
        });
    }

    // Делаем текст IP кликабельным
    serverAddress.addEventListener('click', copyServerIP);

    // Функция для скрытия/показа кнопок прокрутки
    function toggleScrollButtons() {
        if (window.scrollY === 0) {
            // Если вверху страницы, скрываем кнопку вверх и показываем кнопку вниз
            scrollUpButton.style.display = 'none';
            scrollDownButton.style.display = 'inline-block';
        } else if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
            // Если внизу страницы, скрываем кнопку вниз и показываем кнопку вверх
            scrollDownButton.style.display = 'none';
            scrollUpButton.style.display = 'inline-block';
        } else {
            // Если не вверху и не внизу страницы, обе кнопки видны
            scrollUpButton.style.display = 'inline-block';
            scrollDownButton.style.display = 'inline-block';
        }
    }

    // Функция для изменения фона при прокрутке
    function handleScroll() {
        let scrollPosition = window.scrollY;

        // Если прокручено больше 50px, уменьшаем прозрачность фона
        if (scrollPosition > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        }

        toggleScrollButtons();
    }

    // Обработчики для кнопок прокрутки
    scrollUpButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollDownButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollBy({ top: 840, behavior: 'smooth' }); // Прокручиваем вниз на 840px
    });

    // Получение информации об онлайне сервера
    async function fetchServerStatus() {
        const serverIP = "zoobastiks.20tps.name";
        try {
            const response = await fetch(`https://api.mcsrvstat.us/2/${serverIP}`);
            const data = await response.json();
            if (data && data.online) {
                statusElement.textContent = `Онлайн: ${data.players.online} / ${data.players.max}`;
            } else {
                statusElement.textContent = "Сервер оффлайн";
            }
        } catch (error) {
            console.error("Ошибка при получении статуса сервера:", error);
            statusElement.textContent = "Ошибка загрузки...";
        }
    }

    // Инициализация функций
    toggleScrollButtons();
    window.addEventListener('scroll', handleScroll);

    fetchServerStatus();
});
