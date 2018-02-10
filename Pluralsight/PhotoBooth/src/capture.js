const video = require("./video")

window.addEventListener("DOMContentLoaded", () => {
    const videoEl = document.getElementById("video");
    const canvasEl = document.getElementById("canvas");
    const recordEl = document.getElementById("record");
    const photosEl = document.querySelector(".photosContainer");
    const counterEl = document.getElementById("counter");

    video.init(navigator, videoEl);
});