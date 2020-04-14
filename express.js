"use strict";

import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";

const handle = async (event) => {
  const { type, text, group, bot, message } = event;
  let args = [];
  let mentionId = "";
  if (typeof text !== "undefined") {
    args = text.split(" ");
  }

  if (typeof message.mentions !== "undefined") {
    console.log("=========ID===========: " + message.mentions[0].id);
    mentionId = message.mentions[0].id;
    // console.log("Mention id: " + mentionId);
  }
  if (typeof event.message.text !== "undefined") {
    console.log("EVENT: " + JSON.stringify(event.message.text, null, 2));
  }

  if (type === "Message4Bot" && text === "hey") {
    await bot.sendMessage(group.id, {
      text:
        "Hi I am a reminder bot, I'm stilll in development so bare with me. Would you like to create a new reminder?",
    });
  }
  if (type === "Message4Bot" && text === "yes") {
    await bot.sendMessage(group.id, {
      text: "What is your reminder/announcement text?",
    });
  }

  if (type === "Message4Bot" && args[0] === "test") {
    await bot.sendMessage(mentionId, {
      text: "hey ",
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
