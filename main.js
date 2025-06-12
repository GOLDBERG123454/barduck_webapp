let tg;
let tgId;

if (window.Telegram && window.Telegram.WebApp) {
    tg = window.Telegram.WebApp;
    tg.ready();
    tgId = tg.initDataUnsafe.user?.id;
    document.getElementById("user").innerText = `Привет, ${tg.initDataUnsafe.user?.first_name || 'Утка'}!`;
} else {
    tg = { sendData: () => {} };
    console.warn('Telegram WebApp not found, running in fallback mode');
    document.getElementById("user").innerText = 'Привет, Утка!';
}

function sendAction(action) {
    tg.sendData(action);
}

if (tgId) {
    fetch("https://e57f-51-158-165-38.ngrok-free.app/api/user/" + tgId)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert("Ошибка: " + data.error);
                return;
            }
            document.getElementById("brd").innerText = data.brd;
            document.getElementById("hp").innerText = data.hp;
            document.getElementById("atk").innerText = data.atk;
            document.getElementById("xp").innerText = data.xp;
            document.getElementById("lvl").innerText = data.lvl;
        })
        .catch(err => {
            console.error("API error:", err);
            alert("Не удалось загрузить данные игрока.");
        });
} else {
    console.warn('User ID is missing, skipping API call');
}
