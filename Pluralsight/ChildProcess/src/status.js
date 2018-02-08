const fs = require("fs");
const { exec } = require("child_process");
const os = require("os");

let timer = null;

function isDir(dir) {
    try
    {
        return fs.lstatSync(dir).isDirectory();
    }
    catch(e)
    {
        return false;
    }
}

function checkGitStatus(dir) {
    exec("git status", {
       cwd: dir 
    }, (err, stdout, stderr) => {
        console.log("err", err);
        console.log("stdout", stdout);
        console.log("stderr", stderr);

        if (err) return setStatus("Unknown");

        if (/nothing to commit/.test(stdout)) return setStatus("Clean");

        return setStatus("Dirty");
    });
}

function setStatus(status) {
    document.getElementById("status").textContent = status;
}

function formatDir(dir) {
    return /^~/.test(dir) ? os.homedir() + dir.substr(1).trim() : dir.trim();
}

document.getElementById("input").addEventListener('keyup', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        const dir = formatDir(e.target.value);

        if (isDir(dir)) {
            checkGitStatus(dir);
        }
    }, 500);
});