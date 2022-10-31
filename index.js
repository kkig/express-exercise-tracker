const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

/* Middlewares */
app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // Use to retrieve dat afrom POST
app.use(express.static('public'));

/* Routes */
const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
