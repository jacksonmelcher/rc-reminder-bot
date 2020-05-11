import { Service, Bot } from "ringcentral-chatbot/dist/models";

import moment from "moment";

const remind = async () => {
    let services = [];
    let sorted = [];
    services = await Service.findAll({ where: { name: "Remind" } });

    if (services.length > 0) {
        sorted = services.sort(
            (a, b) => moment(a.data.reminderTime) - moment(b.data.reminderTime)
        );

        if (moment() >= moment(sorted[0].data.reminderTime)) {
            let id = sorted[0].id;
            let groupId = sorted[0].groupId;
            let text = sorted[0].data.text;
            let botId = sorted[0].botId;
            let creator = sorted[0].data.creator;

            let tempService = await Service.findByPk(id);
            console.log("Sending Message");

            const bot = await Bot.findByPk(botId);
            try {
                await bot.sendMessage(groupId, {
                    attachments: [
                        {
                            type: "Card",
                            text: `**${text}**`,
                            footnote: {
                                text: `Reminder created by ${creator}`,
                            },
                        },
                    ],
                });
            } catch (error) {
                console.log(error);
            }

            console.log(text);

            sorted.shift();
            console.log("removed from sorted");
            await tempService.destroy();
            console.log("Deleted from database");

            services = await Service.findAll({ where: { name: "Remind" } });
        }
    } else {
        console.log("empty");
        return;
    }

    console.log("=========================================");
    for (const s of sorted) {
        console.log(moment(s.data.reminderTime).format("MM/DD/YY hh:mm a"));
        // console.log(
        //     "reminder time: " +
        //         s.data.reminderTime +
        //         " " +
        //         typeof s.data.reminderTime
        // );
        // console.log(
        //     "time created: " +
        //         moment(s.data.timeCreated).format("MM/DD/YY hh:mm a") +
        //         " " +
        //         typeof s.data.timeCreated
        // );
    }
};

export default remind;
