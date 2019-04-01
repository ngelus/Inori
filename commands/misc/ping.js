exports.description = 'Replys with pong';

exports.run = (client, message, args) => {
  message.delete();
  message.reply('pong!').catch(console.error);
};
