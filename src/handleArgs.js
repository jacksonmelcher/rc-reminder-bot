const handleArgs = async (event) => {
  console.log('----------------In handleArgs--------------------');
  const { text, bot, type, group } = event;
  console.log(type);
  switch (type) {
    case 'Message4Bot':
      await bot.sendMessage(group.id, {
        text: 'Message for bot',
      });
      break;
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
