const handleArgs = async (event) => {
  //──── Responses ─────────────────────────────────────────────────────────────────────────
  const helpText = {
    attachments: [
      {
        type: 'Card',
        title: 'Help 🆘',
        text: 'Here is a list of available commands and an example:',
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
  };

  const issueText = {
    attachments: [
      {
        type: 'Card',
        title: 'Issue 🚧',
        text:
          'To report a bug please DM Jackson Melcher. Alternatively, if you have a Github you can open an ' +
          'issue **[here](https://github.com/jacksonmelcher/Glip-Announcements/issues)**',
        footnote: {
          text: 'Created and maintained by RC on RC',
        },
      },
    ],
  };

  console.log('----------------In handleArgs--------------------');
  const { text, bot, type, group } = event;
  if (typeof text !== 'undefined') {
    console.log(text);
  }

  switch (type) {
    //========================================================================================
    /*                                                                                      *
     *                                      MESSAGE4BOT                                     *
     *                                                                                      */
    //========================================================================================
    case 'Message4Bot':
      //──── HELP ──────────────────────────────────────────────────────────────────────────────
      if (text === '-h' || text === 'help' || text === '-help') {
        console.log('USER CALLED HELP');
        await bot.sendMessage(group.id, helpText);
        return helpText;
      }
      //──── ISSUE ─────────────────────────────────────────────────────────────────────────────
      if (text === '-i' || text === '-issue' || text === 'issue') {
        console.log('USER CALLED ISSUE');
        await bot.sendMessage(group.id, issueText);
        return issueText;
      }
      break;

    //========================================================================================
    /*                                                                                      *
     *                                      BOTJOINGOUP                                     *
     *                                                                                      */
    //========================================================================================
    case 'BotJoinGroup':
      await bot.sendMessage(group.id, {
        text: 'group joined',
      });
      break;
    // default:
    //   await bot.sendMessage(group.id, {
    //     text: 'There was a problem',
    //   });
  }
};

export default handleArgs;
