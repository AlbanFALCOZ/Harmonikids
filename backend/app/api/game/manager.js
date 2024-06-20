const GameModel = require('../../models/game.model');

const saveGame = async (gameData) => {
    console.log(" In saveGame");
    return await GameModel.create(gameData);
};

const getGame = async (gameId) => {
    return await GameModel.getById('id', gameId);
};

const getGames = async () => {
    return await GameModel.get();
};

const updateGame = async (gameId, gameData) => {
    return await GameModel.update(gameId, gameData);
};

const deleteGame = async (gameId) => {
    return await GameModel.delete(gameId);
};

const getGamesByChild = async (childId) => {
    return await GameModel.getByChildId(childId);
};



module.exports = {
    saveGame,
    getGame,
    updateGame,
    getGames,
    deleteGame,
    getGamesByChild,

};
