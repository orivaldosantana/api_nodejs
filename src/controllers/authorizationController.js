const express = require('express'); 

const authMiddleware = require('../middlewares/auth');

const Authorization = require('../models/authorization'); 

const router = express.Router(); 
router.use(authMiddleware); 

router.get('/', async (req, res) => {
    try {
        const authorizations = await Authorization.find(); 
        return res.send({ authorizations }); 
    } catch (err) {
        return res.status(400).send({error: 'Error loading authorizations'}); 
    }
     
});

router.get('/devices', async (req, res) => {
    try {
        const results = await Authorization.find({user: req.userId}).populate('device');
        let authorizations = [];
        // selecionado os atributos da resposta 
        for (let i = 0; i < results.length; i++){
            authorizations[i] = { 
                device_id: results[i].device._id,
                name: results[i].device.name
            }; 
                
        }
        //console.log( authorizations ); 
        return res.send({ authorizations }); 
    } catch (err) {
        return res.status(400).send({error: 'Error loading authorizations'}); 
    }
     
});

router.post('/', async (req, res) => {
    try {
        const authorization = await Authorization.create(req.body); 
        return res.send({authorization})
    } catch (err) {
        return res.status(400).send({error: 'Error creating new authorization'}); 
    }
});


module.exports = app => app.use('/authorization', router); 

