const express = require('express');
const db = require('../../Recommended-Services/database/database.js');
const db2 = require('../../Carousel-Images/database/database.js');
const db3 = require('../../review_service/server/db/index.js');

const app = express();
const PORT = 3100;

app.use(express.static(`${__dirname}/../public`));
app.use(express.json());

app.get('/api/game', (req, res) => {
  db.getGamesForRecommended((err, result) => {
    if (err) {
      res.status(404).end();
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/api/game2', (req, res) => {
  db2.getGameForTopCarousel((err, result) => {
    if (err) {
      res.status(404).end();
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/reviews/:gameId', (req, res) => {
  db3.Review.find({ gameId: req.params.gameId }, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.post('/reviews/', jsonParser, (req, res) => {
  db3.Review.findById(req.body.id, (err, review) => {
    if (err) {
      res.status(500).send(err);
    } else if (req.body.voteString === 'yes') {
      review.meta.helpful += 1;
      review.save((error) => {
        if (err) {
          res.status(500).send(error);
        } else {
          res.status(202).send();
        }
      });
    } else if (req.body.voteString === 'no') {
      review.meta.unhelpful += 1;
      review.save((error) => {
        if (err) {
          res.status(500).send(error);
        } else {
          res.status(202).send();
        }
      });
    } else {
      res.status(400).send(`"Bad Vote String: ${req.body.voteString}"`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port:${PORT}`);
});