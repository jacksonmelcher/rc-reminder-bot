// use(strict);
import { put } from 'axios';
import createApp from 'ringcentral-chatbot/dist/apps';
import Reminder from '../models/Reminder';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

let allReminders = [];

let arrayBool = false;

const handle = async (event) => {
  const { type, text, group, bot, message } = event;
  let args = [];
  let mentionId = '';
  let resMessageString = '';
  let resMessageArray = [];
  let resTimeArray = [];
  let resTimeString = '';
  let fullUserName = '';
  // let dummyText = `-m do 25 pushups -t ${moment()
  //   .add(1, 'minute')
  //   .format('MM/DD/YYY hh:mm a')}`;

  // ANCHOR Direct message handling. Does not support mentions to other teams
  if (type === 'Message4Bot') {
    // ANCHOR Command line args handling
    if (typeof text !== 'undefined') {
      // args = dummyText.split(' ');
      args = text.split(' ');
      console.log('ARGS: ', args);

      if (
        args.toString() === 'help' ||
        args.toString() === '-h' ||
        args.toString() === '-help'
      ) {
        await bot.sendMessage(group.id, {
          text:
            '🆘\n' +
            'To use me type:\n' +
            '@Remind **-t** MM/DD/YYYY hh:mm am/pm **-m** Your reminder message\n\n' +
            'Example: @Remind -t 4/15/2020 5:30 pm -m Call mom',
        });
      } else if (
        args.toString() === 'issue' ||
        args.toString() === '-i' ||
        args.toString() === '-issue' ||
        args.toString() === '-I'
      ) {
        await bot.sendMessage(group.id, {
          text:
            'To report a bug please DM Jackson Melcher. Alternatively, if you have a Github you can open an ' +
            'issue **[here](https://github.com/jacksonmelcher/Glip-Announcements/issues)**',
        });
      } else if (args.indexOf('-t') === -1 || args.indexOf('-m') === -1) {
        console.log('No keywords found');

        await bot.sendMessage(group.id, {
          text:
            '🚨 Please add a message and a time. 🚨\n' +
            'For help 🆘 type **@Reminder help** for an example and a list of commands.',
        });
      } else {
        // Check to see which argument is first
        if (args.indexOf('-t') > args.indexOf('-m')) {
          console.log('Message came first.');
          for (let i = args.indexOf('-m') + 1; i < args.indexOf('-t'); i++) {
            resMessageArray.push(args[i]);
          }

          for (let i = args.indexOf('-t') + 1; i < args.length; i++) {
            resTimeArray.push(args[i]);
          }
          // FIXME hardcoded time
          // resTimeString = moment().add(1, 'minute').format('MM/DD/YYY hh:mm');
          resTimeString = resTimeArray.toString().replace(/,/g, ' ');
          resMessageString = resMessageArray.toString().replace(/,/g, ' ');
          console.log(resMessageString + ' -- ' + resTimeString);
        } else {
          console.log('Time came first.');
          for (let i = args.indexOf('-t') + 1; i < args.indexOf('-m'); i++) {
            resMessageArray.push(args[i]);
          }

          for (let i = args.indexOf('-m') + 1; i < args.length; i++) {
            resTimeArray.push(args[i]);
          }

          resMessageString = resTimeArray.toString().replace(/,/g, ' ');
          resTimeString = resMessageArray.toString().replace(/,/g, ' ');
          console.log(resMessageString + ' -- ' + resTimeString);
        }
      }
    }
    if (typeof message !== 'undefined') {
      if (typeof message.mentions !== 'undefined') {
        try {
          mentionId = message.mentions[0].id;
        } catch (error) {
          console.log(error);
        }
      }
    }
    // Get creators name
    if (typeof bot !== 'undefined' && event !== 'undefined') {
      try {
        const user = await bot.getUser(event.userId);
        const { name } = user.rc;
        fullUserName = name;
      } catch (error) {
        console.log('GET USER ERROR: ' + error + ' name: ' + fullUserName);
      }
    }
    // ANCHOR group Joined

    if (type === 'BotJoinGroup') {
      // console.log('zgroup: ' + JSON.stringify(group, null, 2));
      await bot.sendMessage(group.id, {
        attachments: [
          {
            type: 'Card',

            author: {
              name: 'Reminder Bot',
              // uri: 'https://example.com/author_link',
              // iconUri: 'https://example.com/author_icon.png',
            },
            title: 'Instructions',
            text:
              'Hi, I am a reminder bot. I can be used to remind you or a whole team of items at a specified ' +
              'time. To use me you can send me a direct message or add me to a team. I am the first iteration' +
              ' and lack features. As time passes and with your feedback, I will be updated with new features.',

            fields: [
              {
                title: 'Create a reminder',
                value:
                  '@Remind **-t** MM/DD/YYYY hh:mm am/pm **-m** Your reminder message',
                style: 'Long',
              },
              {
                title: 'For help',
                value: '@Remind **help**',
                style: 'Short',
              },
              {
                title: 'To submit a bug/issue',
                value: '@Remind **issue**',
                style: 'Short',
              },
            ],
            footnote: {
              text: 'Created and maintained by RC on RC',
            },
          },
        ],
      });
    }

    // if (mentionId === '680681005' && text)
    if (mentionId === '680681005') {
      arrayBool = true;

      let reminder = new Reminder();
      // Check to ee if reminder is in the past
      console.log(
        'In message statement: ' + resMessageString + ' -- ' + resTimeString
      );
      // if(resTimeString === 'Invalid Date' |||)
      if (moment() < moment(resTimeString, 'MM/DD/YY hh:mm a')) {
        reminder.timeCreated = moment();
        reminder.id = uuidv4();
        reminder.notificationTime = moment(resTimeString, 'MM/DD/YY hh:mm a');
        reminder.reminderText = resMessageString;
        reminder.creator = fullUserName;
        reminder.duration = moment
          .duration(reminder.notificationTime.diff(reminder.timeCreated))
          .as('milliseconds');

        let duration = moment.duration(
          reminder.notificationTime.diff(reminder.timeCreated)
        );

        if (arrayBool === true) {
          allReminders.push(reminder);
          allReminders.sort((a, b) => a.notificationTime - b.notificationTime);

          let jsonData = JSON.stringify(allReminders, null, 2);
          fs.writeFile('json/reminders.json', jsonData, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        arrayBool = false;
        let footnoteTime = moment().format('MMMM Do YYYY, h:mm:ss a');

        await bot.sendMessage(group.id, {
          text: `Reminder set ⏰, I will send you a reminder in **${duration.humanize()}**`,
        });
      } else if (moment() >= moment(resTimeString, 'MM/DD/YY hh:mm a')) {
        await bot.sendMessage(group.id, {
          text: `The time you gave me already happened`,
        });
      }
      // FIXME
      // else {
      //   await bot.sendMessage(group.id, {
      //     text: `🚨Please send a the time in a valid format. **MM/DD/YY hh:mm am/pm**🚨`,
      //   });
      // }
    }

    // ANCHOR Set timeout
    if (allReminders.length > 0) {
      console.log('Length before setTimeout: ' + allReminders.length);
      setTimeout(() => {
        bot.sendMessage(group.id, {
          attachments: [
            {
              type: 'Card',
              text: `**${resMessageString}**`,
              footnote: {
                text: `Reminder created by ${fullUserName}`,
              },
            },
          ],
        });
      }, allReminders[0].duration);
    }
  }

  args = [];
  mentionId = '';
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
      fs.writeFile('json/reminders.json', jsonData, function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}, 10000);

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
