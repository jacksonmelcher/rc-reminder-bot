"use strict";
import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";
import Reminder from "../models/Reminder";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

let allReminders = [];

let arrayBool = false;

const handle = async (event) => {
  const { type, text, group, bot, message } = event;
  let args = [];
  let mentionId = "";
  let resMessageString = "";
  let resMessageArray = [];
  let creator = "";
  let fs = require("fs");

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
  // Get creators name
  if (typeof bot !== "undefined") {
    // console.log("GET USER ERROR: " + err=r);
    try {
      const user = await bot.getUser("228768004");
      const { name } = user.rc;
      creator = name;
      reminder.creator = name;
    } catch (error) {
      creator = "Unknown";
      console.log("GET USER ERROR: " + error);
    }
  }
  // For when bot is mentioned in a group.
  if (type === "Message4Bot" && mentionId === "680681005") {
    arrayBool = true;

    let reminder = new Reminder();
    reminder.timeCreated = moment();
    reminder.id = uuidv4();
    reminder.notificationTime = moment().add(30, "s");
    reminder.desiredTime = "2 minutes from now";
    reminder.reminderText = resMessageString;
    reminder.creator = creator;
    if (arrayBool === true) {
      allReminders.push(reminder);
      allReminders.sort((a, b) => a.notificationTime - b.notificationTime);

      let jsonData = JSON.stringify(allReminders, null, 2);
      fs.writeFile("json/reminders.json", jsonData, function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
    arrayBool = false;
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

  // for (let i = 0; i < allReminders.length; i++) {
  //   console.log(
  //     "====================== ALL REMINDERS =============== \n" +
  //       allReminders[i].reminderText
  //   );
  // }
};

const app = createApp(handle);

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

// setInterval(() => {
//   console.log("================ ALL ===================");
//   for (let i = 0; i < allReminders.length; i++) {
//     console.log(
//       allReminders[i].notificationTime.format("MMMM Do YYYY, h:mm:ss a")
//     );
//     console.log(allReminders[i].creator);
//   }
// }, 2000);

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
