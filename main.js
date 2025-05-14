window.Telegram.WebApp.ready();

const tg = window.Telegram.WebApp;

document.getElementById('user').innerText = `Привет, ${tg.initDataUnsafe.user?.first_name || 'Утка'}!`;

function sendAction(action) {
    tg.sendData(action);  // отправка действия боту
}
