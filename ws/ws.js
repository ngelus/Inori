const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const btoa = require('btoa');
const fetch = require('node-fetch');

class Websocket {
  constructor(port, client) {
    this.port = port;
    this.client = client;
    this.redirect = encodeURIComponent(
      `http://127.0.0.1:${port}/login_callback`
    );
    this.app = express();

    this.app.engine(
      'hbs',
      hbs({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + '/layouts'
      })
    );

    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'hbs');
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.registerRoots();

    this.server = this.app.listen(port, () => {
      console.log('Websocket API set up at port ' + this.server.address().port);
    });
  }

  registerRoots() {
    this.app.get('/', (req, res) => {
      return res.redirect(
        `https://discordapp.com/api/oauth2/authorize?client_id=${
          this.client.user.id
        }&redirect_uri=${this.redirect}&response_type=code&scope=identify`
      );
    });

    this.app.get('/login_callback', async (req, res) => {
      var code = req.query.code;
      var creds = btoa(
        `${this.client.user.id}:${this.client.config.discord.secret}`
      );
      var response = await fetch(
        `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${
          this.redirect
        }`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${creds}`
          }
        }
      );
      var json = await response.json();
      var response2 = await fetch(`http://discordapp.com/api/users/@me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${json.access_token}`
        }
      });
      var json2 = await response2.json();
      // TODO: IMPLEMENT DATABASE ACCESS AND WEBINTERFACE HERE!!!
      //res.send({ j1: json, j2: json2 });
    });
  }
}

module.exports = Websocket;
