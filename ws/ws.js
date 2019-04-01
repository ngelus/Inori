const express = require('express');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

class Websocket {
  constructor(port, client) {
    this.port = port;
    this.client = client;
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
      return res.render('index', { title: 'TEST' });
    });
  }
}

module.exports = Websocket;
