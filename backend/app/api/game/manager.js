const GameModel = require('../../models/game.model');

const saveGame = (gameData) => {
    return GameModel.create(gameData);
};

const getGame = (gameId) => {
    return GameModel.getById('id', gameId);
};

const updateGame = (gameId, gameData) => {
    return GameModel.update(gameId, gameData);
};

const deleteGame = (gameId) => {
    return GameModel.delete(gameId);
};

module.exports = {
    saveGame,
    getGame,
    updateGame,
    deleteGame
};