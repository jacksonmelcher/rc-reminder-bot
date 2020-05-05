import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";
import Reminder from "../models/Reminder";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import handleArgs from "./handleArgs";
// import reminderJson from "../json/reminders.json";

let allReminders = [];
let newReminders = [];

let arrayBool = false;
// allReminders = JSON.parse(reminderJson);

const handle = async (event) => {
    const { type, text, group, bot, message } = event;

    let resMessageString = "";

    let fullUserName = "";

    const yellow = "\x1b[33m%s\x1b[0m";
    const cyan = "\x1b[36m%s\x1b[0m";
    // allReminders = JSON.parse(reminderJson);
    // console.log(allReminders);
    // console.log(typeof reminderJson);

    let newReminders = await handleArgs(event, true, false);
    newReminders.sort((a, b) => a.reminderTime - b.reminderTime);
    // allReminders = allReminders.concat(newReminders);
    // allReminders.sort((a, b) => a.reminderTime - b.reminderTime);
    // console.log("Length: " + newReminders.length);

    arrayBool = true;

    // let reminder = new Reminder();
    // Check to ee if reminder is in the past
    console.log(yellow, "In express");

    // if (newReminders.length > 0) {
    //     for (let i in newReminders) {
    //         console.log("{");
    //         console.log(yellow, "Creator: " + newReminders[i].creator);
    //         console.log(yellow, "CreatorID: " + newReminders[i].creatorId);
    //         console.log(
    //             yellow,
    //             "Reminder Time: " +
    //                 newReminders[i].reminderTime.format("MM/DD/YY hh:mm a")
    //         );
    //         console.log(
    //             yellow,
    //             "Time created: " +
    //                 newReminders[i].timeCreated.format("MM/DD/YY hh:mm a")
    //         );
    //         console.log(yellow, "Message: " + newReminders[i].text);
    //         console.log(yellow, "GroupID: " + newReminders[i].groupId);
    //         console.log(yellow, "Duration: " + newReminders[i].duration);
    //         console.log("}");
    //     }
    // }

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
        console.log(yellow, newReminders[0]);
        setTimeout(() => {
            bot.sendMessage(newReminders[0].groupId, {
                attachments: [
                    {
                        type: "Card",
                        text: `**${newReminders[0].text}**`,
                        footnote: {
                            text: `Reminder created by ${newReminders[0].creator}`,
                        },
                    },
                ],
            });
        }, newReminders[0].duration);
    }
};

const app = createApp(handle);

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

// ANCHOR Array monitor and manipulation
setInterval(() => {
    if (newReminders.length > 0) {
        if (moment() >= newReminders[0].reminderTime) {
            console.log(newReminders[0].reminderText);
            newReminders.shift();
            let jsonData = JSON.stringify(newReminders, null, 2);
            fs.writeFile("json/reminders.json", jsonData, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    }
}, 2000);

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
