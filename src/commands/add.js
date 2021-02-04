exports.add = function (args, contactsArray) {

    const STORAGE_COMMANDS = require("../storage/storage_interface.js");
    const CONFIG = require("./../config/config.js");
    const NUMBER_VERIFICATION = require("./../number_verification.js");

    return new Promise((resolve, reject) => {
        if (args.length != 2 || isNaN(args[1]) == true || /^[a-zA-Z]+$/.test(args[0]) == false) {
            resolve("Format Error");
            return;
        }

        NUMBER_VERIFICATION.validate(args[1])
            .then((response) => {
                if (response == true) {
                    STORAGE_COMMANDS.pullJSON(CONFIG.STORAGE_PATH)
                        .then((result) => {
                            contactsArray = JSON.parse(result);
                            for (let i = 0; i < contactsArray.contacts.length; i++) {
                                if (contactsArray.contacts[i].id === args[0]) {
                                    resolve("Contact Already Exists");
                                    return;
                                }
                            }

                            contactsArray.contacts.push({ id: args[0], number: args[1] });
                            let contactJSON = JSON.stringify(contactsArray);
                            STORAGE_COMMANDS.storeJSON(CONFIG.STORAGE_PATH, contactJSON)
                                .then((result) => {
                                    resolve("Contact Added");
                                    return;
                                })
                                .catch((err) => {
                                    reject("Storage Write Error");
                                    return;
                                })
                        })
                        .catch((err) => {
                            reject("Storage Read Error");
                            return;
                        });
                }
                else if (response == false) {
                    resolve("Not a Valid Country's Number");
                    return;
                }
            })
            .catch((err) => {
                reject("Not a Valid Number");
                return;
            });
    })

}