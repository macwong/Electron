const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const countdown = require('./countdown')
const ipc = electron.ipcMain;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    });

    mainWindow.loadURL("file://" + __dirname + "/countdown.html");

    ipc.on('countdown-start', () => {
        countdown((count) => {
            mainWindow.webContents.send('countdown', count);
        });
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

