import axios from "axios";
import createApp from "ringcentral-chatbot/dist/apps";

import { eventHandler } from "./eventHandler";
import remind from "./remind";

const handle = async (event) => {
    await eventHandler(event);
};

// setInterval(() => remind(), 5000);

const app = createApp(handle);

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

setInterval(
    () => axios.put(`${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`),
    86400000
);
