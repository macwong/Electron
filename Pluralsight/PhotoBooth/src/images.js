const path = require("path");
const fs = require("fs");

let images = [];

exports.save = (picturesPath, contents, callback) => {
    const data = contents.replace(/^data:image\/png;base64,/, "");
    const dateVal = new Date();
    const fileName = dateVal.getFullYear().toString() + (dateVal.getMonth() + 1).toString() + dateVal.getDate().toString() + "_" + dateVal.getHours().toString() + dateVal.getMinutes().toString();
    const fullPath = path.join(picturesPath, fileName + ".png");
    fs.writeFile(fullPath, data, { encoding: "base64" }, (err) => {
        if (err != null) {
            console.log(err);
        }

        this.cache(fullPath);
        callback(err, fullPath);
    });
};

exports.getPhotoPath = (app) => {
    return path.join(app.getPath("pictures"), "PhotoBooth");
};

exports.mkdir = (path) => {
    fs.stat(path, (err, stats) => {
        if (err != null && err.code !== "ENOENT") {
            console.log(err);
        }
        else if (err || !stats.isDirectory()) {
            fs.mkdir(path, (err) => {
                if (err != null) {
                    console.log(err);
                }
            });
        }
    });
};

exports.cache = (imgPath) => {
    images = images.concat([imgPath]);
    return images;
};

exports.getFromCache = (index) => {
    return images[index];
};