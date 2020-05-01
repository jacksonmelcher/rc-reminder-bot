import { issueText, helpText } from '../responses/index';
const handleArgs = async (event, print) => {
  const { text, bot, type, group } = event;
  if (typeof event !== 'undefined' && print === true) {
    console.log('----------------In handleArgs--------------------');
    console.log(event);
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
        if (print === true) {
          console.log('USER CALLED HELP');
        }

        // await bot.sendMessage(group.id, helpText);
        return helpText;
      }
      //──── ISSUE ─────────────────────────────────────────────────────────────────────────────
      if (text === '-i' || text === '-issue' || text === 'issue') {
        if (print === true) {
          console.log('USER CALLED ISSUE');
        }

        // await bot.sendMessage(group.id, issueText);
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
  }
};

export default handleArgs;
