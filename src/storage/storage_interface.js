const FS = require('fs');

exports.pullJSON = function (path) {
    return new Promise((resolve, reject) => {
        FS.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject("Error Could not Read");
                return;
            }
            else {
                resolve(data);
                return;
            }
        })
    })
}

exports.storeJSON = function (path, contacts_JSON) {
    return new Promise((resolve, reject) => {
        FS.writeFile(path, contacts_JSON, 'utf8', (err) => {
            if (err) {
                reject("Error, Could not Write")
                return;
            }
            resolve("Success");
            return;
        })

    })
}