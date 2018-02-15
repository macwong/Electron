const electron = require("electron");
const { app, ipcRenderer: ipc } = electron;

module.exports = (mainWindow) => {
    const name = app.getName();
    
    const template = [
    {
        label: name,
        submenu: [{
            label: "Quit",
            accelerator: "Control+Q",
            click: () => {
                app.quit();
            }
        }]
    },
    {
        label: "Effects",
        submenu: [{
            label: "Vanilla",
            click: () => {
                mainWindow.webContents.send('effect-choose', 'vanilla');
            }
        },
        {
            label: "Ascii",
            click: () => {
                mainWindow.webContents.send('effect-choose', 'ascii');
            }
        }]    
    }];

    return template;
};