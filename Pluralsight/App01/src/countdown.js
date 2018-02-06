module.exports = function countdown() {
    let count = 10;

    let timer = setInterval(() => {
        count--;
        console.log(count);
        if (count < 0) {
            clearInterval(timer);
        }
    }, 1000);
}