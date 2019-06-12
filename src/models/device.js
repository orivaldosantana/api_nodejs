const mongoose = require('../database'); 
//const bcrypt = require('bcryptjs'); 

const DeviceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true, 
    },
    topicToWrite: {
        type: String,
        require: true,
        unique: true, 
    },
    topicToRead: {
        type: String,
        require: true,
        unique: true, 
    },
    description: {
        type: String,
        require: false,
    },
    status: {
        type: String,
        require: false,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
}); 

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device; 