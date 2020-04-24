// use(strict);
import { put } from "axios";
import createApp from "ringcentral-chatbot/dist/apps";
import Reminder from "../models/Reminder";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { types } from "util";

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
    // if (args[0] === "") {
    // console.log(args.indexOf("-t"));
    // }
    //FIXME Add message to bot if there are no arguments
    if (args.indexOf("-t") || args.indexOf("-m") === -1) {
      console.log("MISSING INFO");
    } else {
      for (let i = args.indexOf("-t") + 1; i < args.indexOf("-m"); i++) {
        console.log(args[i]);
        resTimeArray.push(args[i]);
      }
      console.log("Message: ");
      for (let i = args.indexOf("-m") + 1; i < args.length; i++) {
        console.log(args[i]);
        resMessageArray.push(args[i]);
      }
    }

    // FIXME: Hardcoded time so i cna debug without having to send message everytime
    resTimeString = moment().add(8, "seconds");
    resMessageString = "Test text";
    // resTimeString = resTimeArray.toString().replace(/,/g, " ");
    // resMessageString = resMessageArray.toString().replace(/,/g, " ");
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
  // ANCHOR group Joined
  if (typeof event !== "undefined") {
    console.log("EVENT: " + JSON.stringify(event, null, 2));
  }

  if (type === "BotJoinGroup") {
    console.log("zgroup: " + JSON.stringify(group, null, 2));
    await bot.sendMessage(group.id, {
      text: `To use me type **@Remind -t** MM/DD/YYYY hh:mm am/pm **-m** Your reminder message\n example: @Remind -t 4/15/2020 5:30 pm -m Call mom`,
    });
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

    // ANCHOR Set timeout
    if (allReminders.length > 0) {
      console.log("Length before setTimeout: " + allReminders.length);
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
