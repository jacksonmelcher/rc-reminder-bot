import moment from "moment";

export const createReminder = async (args, { bot, group, userId }) => {
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
    console.log("===============ARGS===============");

    console.log(args);
    if (args.indexOf("-t") > args.indexOf("-m")) {
        console.log("Message came first");
        for (let i = args.indexOf("-m") + 1; i < args.indexOf("-t"); i++) {
            resMessageArray.push(args[i]);
        }
        for (let i = args.indexOf("-t") + 1; i < args.length; i++) {
            resTimeArray.push(args[i]);
        }
    } else if (args.indexOf("-t") < args.indexOf("-m")) {
        console.log("Time came first");
        for (let i = args.indexOf("-t") + 1; i < args.indexOf("-m"); i++) {
            resTimeArray.push(args[i]);
        }
        for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
            resMessageArray.push(args[i]);
        }
    } else {
        console.log("Something weird happened and message is null");
        message = null;
    }
    if (typeof bot !== "undefined") {
        try {
            const user = await bot.getUser(userId);
            const { name } = user.rc;
            username = name;
        } catch (error) {
            console.log("GET USER ERROR: " + error + " name: " + username);
        }
    }
    if (
        moment() >=
        moment(
            resTimeArray.toString().replace(/,/g, " "),
            "MM/DD/YY hh:mm a",
            "MM/DD/YY hh:mm a"
        )
    ) {
        console.log(
            "Time received: " + resTimeArray.toString().replace(/,/g, " ")
        );
        console.log("Current time: " + moment().format("MM/DD/YY hh:mm a"));
        console.log("THE CURRENT TIME IS PAST THE TIME RECEIVED");
        return false;
    }

    message.creator = username;
    message.creatorId = userId;
    message.text = resMessageArray.toString().replace(/,/g, " ");
    message.timeCreated = moment();
    message.reminderTime = moment(
        resTimeArray.toString().replace(/,/g, " "),
        "MM/DD/YY hh:mm a"
    );
    message.groupId = group.id;
    message.duration = moment.duration(
        message.reminderTime.diff(moment.timeCreated)
    );
    console.log("Message being returned");
    console.log(message);
    return message;
};
