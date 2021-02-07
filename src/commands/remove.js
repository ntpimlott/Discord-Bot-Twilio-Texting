exports.remove = function (args, contactsArray) {
    const STORAGE_COMMANDS = require("../storage/storage_interface.js");
    const CONFIG = require("./../config/config.js");

    return new Promise((resolve, reject) => {

        if (args.length != 1 || /^[a-zA-Z]+$/.test(args[0]) == false) {
            reject("Invalid # of arguments or invalid letters");
            return;
        }
        else {
            STORAGE_COMMANDS.pullJSON(CONFIG.STORAGE_PATH)
                .then((result) => {
                    contactsArray = JSON.parse(result);
                    if (contactsArray.contacts.length === 0) {
                        reject("Empty Contact List");
                        return;
                    }
                    for (let i = 0; i < contactsArray.contacts.length; i++) {
                        if (contactsArray.contacts[i].id === args[0]) {
                            contactsArray.contacts.splice(i, 1);
                            contactJSON = JSON.stringify(contactsArray);
                            STORAGE_COMMANDS.storeJSON(CONFIG.STORAGE_PATH, contactJSON)
                                .then((result) => {
                                    resolve("Contact Removed");
                                    return;
                                })
                                .catch((err) => {
                                    reject("Error ReStoring JSON");
                                });

                        }
                        else if (i === contactsArray.contacts.length) {
                            resolve("Contact Did Not Exist");
                            return;
                        }
                    }

                })
                .catch((err) => {
                    reject("Error Removing Contact");
                    return;
                });
        }
    })
}