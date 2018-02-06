const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let win

app.on('ready', () => {
    win = new BrowserWindow();

    const name = app.getName();

    const template = [
        {
            label: name,
            submenu: [{
                label: "About " + name + "...",
                click: () => {
                    console.log('test');
                },
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                label: "Quit",
                click: () => {
                    app.quit();
                },
                accelerator: "CmdOrCtrl+K"
            }]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

app.on('closed', () => {
    win = null;
});
