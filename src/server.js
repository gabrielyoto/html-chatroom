const express = require('express');
const fs = require('fs');

const app = express();

const salas = [];
const messages = [];

app.use(express.json());

app.post('/join', (req, res) => {
  salas.push(req.sala);
  res.send('ok');
});

app.post('/send', (req, res) => {
  messages.push({ sala: req.body.sala, message: req.body.message, user: req.body.user });
  res.send('ok');
});

app.get('/messages', (req, res) => {
  res.send(messages.filter((message) => message.sala === req.query.sala));
});

app.use('/:sala', (req, res) => {
  fs.readFile('./src/pages/chat.html', (error, data) => {
    if (error) console.error(error);
    else if (data) {
      res.write(data);
      res.end();
    }
  });
});

app.use('/', (req, res) => {
  fs.readFile('./src/pages/index.html', (error, data) => {
    if (error) console.error(error);
    else if (data) {
      res.write(data);
      res.end();
    }
  });
});

app.listen(3000);
