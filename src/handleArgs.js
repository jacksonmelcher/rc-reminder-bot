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
    }
    // console.log(cyan, JSON.stringify(event, null, 2));
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
                console.log("USER ASKED FOR HELP");
                if (test !== true) {
                    await bot.sendMessage(group.id, helpText);
                }
                return helpText;
            } else if (text === "-i" || text === "-issue" || text === "issue") {
                console.log("USER HAS ISSUE");
                if (test !== true) {
                    await bot.sendMessage(group.id, issueText);
                }
                return issueText;
            } else if (args.indexOf("-t") === -1 || args.indexOf("-m") === -1) {
                console.log("NO -t OR -m");
                if (test !== true) {
                    await bot.sendMessage(group.id, noArgsText);
                }
                return noArgsText;
            } else if (args.includes("-t") && args.includes("-m")) {
                console.log("THINGS ARE WORKING");
                const message = await createReminder(args, event, test);
                if (message === false) {
                    console.log("TIME ALREADY HAPPENED");
                    if (test !== true) {
                        await bot.sendMessage(group.id, timeAlreadyHappened);
                    }
                } else {
                    if (test !== true) {
                        await bot.sendMessage(group.id, {
                            text: `Reminder set ⏰, I will send you a reminder in **${message.duration.humanize()}**`,
                        });
                    }

                    reminderArray.push(message);
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
    // console.log(reminderArray);
    return reminderArray;
};

export default handleArgs;
