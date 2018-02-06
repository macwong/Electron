const electron = require('electron');
const ipc = electron.ipcRenderer;

document.getElementById('start').addEventListener('click', () => {
    ipc.send('countdown-start');
});