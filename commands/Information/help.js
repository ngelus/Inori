exports.description = 'Shows this help';

const { RichEmbed } = require('discord.js');
exports.run = async (client, message, args) => {
  message.delete();

  var helpEmbed = new RichEmbed()
    .setColor(0x00ae86)
    .setTitle('__**Helplist**__');
  var testArr = Array.from(client.categories.keys());
  testArr.forEach(async catName => {
    var cmdStr = [];
    client.categories.get(catName).forEach(cmd => {
      cmdStr.push(`${cmd.commandName}: ${cmd.description}`);
    });
    helpEmbed.addField(`**${catName}**`, cmdStr);
  });
  message.channel.send(helpEmbed);
};

exports.generateHelp = async () => {
  var helpEmbed = RichEmbed();
  client.categories.keys().forEach(t => {
    helpEmbed.addField(t);
  });
  client.helpEmbed = helpEmbed;
};
