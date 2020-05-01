const handleArgs = async (event) => {
  console.log(
    '================================IN HANDLE.JS ========================='
  );
  const { type, text, group, bot, message } = event;
  console.log(type);

  if (type === 'Message4Bot') {
    console.log('MESSAGE$BOT');
  }
};

export default handleArgs;
