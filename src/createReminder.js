import moment from "moment";

export const createReminder = async (args, { bot, group, userId }, test) => {
    let message = {
        text: null,
        timeCreated: null,
        reminderTime: null,
        creator: null,
        groupId: null,
        duration: null,
        creatorId: null,
    };
    let resTimeArray = [];
    let resMessageArray = [];
    let username = "";

    if (args.indexOf("-t") > args.indexOf("-m")) {
        for (let i = args.indexOf("-m") + 1; i < args.indexOf("-t"); i++) {
            resMessageArray.push(args[i]);
        }
        for (let i = args.indexOf("-t") + 1; i < args.length; i++) {
            resTimeArray.push(args[i]);
        }
    } else if (args.indexOf("-t") < args.indexOf("-m")) {
        for (let i = args.indexOf("-t") + 1; i < args.indexOf("-m"); i++) {
            resTimeArray.push(args[i]);
        }
        for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
            resMessageArray.push(args[i]);
        }
    } else {
        message = null;
    }
    if (typeof bot !== "undefined" && test === false) {
        try {
            const user = await bot.getUser(userId);
            const { name } = user.rc;
            username = name;
        } catch (error) {
            console.log("GET USER ERROR: " + error + " name: " + username);
        }
    } else {
        username = "Jackson Melcher";
    }
    if (
        moment() >=
        moment(
            resTimeArray.toString().replace(/,/g, " "),
            "MM/DD/YY hh:mm a",
            "MM/DD/YY hh:mm a"
        )
    ) {
        return false;
    }

    message.creator = username;
    message.creatorId = userId;

    message.text = resMessageArray.toString().replace(/,/g, " ");

    if (test === true) {
        message.timeCreated = "2020-05-04T22:00:23.426Z";
        message.reminderTime = "2020-05-04T23:20:00.000Z";
    } else {
        message.timeCreated = moment();
        message.reminderTime = moment(
            resTimeArray.toString().replace(/,/g, " "),
            "MM/DD/YY hh:mm a"
        );
    }
    message.groupId = group.id;
    message.duration = moment.duration(
        message.reminderTime.diff(moment.timeCreated)
    );

    return message;
};
