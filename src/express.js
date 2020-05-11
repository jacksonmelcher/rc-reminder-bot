import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";
// import moment from "moment";
// import fs from "fs";
import { eventHandler } from "./eventHandler";
import remind from "./remind";

// const yellow = "\x1b[33m%s\x1b[0m";
// const cyan = "\x1b[36m%s\x1b[0m";
// const red = "\x1b[42m%s\x1b[0m";

let newReminders = [];

let arrayBool = false;

const handle = async (event) => {
    await eventHandler(event);
};

// ANCHOR Array monitor and manipulation
setInterval(() => remind(), 2000);

const app = createApp(handle);

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

setInterval(
    async () =>
        put(
            `${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`,
            undefined,
            {
                auth: {
                    username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
                    password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD,
                },
            }
        ),
    24 * 60 * 60 * 1000
);
