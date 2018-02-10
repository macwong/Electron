const electron = require("electron")
const { ipcRenderer: ipc, shell, remote } = electron;

const video = require("./video")
const countdown = require("./countdown")
const images = remote.require("./images")

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
    
    const ctx = canvasEl.getContext("2d");

    video.init(navigator, videoEl);

    recordEl.addEventListener("click", () => {
        countdown.start(counterEl, 3, () => {
            const bytes = video.captureBytes(ctx, videoEl, canvasEl);
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