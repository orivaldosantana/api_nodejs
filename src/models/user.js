const mongoose = require('../database'); 
const bcrypt = require('bcryptjs'); 

const UserSchema = new mongoose.Schema({
    email: {
        type: String, 
        unique: true, 
        required: true, 
        lowercase: true,
    },
    userName: {
        type: String, 
        unique: true, 
        required: false, 
    },
    password: {
        type: String,
        required: true, 
        select: false, 
    },
    role: {
        type: String,
        default: "DEFAULT",
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
}); 

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10); 
    this.password = hash; 

    next(); 
})

const User = mongoose.model('User', UserSchema);

module.exports = User; 
