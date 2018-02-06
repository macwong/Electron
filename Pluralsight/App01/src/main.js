const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const countdown = require('./countdown')
const ipc = electron.ipcMain;

let mainWindows = [];

app.on('ready', () => {
    var windowFunc = () => {
        let myWindow = new BrowserWindow({
            height: 400,
            width: 400
        });

        myWindow.loadURL("file://" + __dirname + "/countdown.html");

        myWindow.on('closed', () => {
            myWindow = null;
        });

        return myWindow;
    }

    mainWindows.push(windowFunc());
    mainWindows.push(windowFunc());
    mainWindows.push(windowFunc());

    ipc.on('countdown-start', () => {
        countdown((count) => {
            mainWindows.forEach((win) => {
                win.webContents.send('countdown', count);
            });
        });
    });
});

