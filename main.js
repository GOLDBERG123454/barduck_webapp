window.Telegram.WebApp.ready();
const tg = window.Telegram.WebApp;
document.getElementById('user').innerText = `Привет, ${tg.initDataUnsafe.user?.first_name || 'Утка'}!`;

function sendAction(action) {
    tg.sendData(action);
}

// TON Connect
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://raw.githubusercontent.com/ton-blockchain/tonconnect-manifest/main/example-manifest.json',
    buttonRootId: 'connect-btn'
});

document.getElementById('connect-btn').onclick = async () => {
    try {
        await tonConnectUI.connectWallet();
        const acc = tonConnectUI.account;
        document.getElementById('wallet-status').innerText = `🔗 Кошелёк: ${acc?.address || '—'}`;
        document.getElementById('disconnect-btn').style.display = 'inline-block';
    } catch (e) {
        alert("Ошибка подключения TON");
    }
};

document.getElementById('disconnect-btn').onclick = () => {
    tonConnectUI.disconnect();
    document.getElementById('wallet-status').innerText = "🔌 Кошелёк: не подключен";
    document.getElementById('disconnect-btn').style.display = 'none';
};
