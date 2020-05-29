const handleSimple = async (args) => {
    if (args2.includes("tomorrow")) {
        const n = args1.indexOf("at");
        const tomorrow = moment().add(1, "day");
        const newTime = tomorrow.format("MM/DD/YYYY") + " " + args1[2];

        const reminderTime = moment(newTime, "MM/DD/YYYY hh:mm a");
        // console.log(reminderTime.format("MM/DD/YYYY hh:mm a"));
    }
    if (args2.includes("today")) {
        const n = args1.indexOf("at");
        const today = moment();
        const newTime = today.format("MM/DD/YYYY") + " " + args2[2];

        const reminderTime = moment(newTime, "MM/DD/YYYY hh:mm a");
        console.log(reminderTime.format("MM/DD/YYYY hh:mm a"));
    }
};
