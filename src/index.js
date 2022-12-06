require('dotenv').config();

const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

class App {
  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
    this.security();
  }

  middleware() {
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({extended: true})); // Use to retrieve dat afrom POST
    this.express.use(bodyParser.json());
    this.express.use(express.static(__dirname + '/app/public'));
  }

  routes() {
    const usersRouter = require('./routes/users');
    this.express.use('/api/users', usersRouter);

    this.express.get('/', (req, res) => {
      res.sendFile(__dirname + '/app/views/index.html');
    });
  }

  security() {
    // Disable X-Powered-By http header
    this.express.disable('x-powered-by');
  }
}

module.exports = new App().express;
