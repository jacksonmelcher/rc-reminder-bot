// use(strict);
import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";
import Reminder from "../models/Reminder";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

let allReminders = [];

let arrayBool = false;

const handle = async (event) => {
  const { type, text, group, bot, message } = event;
  let args = [];
  let mentionId = "";
  let resMessageString = "";
  let resMessageArray = [];
  let resTimeArray = [];
  let resTimeString = "";
  let fullUserName = "";

  // ANCHOR Command line args handling
  if (typeof text !== "undefined") {
    args = text.split(" ");
    console.log("Time: ");
    for (let i = args.indexOf("-t") + 1; i < args.indexOf("-m"); i++) {
      console.log(args[i]);
      resTimeArray.push(args[i]);
    }
    console.log("Message: ");
    for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
      console.log(args[i]);
      resMessageArray.push(args[i]);
    }
    resTimeString = resTimeArray.toString().replace(/,/g, " ");
    resMessageString = resMessageArray.toString().replace(/,/g, " ");
  }
  if (typeof message !== "undefined") {
    if (typeof message.mentions !== "undefined") {
      try {
        mentionId = message.mentions[0].id;
      } catch (error) {
        console.log(error);
      }
    }
  }
  // Get creators name
  if (typeof bot !== "undefined" && event !== "undefined") {
    try {
      const user = await bot.getUser(event.userId);
      const { name } = user.rc;
      fullUserName = name;
    } catch (error) {
      console.log("GET USER ERROR: " + error + " name: " + fullUserName);
    }
  }
  // ANCHOR Direct message handling. Does not support mentions to other teams
  if (type === "Message4Bot") {
    if (mentionId === "680681005") {
      arrayBool = true;

      let reminder = new Reminder();
      // Check to ee if reminder is in the past
      if (moment() < moment(resTimeString, "MM/DD/YY hh:mm a")) {
        reminder.timeCreated = moment();
        reminder.id = uuidv4();
        reminder.notificationTime = moment(resTimeString, "MM/DD/YY hh:mm a");
        reminder.reminderText = resMessageString;
        reminder.creator = fullUserName;
        reminder.duration = moment
          .duration(reminder.notificationTime.diff(reminder.timeCreated))
          .as("milliseconds");

        let duration = moment.duration(
          reminder.notificationTime.diff(reminder.timeCreated)
        );

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
          text: `I will send you a reminder in ${duration.humanize()}`,
        });
      } else {
        await bot.sendMessage(group.id, {
          text: `The time you gave me already happened`,
        });
      }
    }
    // ANCHOR For when the bot is directly messaged
    if (args[0] === "Remind") {
      try {
        await bot.sendMessage(mentionId, {
          text: `Reminder: ${resMessageString}. This reminder was made by ${fullUserName}`,
        });
      } catch (error) {
        console.log("Erorr: " + error.status);
        if (
          error.data.message === "You aren't allowed to share to this group"
        ) {
          await bot.sendMessage(group.id, {
            text:
              `I received an error message: **${error.status}** \n` +
              `This usually means that I have not been added to the team you are trying to send a reminder to. \n\n` +
              `Please add me to the group and try again.`,
          });
        }
      }
    }

    // ANCHOR Set timeout
    if (allReminders.length > 0) {
      setTimeout(() => {
        bot.sendMessage(group.id, {
          text: `You have a reminder:\n **${resMessageString}** that was made by ${fullUserName}`,
        });
      }, allReminders[0].duration);
    }
  }

  args = [];
  mentionId = "";
};

const app = createApp(handle);

app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT);

// ANCHOR Array monitor and manipulation
setInterval(() => {
  if (allReminders.length > 0) {
    if (moment() >= allReminders[0].notificationTime) {
      console.log(allReminders[0].reminderText);
      allReminders.shift();
      let jsonData = JSON.stringify(allReminders, null, 2);
      fs.writeFile("json/reminders.json", jsonData, function (err) {
        if (err) {
          console.log(err);
        }
      });
    } else {
    }
  }
}, 800);

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
