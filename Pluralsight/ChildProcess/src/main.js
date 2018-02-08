const electron = require("electron");

const { app, BrowserWindow } = electron;

let mainWindow = null;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        height: 100,
        width: 400
    });

    mainWindow.loadURL("file://" + __dirname + "/status.html");
});

app.on("close", () => {
    mainWindow = null;
});