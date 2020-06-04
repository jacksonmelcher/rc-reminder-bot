import moment from "moment-timezone";
import mmnt from "moment";

export const createReminder = async (args, { bot, group, userId }) => {
    let message = {
        text: null,
        timeCreated: null,
        reminderTime: null,
        creator: null,
        groupId: null,
        duration: null,
        creatorId: null,
        timezone: null,
    };
    let resTimeArray = [];
    let resMessageArray = [];
    let username = "";
    let userTZ = "";
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
            let user = await bot.getUser(userId);
            console.log("============TimeZone============");
            let userTimezone = user.rc.regionalSettings.timezone.name;
            userTZ = userTimezone;
            console.log(userTZ);
            let { name } = user.rc;
            username = name;
        } catch (error) {
            console.log("GET USER ERROR: " + error + " name: " + username);
        }
    }
    if (
        moment.tz(userTZ) >=
        moment.tz(
            resTimeArray.toString().replace(/,/g, " "),
            "MM/DD/YY hh:mm a",
            userTZ
        )
    ) {
        console.log(
            "Time received: " +
                moment(
                    resTimeArray.toString().replace(/,/g, " "),
                    "MM/DD/YY hh:mm a",
                    "MM/DD/YY hh:mm a"
                ).format("MM/DD/YY hh:mm a")
        );
        console.log(
            "Current time: " + moment.tz(userTZ).format("MM/DD/YY hh:mm a")
        );

        console.log("Guessed timezone: " + moment.tz.guess());

        console.log("THE CURRENT TIME IS PAST THE TIME RECEIVED");
        return false;
    }

    message.creator = username;
    message.creatorId = userId;
    message.text = resMessageArray.toString().replace(/,/g, " ");
    message.timeCreated = moment.tz(userTZ);
    message.reminderTime = moment.tz(
        resTimeArray.toString().replace(/,/g, " "),
        "MM/DD/YY hh:mm a",
        userTZ
    );
    message.groupId = group.id;
    message.duration = mmnt.duration(
        message.reminderTime.diff(mmnt.timeCreated)
    );
    message.timezone = userTZ;
    console.log("Message being returned");
    console.log("Creator: " + message.creator);
    console.log("CreatorID:" + message.creatorId);
    console.log("Text: " + message.text);
    console.log(
        "Time Created: " + message.timeCreated.format("MM/DD/YY hh:mm a")
    );
    console.log(
        "Reminder time: " + message.reminderTime.format("MM/DD/YY hh:mm a")
    );
    console.log("Duration: " + message.duration.as("minutes"));
    console.log("Timezone: " + message.timezone);
    console.log("Creator:" + message.creator);

    return message;
};
