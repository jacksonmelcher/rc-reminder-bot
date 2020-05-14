import { createReminder } from "./createReminder";
import { Service } from "ringcentral-chatbot/dist/models";
import moment from "moment";

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

        await bot.sendMessage(group.id, joinedGroup);

        return helpText;
    } else if (text === "-i" || text === "-issue" || text === "issue") {
        await bot.sendMessage(group.id, issueText);

        return issueText;
    } else if (text === "clear") {
        const res = await removeAll(userId);
        await bot.sendMessage(group.id, res);
    } else if (text === "-l" || text === "-list" || text === "list") {
        await list(event);
    } else if (
        text.includes("-r") ||
        text.includes("-remove") ||
        text.includes("remove")
    ) {
        let text = await remove(args, event);
        await bot.sendMessage(group.id, text);
    } else if (args.indexOf("-t") === -1 || args.indexOf("-m") === -1) {
        console.log("NO -t OR -m");

        await bot.sendMessage(group.id, noArgsText);

        return noArgsText;
    } else if (args.includes("-t") && args.includes("-m")) {
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

const removeAll = async ({ userId }) => {
    const service = await Service.findAll({
        where: { name: "Remind", userId: userId },
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

const remove = async (args, { bot, group, userId }) => {
    if (args[1] === undefined) {
        return {
            text: "Please add an ID number.Type **@Remind -l** to view ID's",
        };
    }
    const services = await Service.findAll({
        where: { name: "Remind", userId: userId, id: args[1] },
    });
    if (services.length === 0) {
        await bot.sendMessage(group.id, {
            text: "Could not find Reminder with that ID",
        });
    } else {
        let text = services[0].data.text;
        await services[0].destroy();
        return { text: `${text}  -  deleted.` };
    }
};
const list = async ({ bot, userId, group }) => {
    const services = await Service.findAll({
        where: { name: "Remind", userId: userId },
    });
    let tempArr = [];
    let tempField = {
        title: null,
        value: null,
        style: null,
    };

    if (services.length === 0) {
        await bot.sendMessage(group.id, { text: "No reminders" });
    } else {
        let sorted = services.sort(
            (a, b) => moment(a.data.reminderTime) - moment(b.data.reminderTime)
        );
        for (const s of sorted) {
            tempField = {
                title: moment(s.data.reminderTime).format(
                    "MMMM Do YYYY, h:mm a"
                ),
                value: `*${s.data.text}* \n**ID:** ${s.id.toString()}`,
                style: "Long",
            };
            tempArr.push(tempField);
        }

        await bot.sendMessage(group.id, {
            attachments: [
                {
                    type: "Card",
                    text: "**__Current Reminders__**",
                    fields: tempArr,
                    footnote: {
                        text: "Created and maintained by RC on RC",
                    },
                },
            ],
        });
    }
};

const handleBotJoinedGroup = async ({ group, bot }) => {
    await bot.sendMessage(group.id, joinedGroup);
};
