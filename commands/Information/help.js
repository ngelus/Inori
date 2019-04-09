exports.description = 'Shows this help';

const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
  message.delete();

  var helpEmbed = new RichEmbed();
  var testArr = Array.from(client.categories.keys());
  testArr.forEach(async catName => {
    client.categories.get(catName);
  });
  helpEmbed.addField('TEST', ['test123', 'new line?']);
  message.channel.send(helpEmbed);
};

exports.generateHelp = async () => {
  var helpEmbed = RichEmbed();
  client.categories.keys().forEach(t => {
    helpEmbed.addField(t);
  });
  client.helpEmbed = helpEmbed;
};
