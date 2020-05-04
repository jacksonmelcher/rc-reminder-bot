import moment from "moment";

export const parse = async (args, event) => {
    let message = {
        text: "",
        timeCreated: "",
        reminderTime: "",
        creator: "",
        groupId: "",
    };
    let resTimeArray = [];
    let resMessageArray = [];
    let username = "";
    const { bot, group } = event;

    if (args.indexOf("-t") > args.indexOf("-m")) {
        for (let i = args.indexOf("-m") + 1; i < args.indexOf("-t"); i++) {
            resMessageArray.push(args[i]);
        }
        for (let i = args.indexOf("-t") + 1; i < args.length; i++) {
            resTimeArray.push(args[i]);
        }
        // message.time = moment(
        //     resTimeArray.toString().replace(/,/g, " "),
        //     "MM/DD/YY hh:mm a"
        // );
        // message.text = resMessageArray.toString().replace(/,/g, " ");
        // message.reminderTime = moment();
    } else if (args.indexOf("-t") < args.indexOf("-m")) {
        for (let i = args.indexOf("-t") + 1; i < args.indexOf("-m"); i++) {
            resTimeArray.push(args[i]);
        }
        for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
            resMessageArray.push(args[i]);
        }
    } else {
        message.timeCreated = null;
        message.text = null;
        message.reminderTime = null;
    }
    if (typeof bot !== "undefined" && event !== "undefined") {
        try {
            const user = await bot.getUser(event.userId);
            const { name } = user.rc;
            username = name;
        } catch (error) {
            console.log("GET USER ERROR: " + error + " name: " + fullUserName);
        }
    }
    message.creator = username;
    message.reminderTime = moment(
        resTimeArray.toString().replace(/,/g, " "),
        "MM/DD/YY hh:mm a"
    );
    message.text = resMessageArray.toString().replace(/,/g, " ");
    message.timeCreated = moment();
    message.groupId = group.id;

    return message;
};
