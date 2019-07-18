const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));

const SECRET = 'aew101bxwhbsla75njwhha';

const PORT = process.env.PORT || 3000;

app.post('/users', (req, res) => {
  const data = req.body;
  const token = jwt.sign(data, SECRET);
  res.json({ token });
});

const restrict = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = jwt.verify(token, SECRET);
    res.locals.userData = userData;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).send('Nope!');
  }
};

app.get('/answer', restrict, (req, res) => {
  res.json({
    answer: 'some bullshit you send back to user?',
    user: res.locals.userData,
  });
});

app.listen(PORT, () =>
  console.log(`up and running on ${PORT}`)
)
