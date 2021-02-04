exports.refresh = (contactsArray) => {
    const STORAGE_COMMANDS = require("../storage/storage_interface.js");
    const CONFIG = require("./../config/config.js");

    return new Promise((resolve, reject) => {
        STORAGE_COMMANDS.pullJSON(CONFIG.STORAGE_PATH)
            .then((result) => {
                contactsArray = JSON.parse(result);
                if (contactsArray.length == 0) {
                    reject("Contact List is Empty");
                    return;
                }
                resolve(contactsArray);
                return;
            })
            .catch((err) => {
                reject("Storage Error")
                return;
            })
    })
}