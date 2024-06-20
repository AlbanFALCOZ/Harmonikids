const { Router } = require('express');
const manageAllErrors = require('../../utils/routes/error-management');
const GameManager = require('./manager');

const router = Router();

router.post('/', async (req, res) => {
    console.log("In game POST");
    try {
        console.log("req.body : ", req.body);
        const game = await GameManager.saveGame(req.body);
        res.status(201).send(game);
    } catch (error) {
        manageAllErrors(res, error);
    }
});

router.get('/', async (req, res) => {
    
    try {
        
        const games = await GameManager.getGames();
        res.send(games);
    } catch (error) {
        manageAllErrors(res, error);
    }
});

router.get('/:id', async (req, res) => {
    
    try {
        
        const game = await GameManager.getGame(req.params.id);
        res.send(game);
    } catch (error) {
        manageAllErrors(res, error);
    }
});

router.put('/:id', async (req, res) => {
    
    try {
        
        const game = await GameManager.updateGame(req.params.id, req.body);
        res.send(game);
    } catch (error) {
        manageAllErrors(res, error);
    }
});

router.delete('/:id', async (req, res) => {
    
    try {
        
        await GameManager.deleteGame(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        manageAllErrors(res, error);
    }
});

router.get('/gamesByChild/:childId', async (req, res) => {
    try {
        console.log("req.body : ", req.body);
        const childId = parseInt(req.params.childId);
        console.log("In game index.js router get : childId : ", childId);
        const childGames = await GameManager.getGamesByChild(childId);
        console.log("In game index.js router get : childGames : ", childGames);
        res.send(childGames);
    } catch (error) {
        manageAllErrors(res, error);
    }
});

module.exports = router;
