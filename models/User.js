const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['artisan', 'farmer', 'consumer'],
        default: 'consumer'
    },
    profilePicture: {
        type: String,
        default:"https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
    },
    location: {
        type: String,
        required: function() {
            return this.userType === 'artisan' || this.userType === 'farmer';
        }
    },
    isAdmin: {
        type: Boolean,
        type: String,
        default: false,
      },
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
