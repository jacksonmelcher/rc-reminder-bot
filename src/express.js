import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";

import moment from "moment";

import fs from "fs";
import handleArgs from "./handleArgs";

const yellow = "\x1b[33m%s\x1b[0m";
const cyan = "\x1b[36m%s\x1b[0m";
const red = "\x1b[42m%s\x1b[0m";

let allReminders = [];
let newReminders = [];

let arrayBool = false;

const handle = async (event) => {
    const { bot } = event;
    let reminderMessage;
    let reminderTime;
    let timeCreated;
    let creator;
    let groupId;
    let duration;

    // allReminders = JSON.parse(reminderJson);
    // console.log(yellow, JSON.stringify(event, null, 2));
    // console.log(typeof reminderJson);

    newReminders = await handleArgs(event, true, false);
    newReminders.sort((a, b) => a.reminderTime - b.reminderTime);
    // allReminders = allReminders.concat(newReminders);
    // allReminders.sort((a, b) => a.reminderTime - b.reminderTime);
    // console.log(red, "Length: " + newReminders.length);

    arrayBool = true;

    if (arrayBool === true) {
        let jsonData = JSON.stringify(newReminders, null, 2);
        fs.writeFile("json/reminders.json", jsonData, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    arrayBool = false;

    // ANCHOR Set timeout
    if (newReminders.length > 0) {
        reminderMessage = newReminders[0].text;
        reminderTime = newReminders[0].reminderTime;
        timeCreated = newReminders[0].timeCreated;
        creator = newReminders[0].creator;
        groupId = newReminders[0].groupId;
        duration = newReminders[0].duration.as("milliseconds");
        // console.log(yellow, reminderMessage);
        // console.log(yellow, reminderTime);
        // console.log(yellow, timeCreated);
        // console.log(yellow, creator);
        // console.log(yellow, groupId);
        // console.log(yellow, duration);
    }

    setTimeout(async () => {
        if (typeof bot !== "undefined") {
            await bot.sendMessage(groupId, {
                attachments: [
                    {
                        type: "Card",
                        text: `**${reminderMessage}**`,
                        footnote: {
                            text: `Reminder created by ${creator}`,
                        },
                    },
                ],
            });
        }
    }, duration);
};

// // ANCHOR Array monitor and manipulation
setInterval(() => {
    if (newReminders.length > 0) {
        console.log("Length: " + newReminders.length);
        console.log(
            "Reminder Time: " +
                newReminders[0].reminderTime.format("MM/DD/YYYY hh:mm")
        );
        console.log("Current Time: " + moment().format("MM/DD/YYYY hh:mm"));
        if (moment() >= newReminders[0].reminderTime) {
            console.log(newReminders[0].text);
            newReminders.shift();
            let jsonData = JSON.stringify(newReminders, null, 2);
            fs.writeFile("json/reminders.json", jsonData, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
}, 800);

const app = createApp(handle);

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

setInterval(
    async () =>
        put(
            `${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`,
            undefined,
            {
                auth: {
                    username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
                    password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD,
                },
            }
        ),
    24 * 60 * 60 * 1000
);

export default handle;
