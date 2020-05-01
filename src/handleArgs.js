import { issueText, helpText, noArgsText } from '../responses/index';

const handleArgs = async (event, print, test) => {
  const { text, bot, type, group } = event;

  let args = [];
  if (typeof event !== 'undefined' && print === true) {
    console.log('----------------In handleArgs--------------------');
    console.log(event);
  }
  if (typeof text !== 'undefined') {
    args = text.split(' ');
  }
  switch (type) {
    //========================================================================================
    /*                                                                                      *
     *                                      MESSAGE4BOT                                     *
     *                                                                                      */
    //========================================================================================
    case 'Message4Bot':
      if (text === '-h' || text === 'help' || text === '-help') {
        if (print === true) {
          console.log('USER CALLED HELP');
        }
        if (test !== true) {
          await bot.sendMessage(group.id, helpText);
        }
        return helpText;
      } else if (text === '-i' || text === '-issue' || text === 'issue') {
        if (print === true) {
          console.log('USER CALLED ISSUE');
        }
        if (test !== true) {
          await bot.sendMessage(group.id, issueText);
        }

        return issueText;
      } else if (args.indexOf('-t') === -1 || args.indexOf('-m') === -1) {
        if (test !== true) {
          await bot.sendMessage(group.id, noArgsText);
        }

        return noArgsText;
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
