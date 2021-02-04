const FS = require('fs');

exports.pullJSON = function (path) {
    console.log("Refresh 1");
    return new Promise((resolve, reject) => {
        console.log("Refresh 2");
        FS.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log("Refresh 3.2");
                reject("Error Could not Read");
                return;
            }
            else {
                console.log("Refresh 3");
                resolve(data);
                return;
            }
        })
    })
}

exports.storeJSON = function (path, contacts_JSON) {
    console.log("Store 1");
    return new Promise((resolve, reject) => {
        console.log("Store 2");
        FS.writeFile(path, contacts_JSON, 'utf8', (err) => {
            if (err) {
                console.log("Store 3");
                reject("Error, Could not Write")
                return;
            }
            console.log("store 4");
            resolve("Success");
            return;
        })

    })
}