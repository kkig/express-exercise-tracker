require('dotenv').config();

const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const compression = require('compression');
const helmet = require('helmet');

// Set up rate limiter: maximum of twenty requests per minute
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const helmetOptions = {
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: "'self'",
      imgSrc: ['*'],
    },
  },
};

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
    this.express.use(helmet(helmetOptions));

    this.express.use(compression()); // Compress all routes
    this.express.use(limiter);

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

    // Custom error handlers
    this.express.use((req, res, next) => {
      res.status(404).send('Ooops! Page not found.');
    });

    this.express.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something went wrong.');
    });
  }
}

module.exports = new App().express;
