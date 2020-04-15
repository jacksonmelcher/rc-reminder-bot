"use strict";
import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";

const handle = async (event) => {
  const { type, text, group, bot, message, data } = event;
  let args = [];
  let mentionId = "";
  let resMessageString = "";
  let resMessageArray = [];

  // Spitting and formatting message from user
  if (typeof text !== "undefined") {
    args = text.split(" ");
    console.log("ARGS: ");
    for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
      console.log(args[i]);
      resMessageArray.push(args[i]);
    }

    resMessageString = resMessageArray.toString().replace(/,/g, " ");
  }
  // Console check for mention data:
  if (typeof message.mentions !== "undefined") {
    console.log(
      "=========Mentions===========: " + JSON.stringify(message, null, 2)
    );
    mentionId = message.mentions[0].id;
  }

  // Console check for event data
  if (typeof event.message.body !== "undefined") {
    console.log(
      "===================== MESSAGE DATA =========== \n" +
        JSON.stringify(event.message.body.creatorId, null, 2)
    );
  }

  if (bot !== "undefined") {
    try {
      const user = await bot.getUser("228768004");
      console.log("USER: " + JSON.stringify(user.rc.name, null, 2));
    } catch (error) {
      console.log("GET USER ERROR: " + error);
    }
  }

  if (typeof event.message.text !== "undefined") {
    console.log("EVENT: " + JSON.stringify(event.message.text, null, 2));
  }
  if (type === "Message4Bot" && mentionId === "680681005") {
    await bot.sendMessage(group.id, {
      text: `You have a reminder:\n **${resMessageString}**`,
    });
  }
  if (type === "Message4Bot" && args[0] === "Remind") {
    try {
      await bot.sendMessage(mentionId, {
        text: `Reminder: ${resMessageString}. This reminder was made`,
      });
    } catch (error) {
      console.log("Erorr: " + error.status);
      if (error.data.message === "You aren't allowed to share to this group") {
        await bot.sendMessage(group.id, {
          text:
            `I received an error message: **${error.status}** \n` +
            `This usually means that I have not been added to the team you are trying to send a reminder to. \n\n` +
            `Please add me to the group and try again.`,
        });
      }
    }
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
