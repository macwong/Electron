exports.init = (navigator, videoEl) => {
    navigator.mediaDevices.getUserMedia({ 
        video: {
            mandatory: {
                minWidth: 853,
                minHeight: 480,
                maxWidth: 853,
                maxHeight: 480
            }
        },
        audio: false
    }).then((stream) => {
        videoEl.src = URL.createObjectURL(stream);
    }).catch((reason) => {
        alert('could not connect stream');
    })
};

exports.captureBytes = (ctx, videoEl, canvasEl) => {
    ctx.drawImage(videoEl, 0, 0);
    return canvasEl.toDataURL("image/png");
};

exports.captureBytesFromLiveCanvas = (canvas) => {
    return canvas.toDataURL("image/png");
};