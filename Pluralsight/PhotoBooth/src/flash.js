let timer;

module.exports = (flashEl) => {
    if (flashEl.classList.contains("is-flashing")) {
        flashEl.classList.remove("is-flashing");
    }

    clearTimeout(timer);
    flashEl.classList.add("is-flashing");

    timer = setTimeout(() => {
        flashEl.classList.remove("is-flashing");
    }, 2000);
};