const electron = require("electron")
const { ipcRenderer: ipc, shell, remote } = electron;

const video = require("./video")
const countdown = require("./countdown")
const images = remote.require("./images")
const flash = require("./flash")
const effects = require("./effects")

const electronLocalshortcut = require('electron-localshortcut');

let seriously;
let videoSrc;
let canvasTarget;
let currentEffect = "vanilla";

const effectList = [
    "vanilla",
    "ascii"
];

function formatImgTag(doc, bytes) {
    const div = doc.createElement("div");
    div.classList.add("photo");
    const close = doc.createElement("div");
    close.classList.add("photoClose");
    const img = new Image();
    img.classList.add("photoImg");
    img.src = bytes;
    div.appendChild(img);
    div.appendChild(close);

    return div;
}

window.addEventListener("DOMContentLoaded", () => {
    const videoEl = document.getElementById("video");
    const canvasEl = document.getElementById("canvas");
    const recordEl = document.getElementById("record");
    const photosEl = document.querySelector(".photosContainer");
    const counterEl = document.getElementById("counter");
    const flashEl = document.getElementById("flash");

    seriously = new Seriously();
    videoSrc = seriously.source("#video");
    canvasTarget = seriously.target("#canvas");
    effects.choose(seriously, videoSrc, canvasTarget, currentEffect);

    video.init(navigator);
    ipc.send("effect-choose", "ascii")

    recordEl.addEventListener("click", () => {
        countdown.start(counterEl, 3, () => {
            flash(flashEl);
            const bytes = video.captureBytesFromLiveCanvas(canvasEl);
            ipc.send("image-captured", bytes);
            photosEl.appendChild(formatImgTag(document, bytes));
        });
    });

    photosEl.addEventListener("click", (e) => {
        if (e.target.className === "photoImg") {
            photoOp(e.target, (index) => {
                shell.showItemInFolder(images.getFromCache(index));
            });
        }
        else if (e.target.className === "photoClose") {
            photoOp(e.target, (index) => {
                 images.rm(index, () => {
                    const photoDiv = e.target.closest(".photo");
                    photoDiv.remove();
                 });
            });
        }
    });
});

function photoOp(target, callback) {
    const photos = Array.from(document.querySelectorAll("." + target.className));
    const index = photos.findIndex((el) => el === target);

    if (index !== undefined && index !== null && index >= 0) {
        callback(index);
    }
}

ipc.on("effect-choose", (evt, effectName) => {
    effects.choose(seriously, videoSrc, canvasTarget, effectName);
    currentEffect = effectName;
});

ipc.on("effect-cycle", (evt) => {
    let nextIndex = effectList.indexOf(currentEffect) + 1;

    if (nextIndex >= effectList.length) {
        nextIndex = 0;
    }

    let nextEffect = effectList[nextIndex];

    effects.choose(seriously, videoSrc, canvasTarget, nextEffect);
    currentEffect = nextEffect;
});