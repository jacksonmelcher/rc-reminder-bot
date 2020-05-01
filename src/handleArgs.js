import { issueText, helpText, noArgsText } from "../responses/index";

let reminderArray = [];
const red = "\x1b[42m%s\x1b[0m";
const cyan = "\x1b[36m%s\x1b[0m";

const handleArgs = async (event, print, test) => {
    const { text, bot, type, group } = event;
    let resMessageArray = [];
    let resTimeArray = [];
    let resTimeString = "";
    let resMessageString = "";

    let args = [];
    if (typeof event !== "undefined" && print === true) {
        console.log("----------------In handleArgs--------------------");
        // console.log(event);
    }
    if (typeof text !== "undefined") {
        args = text.split(" ");
    }
    switch (type) {
        //========================================================================================
        /*                                                                                      *
         *                                      MESSAGE4BOT                                     *
         *                                                                                      */
        //========================================================================================
        case "Message4Bot":
            if (text === "-h" || text === "help" || text === "-help") {
                if (print === true) {
                    console.log(red, "USER CALLED HELP");
                }
                if (test !== true) {
                    await bot.sendMessage(group.id, helpText);
                }
                return helpText;
            } else if (text === "-i" || text === "-issue" || text === "issue") {
                if (print === true) {
                    console.log(red, "USER CALLED ISSUE");
                }
                if (test !== true) {
                    await bot.sendMessage(group.id, issueText);
                }
                return issueText;
            } else if (args.indexOf("-t") === -1 || args.indexOf("-m") === -1) {
                if (test !== true) {
                    await bot.sendMessage(group.id, noArgsText);
                }
                return noArgsText;
            } else if (args.indexOf("-t") > args.indexOf("-m")) {
                for (
                    let i = args.indexOf("-m") + 1;
                    i < args.indexOf("-t");
                    i++
                ) {
                    resMessageArray.push(args[i]);
                }

                for (let i = args.indexOf("-t") + 1; i < args.length; i++) {
                    resTimeArray.push(args[i]);
                }
                resTimeString = resTimeArray.toString().replace(/,/g, " ");
                resMessageString = resMessageArray
                    .toString()
                    .replace(/,/g, " ");
                if (print === true) {
                    console.log(red, "Message came first.");
                    console.log(
                        cyan,
                        resMessageString + " -- " + resTimeString
                    );
                }
            } else {
                //FIXME make the res mesage stuff make sense
                for (
                    let i = args.indexOf("-t") + 1;
                    i < args.indexOf("-m");
                    i++
                ) {
                    resMessageArray.push(args[i]);
                }

                for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
                    resTimeArray.push(args[i]);
                }

                resMessageString = resTimeArray.toString().replace(/,/g, " ");
                resTimeString = resMessageArray.toString().replace(/,/g, " ");
                if (print === true) {
                    console.log(red, "Time came first.");
                    console.log(
                        cyan,
                        resMessageString + " -- " + resTimeString
                    );
                }
            }

            break;

        //========================================================================================
        /*                                                                                      *
         *                                      BOTJOINGOUP                                     *
         *                                                                                      */
        //========================================================================================
        case "BotJoinGroup":
            await bot.sendMessage(group.id, {
                text: "group joined",
            });
            break;
    }
};

export default handleArgs;
