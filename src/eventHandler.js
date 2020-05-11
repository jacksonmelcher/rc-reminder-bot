import { createReminder } from "./createReminder";
import { Service } from "ringcentral-chatbot/dist/models";

import {
    issueText,
    helpText,
    noArgsText,
    joinedGroup,
    timeAlreadyHappened,
} from "../responses/index";

export const eventHandler = async (event) => {
    const { type } = event;

    switch (type) {
        case "Message4Bot":
            await handleMessage4Bot(event);
            break;

        case "BotJoinGroup":
            await handleBotJoinedGroup(event);
    }
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

            await bot.sendMessage(group.id, {
                text: `Reminder set ⏰, I will send you a reminder in **${service.data.duration.humanize()}**`,
            });
        }
    }
};

const removeAll = async (id) => {
    const service = await Service.findAll({
        where: { name: "Remind", userId: id },
    });

    if (service.length === 0) {
        return { text: "Array empty" };
    } else {
        for (let i = 0; i < service.length; i++) {
            console.log("SERVICE: " + service[i].userId);
            await service[i].destroy();
        }
        return { text: "Cleared" };
    }
};

const handleBotJoinedGroup = async ({ group, bot }) => {
    await bot.sendMessage(group.id, joinedGroup);
};
