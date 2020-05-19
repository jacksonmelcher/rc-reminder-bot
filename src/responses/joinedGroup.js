export const joinedGroup = {
    attachments: [
        {
            type: "Card",

            author: {
                name: "Reminder Bot",
            },
            title: "Instructions",
            text:
                "Hi, I am a reminder bot. I can be used to remind you or a whole team of items at a specified " +
                "time. To use me you can send me a direct message or add me to a team. I am the first iteration" +
                " and lack features. As time passes and with your feedback, I will be updated with new features.",

            fields: [
                {
                    title: "Create a reminder",
                    value:
                        "@Remind **-t** MM/DD/YYYY hh:mm am/pm **-m** Your reminder message",
                    style: "Long",
                },
                {
                    title: "For help",
                    value: "@Remind **help** or @Remind **-h**",
                    style: "Short",
                },
                {
                    title: "To submit a bug/issue",
                    value: "@Remind **issue** or @Remind **-i**",
                    style: "Short",
                },
                {
                    title: "Clear ALL your existing reminders",
                    value: "@Remind **clear** or @Remind **-c**",
                    style: "Short",
                },
                {
                    title: "List all active reminders",
                    value: "@Remind **list** or @Remind **-l**",
                    style: "Short",
                },
            ],
            footnote: {
                text: "Created and maintained by RC on RC",
            },
        },
    ],
};
