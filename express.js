"use strict";

import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";

const handle = async (event) => {
  const { type, text, group, bot, message } = event;
  let args = [];
  let mentionId = "";
  let resMessageString = "";
  let resMessageArray = [];
  if (typeof text !== "undefined") {
    args = text.split(" ");
    console.log("ARGS: ");
    for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
      console.log(args[i]);
      resMessageArray.push(args[i]);
    }

    resMessageString = resMessageArray.toString().replace(/,/g, " ");
  }

  if (typeof message.mentions !== "undefined") {
    console.log("=========ID===========: " + message.mentions[0].id);
    mentionId = message.mentions[0].id;
  }
  if (typeof event.message.text !== "undefined") {
    console.log("EVENT: " + JSON.stringify(event.message.text, null, 2));
  }

  if (type === "Message4Bot" && args[0] === "Remind") {
    await bot.sendMessage(mentionId, {
      text: resMessageString,
    });
  }
  args = [];
  mentionId = "";
};
const app = createApp(handle);
app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

setInterval(
  async () =>
    put(`${process.env.RINGCENTRAL_CHATBOT_SERVER}/admin/maintain`, undefined, {
      auth: {
        username: process.env.RINGCENTRAL_CHATBOT_ADMIN_USERNAME,
        password: process.env.RINGCENTRAL_CHATBOT_ADMIN_PASSWORD,
      },
    }),
  24 * 60 * 60 * 1000
);
