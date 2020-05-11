import {
    issueText,
    helpText,
    noArgsText,
    joinedGroup,
    timeAlreadyHappened,
} from "../responses/index";
import { createReminder } from "./createReminder";
import { Service, Bot } from "ringcentral-chatbot/dist/models";

let reminderArray = [];
const red = "\x1b[42m%s\x1b[0m";
const cyan = "\x1b[36m%s\x1b[0m";

export const eventHandler = async (event) => {
    const { text, bot, type, group } = event;

    switch (type) {
        case "Message4Bot":
            await handleMessage4Bot(event);

            break;

        case "BotJoinGroup":
    }

    return reminderArray;
};

const handleMessage4Bot = async (event) => {
    const { text, group, bot, userId } = event;
    let args = [];

    if (typeof text !== "undefined") {
        args = text.split(" ");
    }
    if (text === "-h" || text === "help" || text === "-help") {
        console.log("USER ASKED FOR HELP");

        await bot.sendMessage(group.id, helpText);

        return helpText;
    } else if (text === "-i" || text === "-issue" || text === "issue") {
        console.log("USER HAS ISSUE");

        await bot.sendMessage(group.id, issueText);

        return issueText;
    } else if (text === "clear") {
        const res = await removeAll(userId);
        await bot.sendMessage(group.id, res);
    } else if (args.indexOf("-t") === -1 || args.indexOf("-m") === -1) {
        console.log("NO -t OR -m");

        await bot.sendMessage(group.id, noArgsText);

        return noArgsText;
    } else if (args.includes("-t") && args.includes("-m")) {
        console.log("THINGS ARE WORKING");
        const message = await createReminder(args, event);
        let text = message.text;
        let timeCreated = message.timeCreated;
        let creator = message.creator;
        let creatorId = message.creatorId;
        let reminderTime = message.reminderTime;
        let duration = message.duration;
        if (message === false) {
            console.log("TIME ALREADY HAPPENED");
            await bot.sendMessage(group.id, timeAlreadyHappened);
            return;
        } else {
            const service = await Service.create({
                name: "Remind",
                botId: bot.id,
                groupId: group.id,
                userId: creatorId,
                data: {
                    text,
                    timeCreated,
                    creator,
                    reminderTime,
                    duration,
                },
            });
            console.log(
                red,
                `Service: ${service.id} - ${service.data.creator} - ${service.groupId} - ${service.data.text} `
            );
            await bot.sendMessage(group.id, {
                text: `Reminder set ⏰, I will send you a reminder in **${message.duration.humanize()}**`,
            });

            reminderArray.push(message);
        }
    }
};

const removeAll = async (id) => {
    const service = await Service.findAll({
        where: { name: "Remind", userId: id },
    });
    // console.log(service[0]);
    console.log("ID: " + id);
    console.log("ID NEEDED: " + service[0].userId);

    if (service.length === 0) {
        return { text: "Array empty" };
    } else {
        for (let i = 0; i < service.length; i++) {
            console.log("SERVICE: " + service[i].userId);
            await service[i].destroy();
        }
        return { text: "cleared" };
    }
};

const handleBotJoinedGroup = async ({ group }) => {
    await bot.sendMessage(group.id, joinedGroup);
};
