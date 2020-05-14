const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3100;

app.use('/games/:gameId', express.static(`${__dirname}/../public`));
app.use(express.json());


app.get('/carousel/:gameId', (req, res) => {
  axios.get('/carousel/:gameId', {
    baseURL: 'http://localhost:3003'
  })
    .then((data) => { console.log(data), res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/recommended', (req, res) => {
  axios.get('/recommended', {
    baseURL: 'http://localhost:3005',
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/reviews/:gameId', (req, res) => {
  axios({
    baseURL: `http://localhost:3002/reviews/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/cartapi/:gameId', (req, res) => {
  axios({
    baseURL: `http://localhost:3001/cartapi/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/api/games/:gameId', (req, res) => {
  axios({
    baseURL: `http://localhost:3004/api/games/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});


app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});