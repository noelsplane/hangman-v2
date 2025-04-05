const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/hangman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PlayerSchema = new mongoose.Schema({
  name: String,
  games: Number,
  wins: Number,
});

const Player = mongoose.model('Player', PlayerSchema);

app.post('/api/update', async (req, res) => {
  const { name, won } = req.body;
  const wasWon = !!won; // force boolean

  let player = await Player.findOne({ name });

  if (!player) {
    player = new Player({ name, games: 1, wins: wasWon ? 1 : 0 });
  } else {
    player.games = (player.games || 0) + 1;
    player.wins = (player.wins || 0) + (wasWon ? 1 : 0);
  }

  await player.save();
  res.send(player);
});

app.get('/api/winrate/:name', async (req, res) => {
  const player = await Player.findOne({ name: req.params.name });
  if (player) {
    const rate = (player.wins / player.games) * 100;
    res.send({ winRate: rate.toFixed(2) });
  } else {
    res.send({ winRate: 0 });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  const players = await Player.find({});
  const leaderboard = players
    .map(p => ({
      name: p.name,
      winRate: p.games > 0 ? ((p.wins / p.games) * 100).toFixed(2) : 0
    }))
    .sort((a, b) => b.winRate - a.winRate);
  res.send(leaderboard);
});

app.listen(4000, () => console.log('Server running on port 4000'));
