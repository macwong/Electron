const path = require("path");
const fs = require("fs");

exports.save = (picturesPath, contents) => {
    const data = contents.replace(/^data:image\/png;base64,/, "");
    const dateVal = new Date();
    const fileName = dateVal.getFullYear().toString() + (dateVal.getMonth() + 1).toString() + dateVal.getDate().toString() + "_" + dateVal.getHours().toString() + dateVal.getMinutes().toString();
    fs.writeFile(path.join(picturesPath, fileName + ".png"), data, { encoding: "base64" }, (err) => {
        if (err != null) {
            console.log(err);
        }
    });
};

exports.getPhotoPath = (app) => {
    return path.join(app.getPath("pictures"), "PhotoBooth");
};