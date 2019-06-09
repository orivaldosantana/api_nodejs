const express = require('express'); 
const authMiddleware = require('../middlewares/auth');

const Device = require('../models/device'); 

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
    try {
        const device = await Device.findById(req.params.deviceId); 
        return res.send({device})
    } catch (err) {
        return res.status(400).send({error: 'Error loading device'}); 
    }
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
    try {
        Device.findById(req.params.deviceId, (err, device) => {
            // This assumes all the fields of the object is present in the body.
            device.name = req.body.name;
            device.description = req.body.description; 
        
            device.save((saveErr, updatedDevice) => {
                res.send({ device: updatedDevice });
            });
        });
    } catch (err) {
        return res.status(400).send({error: 'Error updating device'}); 
    } 
});

router.delete('/:deviceId', async (req, res) => {
    try {
        await Device.findByIdAndRemove(req.params.deviceId); 
        return res.send()
    } catch (err) {
        return res.status(400).send({error: 'Error deleting device'}); 
    }
});

module.exports = app => app.use('/device', router); 

