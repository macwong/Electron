const electron = require('electron');
const path = require('path');

const { app, clipboard, Menu, Tray } = electron;

function checkClipboardForChange(clipboard, onChange) {
    let cache = clipboard.readText();
    let latest;

    setInterval(() => {
        latest = clipboard.readText();

        if (latest !== cache) {
            cache = latest;

            onChange(cache);
        }
    }, 1000);
}

app.on('ready', () => {
    let stack = [];
    const tray = new Tray(path.join('src', 'icon.jpg'));
    
    tray.setContextMenu(Menu.buildFromTemplate([
        {
            label: "<Empty>",
            enabled: false
        }
    ]));

    checkClipboardForChange(clipboard, (text) => {
        stack = addToStack(text, stack);
        let clipboardMenu = getClipboardMenu(clipboard, stack);
        console.log(clipboardMenu);
        tray.setContextMenu(Menu.buildFromTemplate(clipboardMenu));
    });
});

const STACK_SIZE = 5;
const ITEM_MAX_LENGTH = 20;

function addToStack(myText, stack) {
    return [myText].concat(stack.length >= STACK_SIZE ? stack.slice(0, stack.length - 1) : stack);
}

// shortaning item length
function formatItem(item) {
    return item && item.length > ITEM_MAX_LENGTH ? item.substr(0, ITEM_MAX_LENGTH) + '...' : item
  }

function getClipboardMenu(clipboard, stack) {
    return stack.map((item, i) => {
        return {
            label: "Copy: " + formatItem(item),
            click: () => {
                console.log(item);
                clipboard.writeText(item);
            }
        };
    });
}