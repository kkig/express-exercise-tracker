require('dotenv').config();

const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

class App {
  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
  }

  middleware() {
    this.express.use(cors());
    this.express.use(bodyParser.urlencoded({extended: true})); // Use to retrieve dat afrom POST
    this.express.use(express.static(__dirname + '/app/public'));
  }

  routes() {
    const usersRouter = require('./routes/users');
    this.express.use('/api/users', usersRouter);

    this.express.get('/', (req, res) => {
      res.sendFile(__dirname + '/app/views/index.html');
    });
  }
}

module.exports = new App().express;
