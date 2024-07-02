const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, 'Use new email it is already registered']
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    }
}, {timeseries: true});

userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
});


const User = mongoose.model('User',userSchema);

module.exports = User;
