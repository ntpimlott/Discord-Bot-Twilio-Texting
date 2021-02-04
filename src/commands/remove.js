exports.remove = function (args, contactsArray) {
    const STORAGE_COMMANDS = require("../storage/storage_interface.js");
    const CONFIG = require("./../config/config.js");

    return new Promise((resolve, reject) => {

        if (args.length != 1 || /^[a-zA-Z]+$/.test(args[0]) == false) {
            reject("Invalid # of arguments or invalid letters");
            return;
        }
        else {
            console.log("R 1");
            STORAGE_COMMANDS.pullJSON(CONFIG.STORAGE_PATH)
                .then((result) => {
                    console.log("R 2");
                    contactsArray = JSON.parse(result);
                    if (contactsArray.contacts.length === 0) {
                        reject("Empty Contact List");
                        return;
                    }
                    console.log("R 3");
                    for (let i = 0; i < contactsArray.contacts.length; i++) {
                        if (contactsArray.contacts[i].id === args[0]) {
                            contactsArray.contacts.splice(i, 1);
                            contactJSON = JSON.stringify(contactsArray);
                            STORAGE_COMMANDS.storeJSON(CONFIG.STORAGE_PATH, contactJSON)
                                .then((result) => {
                                    console.log("R 4");
                                    resolve("Contact Removed");
                                    return;
                                })
                                .catch((err) => {
                                    reject("Error ReStoring JSON");
                                });

                        }
                        else if (i === contactsArray.contacts.length) {
                            console.log("R 5");
                            resolve("Contact Did Not Exist");
                            return;
                        }
                    }

                })
                .catch((err) => {
                    console.log("R 6");
                    reject("Error Removing Contact");
                    return;
                });
        }
    })
}