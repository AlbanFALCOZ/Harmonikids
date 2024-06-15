const { Router } = require('express')

const bodyParser = require('body-parser');
const GameManager = require('./manager');

const app = Router();
app.use(bodyParser.json());

app.post('/', (req, res) => {
    const game = GameManager.saveGame(req.body);
    res.send(game);
});

app.get('/:id', (req, res) => {
    const game = GameManager.getGame(req.params.id);
    res.send(game);
});

app.put('/:id', (req, res) => {
    const game = GameManager.updateGame(req.params.id, req.body);
    res.send(game);
});

app.delete('/:id', (req, res) => {
    GameManager.deleteGame(req.params.id);
    res.sendStatus(200);
});

module.exports = app;