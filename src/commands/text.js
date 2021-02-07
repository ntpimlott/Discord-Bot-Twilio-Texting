exports.text = function (arg, contactsArray) {
    const STORAGE_COMMANDS = require("../storage/storage_interface.js");
    const CONFIG = require("./../config/config.js");
    const TWILIOCLIENT = require('twilio')(CONFIG.twilio.ACCOUNT_SID, CONFIG.twilio.AUTH_TOKEN);

    return new Promise((resolve, reject) => {

        STORAGE_COMMANDS.pullJSON(CONFIG.STORAGE_PATH)
            .then((result) => {
                contactsArray = JSON.parse(result);
                if (contactsArray.contacts.length == 0) {
                    resolve("Contacts List is Empty");
                    return;
                }
                let toContact = arg.substring(0, arg.indexOf(' '));
                let arguments = arg.split(" ");
                if (arguments.length != 2 || arguments[1].match(/"([^']+)"/) == null) {
                    resolve("Incorrect Number of Arguments");
                    return;
                }
                let msg = arg.match(/"([^']+)"/)[1];
                let pnumber = "";

                for (let i = 0; i < contactsArray.contacts.length; i++) {
                    if (contactsArray.contacts[i].id === toContact && msg.length < 100) {
                        pnumber = contactsArray.contacts[i].number;

                        TWILIOCLIENT.messages.create({
                            to: pnumber,
                            from: '+16046709574',
                            body: msg
                        })
                            .then((response) => {
                                resolve("Message Sent");
                                return;
                            })
                            .catch((err) => {
                                reject("Text could not be send");
                                return;
                            });

                    }
                    else {
                        if (msg.length > 100) {
                            resolve("Message has too many characters");
                            return;
                        }
                        if (i === contactsArray.contacts.length - 1) {
                            reject("Contact is not in  Contacts list");
                            return;
                        }

                    }

                }
            })
            .catch((err) => {
                resolve("Failed to Retrieve Contact List")
                return;
            })
    })
}

