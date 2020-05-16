const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3100;

app.use('/games/:gameId', express.static(`${__dirname}/../public`));
app.use(express.json());

console.log(`${__dirname}/../public`);


app.get('/carousel/:gameId', (req, res) => {
  axios({
    baseURL: `http://3.18.37.38:3003/carousel/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/recommended', (req, res) => {
  axios.get('/recommended', {
    baseURL: 'http://3.18.37.38:3005',
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/reviews/:gameId', (req, res) => {
  axios({
    baseURL: `http://3.22.26.129/reviews/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.post('/reviews/:gameId', (req, res) => {
  axios({
    method: 'post',
    baseURL: `http://3.22.26.129/reviews/${req.params.gameId}`,
    data: req.body,
  })
    .then(() => { res.status(200).send(); })
    .catch(() => { res.status(404).end(); });
});

app.get('/cartapi/:gameId', (req, res) => {
  axios({
    baseURL: `http://18.221.207.9:3001/cartapi/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});

app.get('/api/games/:gameId', (req, res) => {
  axios({
    baseURL: `http://54.69.127.206:3004/api/games/${req.params.gameId}`
  })
    .then((data) => { res.status(200).send(data.data); })
    .catch(() => { res.status(404).end(); });
});


app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});