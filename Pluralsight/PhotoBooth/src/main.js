const electron = require("electron");
const electronLocalshortcut = require("electron-localshortcut");
const images = require("./images");
const menuTemplate = require("./menu");

const { app, BrowserWindow, ipcMain: ipc, Menu } = electron;

let mainWindow = null;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: false
    });

    mainWindow.loadURL("file://" + __dirname + "/capture.html");
    mainWindow.webContents.openDevTools();

    images.mkdir(images.getPhotoPath(app));

    mainWindow.on("close", () => {
        mainWindow = null;
    });

    const menu = Menu.buildFromTemplate(menuTemplate(mainWindow));
    Menu.setApplicationMenu(menu);

    electronLocalshortcut.register(mainWindow, 'F12', () => {
        mainWindow.webContents.send("effect-cycle");
    });
});

ipc.on("image-captured", (evt, bytes) => {
    const picPath = images.getPhotoPath(app);
    images.save(picPath, bytes, (err, imgPath) => {
        if (err !== null) {
            images.cache(imgPath);
        }
    });
});



