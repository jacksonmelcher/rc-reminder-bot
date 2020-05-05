import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";
import Reminder from "../models/Reminder";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import handleArgs from "./handleArgs";
// import reminderJson from "../json/reminders.json";
const yellow = "\x1b[33m%s\x1b[0m";
const cyan = "\x1b[36m%s\x1b[0m";
const red = "\x1b[42m%s\x1b[0m";

let allReminders = [];
let newReminders = [];

let arrayBool = false;
// allReminders = JSON.parse(reminderJson);

const handle = async (event) => {
    const { type, text, group, bot, message } = event;
    let reminderMessage;
    let reminderTime;
    let timeCreated;
    let creator;
    let groupId;
    let duration;

    // allReminders = JSON.parse(reminderJson);
    // console.log(allReminders);
    // console.log(typeof reminderJson);

    newReminders = await handleArgs(event, true, false);
    newReminders.sort((a, b) => a.reminderTime - b.reminderTime);
    // allReminders = allReminders.concat(newReminders);
    // allReminders.sort((a, b) => a.reminderTime - b.reminderTime);
    console.log(red, "Length: " + newReminders.length);

    arrayBool = true;

    // let reminder = new Reminder();
    // Check to ee if reminder is in the past

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
        reminderMessage = newReminders[0].text;
        reminderTime = newReminders[0].reminderTime;
        timeCreated = newReminders[0].timeCreated;
        creator = newReminders[0].creator;
        groupId = newReminders[0].groupId;
        duration = newReminders[0].duration.as("milliseconds");
        console.log(yellow, reminderMessage);
        console.log(yellow, reminderTime);
        console.log(yellow, timeCreated);
        console.log(yellow, creator);
        console.log(yellow, groupId);
        console.log(yellow, duration);

        if (moment() >= reminderTime) {
            console.log(red, "NOTIFICATION TIME");
        }

        // setTimeout(async () => {
        //     try {
        //         // if (typeof bot !== "undefined") {
        //         await bot.sendMessage(group.id, {
        //             attachments: [
        //                 {
        //                     type: "Card",
        //                     text: `**${newReminders[0].text}**`,
        //                     footnote: {
        //                         text: `Reminder created by ${newReminders[0].creator}`,
        //                     },
        //                 },
        //             ],
        //         });
        //         // }
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }, newReminders[0].duration.as("milliseconds"));
    }
    setInterval(() => {
        console.log("Interval");
    }, 850);
};
console.log("Length before interval: " + newReminders.length);
// // ANCHOR Array monitor and manipulation

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
