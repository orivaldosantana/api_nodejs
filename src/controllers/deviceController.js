const express = require('express'); 
const authMiddleware = require('../middlewares/auth');

const Device = require('../models/device'); 
const Authorization = require('../models/authorization');

const router = express.Router(); 

router.use(authMiddleware); 

router.get('/', async (req, res) => {
    try {
        const devices = await Device.find(); 
        return res.send({ devices }); 
    } catch (err) {
        return res.status(400).send({error: 'Error loading devices'}); 
    }
     
}); 

router.get('/:deviceId', async (req, res) => {
    res.send({ok: "true", user: req.userId}); 
});

router.post('/', async (req, res) => {
    try {
        const device = await Device.create(req.body); 
        return res.send({device})
    } catch (err) {
        return res.status(400).send({error: 'Error creating new device'}); 
    }
}); 

router.put('/:deviceId', async (req, res) => {
    res.send({ user: req.userId}); 
});

router.delete('/:deviceId', async (req, res) => {
    res.send({user: req.userId}); 
});

module.exports = app => app.use('/device', router); 

