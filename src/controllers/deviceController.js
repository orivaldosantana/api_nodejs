const express = require('express'); 
const MQTT = require("async-mqtt");

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


router.post('/:deviceId/:value', (req, res) => {
    try {
        /*
        // Escrevendo em um tópico mqtt 
        const client  = mqtt.connect([{ host: 'mqtt://192.168.0.59', port: 1883, username: 'teste', password: 'teste' } ])
        client.on('connect', function () {
            client.publish('esp/rele1', '0')        
        })
        client.end() 
        return res.send({result: 'Mensage send'})
        // 157.230.89.7
        */
        const client = MQTT.connect("tcp://192.168.0.59:1883",
            {
                clientId:"oriva01",
                username:"teste",
                password:"teste",
            }
        );

        // When passing async functions as event listeners, make sure to have a try catch block

        const doStuff = async () => {

            console.log("Starting");
            try {
                await client.publish("esp/rele1", req.params.value);
                // This line doesn't run until the server responds to the publish
                await client.end();
                // This line doesn't run until the client has disconnected without error
                console.log("Done");
            } catch (e){
                // Do something about it!
                console.log(e.stack);
                process.exit();
            }
        }

        client.on("connect", doStuff);
        return res.send({ result: "ok" }); 
            
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

