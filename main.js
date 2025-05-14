window.Telegram.WebApp.ready();
const tg = window.Telegram.WebApp;
const tgId = tg.initDataUnsafe.user?.id;
document.getElementById('user').innerText = `Привет, ${tg.initDataUnsafe.user?.first_name || 'Утка'}!`;

function sendAction(action) {
    tg.sendData(action);
}

// Загружаем данные игрока с backend API
fetch(`http://127.0.0.1:5000/api/user/${tgId}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert("Ошибка: " + data.error);
            return;
        }
        document.getElementById('brd').innerText = data.brd;
        document.getElementById('hp').innerText = data.hp;
        document.getElementById('atk').innerText = data.atk;
        document.getElementById('xp').innerText = data.xp;
        document.getElementById('lvl').innerText = data.lvl;
    })
    .catch(err => {
        console.error("API error:", err);
        alert("Не удалось загрузить данные игрока.");
    });
