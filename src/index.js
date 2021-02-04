'use strict';

require("dotenv").config();
const Queue = require('./classes/queue.js');
const Discord = require('discord.js');
const CONFIG = require("./config/config.js");
const ADD = require("./commands/add.js").add;
const REMOVE = require("./commands/remove.js").remove;
const TEXT = require("./commands/text.js").text;
const REFRESH = require("./commands/refresh.js").refresh;
const CLIENT = new Discord.Client();
const commandQueue = new Queue();

var contactsObject = {
    contacts: []
}

CLIENT.once('ready', () => {
    console.log('Ready!');
});

CLIENT.on('message', (message) => {
    if (message.author.bot) {
        return;
    }
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send('Invalid Permissions');
        return;
    }
    else if (message.content.startsWith(CONFIG.COMMAND_PREFIX)) {
        commandQueue.enqueueCommand(message.content);
        while (commandQueue.isEmpty() != true) {
            let next_message = commandQueue.dequeueCommand();
            let [command, ...args] = next_message.trim().substring(CONFIG.COMMAND_PREFIX.length).split(/\s+/);

            if (command === 'add') {
                ADD(args, contactsObject)
                    .then((result) => {
                        if (result != "") {
                            message.channel.send(result);
                        }
                    })
                    .catch((err) => {
                        message.channel.send(err);
                    });
            }

            if (command === 'remove') {
                REMOVE(args, contactsObject)
                    .then((result) => {
                        message.channel.send(result);
                    })
                    .catch((err) => {
                        message.channel.send(err);
                    })

            }

            if (command === 'text') {
                TEXT(message.content.substring(6), contactsObject)
                    .then((result) => {
                        message.channel.send(result);
                    })
                    .catch((err) => {
                        message.channel.send(err);
                    });
            }

            if (command === 'refresh') {
                console.log("Enters Refresh");
                REFRESH(contactsObject)
                    .then((result) => {
                        contactsObject.contacts = result;
                        message.channel.send("Contacts List Refreshed");
                    })
                    .catch((err) => {
                        message.channel.send(err);
                    });

            }

        }
    }
});

CLIENT.login(CONFIG.DISCORD_BOT_TOKEN);