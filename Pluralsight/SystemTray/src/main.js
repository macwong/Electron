const electron = require('electron');
const path = require('path');

const { app, Tray, Menu } = electron;

const myPath = path.join('src', 'icon.jpg');

app.on('ready', () => {
    let tray = new Tray(myPath);

    let trayMenu = Menu.buildFromTemplate([
        {
            label: "Wow",
            click: () => {
                console.log('Wowser');
            }
        }
    ]);

    tray.setContextMenu(trayMenu);
    tray.setToolTip("This is a test");
});