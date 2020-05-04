import {
    issueText,
    helpText,
    noArgsText,
    joinedGroup,
    timeAlreadyHappened,
} from "../responses/index";
import { createReminder } from "./createReminder";

let reminderArray = [];
const red = "\x1b[42m%s\x1b[0m";
const cyan = "\x1b[36m%s\x1b[0m";

const handleArgs = async (event, print, test) => {
    const { text, bot, type, group } = event;
    let args = [];

    if (typeof event !== "undefined" && print === true) {
        console.log(red, "----------------In handleArgs--------------------");
        // console.log(event);
    }
    if (typeof text !== "undefined") {
        args = text.split(" ");
    }
    switch (type) {
        //========================================================================================
        /*                                                                                      *
         *                                      MESSAGE4BOT                                     *
         *                                                                                      */
        //========================================================================================
        case "Message4Bot":
            if (text === "-h" || text === "help" || text === "-help") {
                if (test !== true) {
                    await bot.sendMessage(group.id, helpText);
                }
                return helpText;
            } else if (text === "-i" || text === "-issue" || text === "issue") {
                if (test !== true) {
                    await bot.sendMessage(group.id, issueText);
                }
                return issueText;
            } else if (args.indexOf("-t") === -1 || args.indexOf("-m") === -1) {
                if (test !== true) {
                    await bot.sendMessage(group.id, noArgsText);
                }
                return noArgsText;
            } else if (args.includes("-t") && args.includes("-m")) {
                const message = await createReminder(args, event, test);
                if (message === false) {
                    if (test !== true) {
                        await bot.sendMessage(group.id, timeAlreadyHappened);
                    }
                } else {
                    reminderArray.push(message);
                    console.log(cyan, "Creator: " + message.creator);
                    console.log(cyan, "Reminder Time: " + message.reminderTime);
                    console.log(cyan, "Time created: " + message.timeCreated);
                    console.log(cyan, "Message: " + message.text);
                    console.log(cyan, "GroupID: " + message.groupId);
                    console.log(cyan, "Duration: " + message.duration);
                }
            }

            break;

        //========================================================================================
        /*                                                                                      *
         *                                      BOTJOINGOUP                                     *
         *                                                                                      */
        //========================================================================================
        case "BotJoinGroup":
            if (test !== true) {
                await bot.sendMessage(group.id, joinedGroup);
            }
            return joinedGroup;
    }
    reminderArray.sort((a, b) => a.reminderTime - b.reminderTime);
    return reminderArray;
};

export default handleArgs;
