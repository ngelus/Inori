const Discord = require('discord.js');
const fs = require('fs');

module.exports = async client => {
  console.log(
    `I am ready now! I can see ${client.guilds.size} servers and ${
      client.users.size
    } users.`
  );
};
