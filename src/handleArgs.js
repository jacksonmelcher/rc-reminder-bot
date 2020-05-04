import {
    issueText,
    helpText,
    noArgsText,
    joinedGroup,
} from "../responses/index";
import { parse } from "./parse";

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
                const message = parse(args);
                console.log(message);
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
    return reminderArray;
};

export default handleArgs;
