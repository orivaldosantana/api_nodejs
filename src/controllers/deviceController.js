const express = require('express'); 
const MQTT = require("async-mqtt");

const authMiddleware = require('../middlewares/auth');
const mqttConfig = require('../config/mqtt_server.json');

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





router.post('/:deviceId/', async  (req, res) => {
    let topicPublish; 
    let result = "ok"; 
    let value = req.body.value;
    try {
        const device = await Device.findById(req.params.deviceId);
        topicPublish = device.topicToWrite;  
    } catch (err) {
        return res.status(400).send({error: 'Error loading device'}); 
    } 

    console.log("Valor "+topicPublish+" "+ value + " "+mqttConfig.mqtt_login+" "+mqttConfig.mqtt_password); 
    try {
        

        const client = MQTT.connect(mqttConfig.mqtt_server,
            {
                clientId: req.body.user,
                username: mqttConfig.mqtt_login,
                password: mqttConfig.mqtt_password,
            }
        );
        // When passing async functions as event listeners, make sure to have a try catch block
        const doStuff = async () => {
            try {
                await client.publish(topicPublish, value); 
                // This line doesn't run until the server responds to the publish
                req.io.emit('command_status',value); // used by socket io to update commando button on frontend 
                await client.end();
                // This line doesn't run until the client has disconnected without error
            } catch (e){
                // Do something about it!
                result = 'Error on connecting and publishing';
                console.log(e.stack);
                process.exit();
                
            }
        }

        client.on("connect", doStuff);
        return res.send({ result: result }); 
            
    } catch (err) {
        return res.status(400).send({error: 'Error on publishing'}); 
    }
}); 

router.put('/:deviceId', async (req, res) => {
    try {
        Device.findById(req.params.deviceId, (err, device) => {
            // This assumes all the fields of the object is present in the body.
            device.name = req.body.name;
            device.description = req.body.description; 
            device.topicPublish = req.body.topicPublish; 
            device.topicToWrite = req.body.topicToWrite; 
        
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
        return res.send({ result: "ok" })
    } catch (err) {
        return res.status(400).send({error: 'Error deleting device'}); 
    }
});



module.exports = app => app.use('/device', router); 

