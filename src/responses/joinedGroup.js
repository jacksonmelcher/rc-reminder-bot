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
                        "@Remind **-m** Your reminder message **-t** MM/DD/YYYY hh:mm am/pm",
                    style: "Long",
                },
                {
                    title: "Create a reminder for teams",
                    value:
                        "@Remind **@team1 @team2** -m Your reminder message -t MM/DD/YYYY hh:mm am/pm",
                    style: "Long",
                },
                {
                    title: "Team reminder instructions",
                    value:
                        "Make sure you, as a user, and the bot are added to the team you are trying to remind," +
                        "or the reminder will not send.",
                    style: "Short",
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
