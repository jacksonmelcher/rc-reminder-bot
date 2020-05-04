import moment from "moment";

export const parse = (args) => {
    let message = {
        text: "",
        time: "",
    };
    let resTimeArray = [];
    let resMessageArray = [];

    if (args.indexOf("-t") > args.indexOf("-m")) {
        for (let i = args.indexOf("-m") + 1; i < args.indexOf("-t"); i++) {
            resMessageArray.push(args[i]);
        }
        for (let i = args.indexOf("-t") + 1; i < args.length; i++) {
            resTimeArray.push(args[i]);
        }
        message.time = resTimeArray.toString().replace(/,/g, " ");
        message.text = resMessageArray.toString().replace(/,/g, " ");
    } else if (args.indexOf("-t") < args.indexOf("-m")) {
        for (let i = args.indexOf("-t") + 1; i < args.indexOf("-m"); i++) {
            resTimeArray.push(args[i]);
        }
        for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
            resMessageArray.push(args[i]);
        }
        message.time = resTimeArray.toString().replace(/,/g, " ");
        message.text = resMessageArray.toString().replace(/,/g, " ");
    } else {
        message.time = "error";
        message.text = "error";
    }

    return message;
};
