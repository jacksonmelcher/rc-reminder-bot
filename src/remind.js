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
    } else {
        console.log("empty");
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
