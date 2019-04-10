exports.description = 'Shows this help';

const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
  message.delete();

  var helpEmbed = new RichEmbed().setColor(0x00ae86);
  var catKeys = Array.from(client.categories.keys());
  var cats = [];
  await catKeys.forEach(async catName => {
    cats.push(catName);
  });
  helpEmbed.addField('__**Categories**__', cats);
  message.channel.send(helpEmbed);
};

exports.generateHelp = async () => {
  var helpEmbed = RichEmbed();
  client.categories.keys().forEach(t => {
    helpEmbed.addField(t);
  });
  client.helpEmbed = helpEmbed;
};
