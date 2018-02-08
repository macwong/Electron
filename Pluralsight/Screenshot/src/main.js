const electron = require('electron');
const { app, BrowserWindow, globalShortcut } = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        // show: false
    });

    console.log(__dirname)
    mainWindow.loadURL("file://" + __dirname + "/capture.html");

    mainWindow.on("close", () => {
        mainWindow = null;
    });

    globalShortcut.register('Control+Shift+D', () => {
        mainWindow.webContents.send('capture', app.getPath('pictures'));
    });
});
