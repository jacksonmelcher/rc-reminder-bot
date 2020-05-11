import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";

import { eventHandler } from "./eventHandler";
import remind from "./remind";

const handle = async (event) => {
    await eventHandler(event);
};

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
