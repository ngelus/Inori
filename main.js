const { Client } = require('discord.js');
const fs = require('fs');
const path = require('path');

const WS = require('./ws/ws');

const config = require('./config.json');
var client = new Client();
client.config = config;

var ws = new WS(config.ws.port, client);

// =============================================================================
// EVENT HANDLER
// =============================================================================
fs.readdir('./events/', (err, files) => {
  if (err) return console.log(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split('.')[0];
    client.on(eventName, event.bind(null, client));
  });
});

// =============================================================================
// CATEGORY AND COMMAND HANDLER
// =============================================================================
client.commands = new Map();
fs.readdir('./commands/', (err1, dirs) => {
  if (err1) return console.log(err1);
  dirs.forEach(dir => {
    fs.stat(path.join('./commands/', dir), (err2, stats) => {
      if (err2) return console.log(err2);
      if (stats.isDirectory()) {
        fs.readdir(path.join('./commands/', dir), (err3, files) => {
          if (err3) return console.log(err3);
          files.forEach(file => {
            if (!file.endsWith('.js')) return;
            let props = {
              category: dir,
              code: require(`./commands/${dir}/${file}`)
            };
            let commandName = file.split('.')[0];
            console.log(`Loading ${commandName}-command from category ${dir}`);
            client.commands.set(commandName, props);
          });
        });
      }
    });
  });
});

client.login(config.token || process.env.token);
