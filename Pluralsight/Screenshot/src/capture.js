const electron = require('electron');

const { ipcRenderer: ipc } = electron;

function onCapture() {
    console.log('capture');
}

ipc.on('capture', onCapture);