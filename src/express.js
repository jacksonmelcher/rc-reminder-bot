"use strict";
import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";

const handle = async (event) => {
  const { type, text, group, bot, message, data } = event;
  let args = [];
  let mentionId = "";
  let resMessageString = "";
  let resMessageArray = [];
  let creator = "";

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
    mentionId = message.mentions[0].id;
  }

  if (typeof bot !== "undefined") {
    try {
      const user = await bot.getUser("228768004");

      const { name } = user.rc;

      creator = name;
      // console.log("NAME: " + name);
    } catch (error) {
      creator = "Unknown";
      console.log("GET USER ERROR: " + error);
    }
  }
  // For when bot is mentioned in a group.
  if (type === "Message4Bot" && mentionId === "680681005") {
    await bot.sendMessage(group.id, {
      text: `You have a reminder:\n **${resMessageString}** that was made by ${creator}`,
    });
  }
  // For when the bot is directly messaged
  if (type === "Message4Bot" && args[0] === "Remind") {
    try {
      await bot.sendMessage(mentionId, {
        text: `Reminder: ${resMessageString}. This reminder was made by ${creator}`,
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

/*
You can use setTimeout() and keep all the work inside your server, but for a large number of users, 
you would not necessarily want to set a timeout for every single user. All you really need is a single 
timeout for the next user that needs to be notified. When that timer fires, you then set a timer for the 
next user that needs to be notified and so on.

This can be done with an array of objects that you sort by the notification time. Each time you add something 
to the array, you cancel your current timer, add the new notification to the array, sort the array and set a 
timer for the earliest notification.

When a timer fires, you remove that item from the array and schedule the next one.

And, since you likely want this to survive a server restart, you save the notification array (probably in JSON format) 
to a file or to a database each time you modify it so you can reload that data upon a server restart.

FYI, there are scheduling modules for node.js that already offer this type of functionality if you'd prefer to 
pick up code someone else has already written.

https://stackoverflow.com/questions/36803497/call-nodejs-function-at-a-specific-moment-in-time
*/
