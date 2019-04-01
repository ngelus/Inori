module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(client.config.discord.prefix) !== 0) return;

  const args = message.content
    .slice(client.config.discord.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command).code;

  if (!cmd) return;

  cmd.run(client, message, args);
};
