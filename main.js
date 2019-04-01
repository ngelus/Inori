const { Client } = require('discord.js');
const fs = require('fs');

const WS = require('./ws/ws');

const config = require('./config.json');
var client = new Client();
client.config = config;

var ws = new WS(config.ws.port, client);

fs.readdir('./events/', (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.login(config.token || process.env.token);
