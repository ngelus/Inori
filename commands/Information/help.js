exports.description = 'Shows this help';

const { RichEmbed } = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();

  var helpstring = '';
  const embed = new RichEmbed()
    .setTitle('Help')
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0x00ae86);
};
