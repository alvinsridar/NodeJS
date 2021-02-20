const mongoose = require('mongoose');
const UserSchema = require('../schema/userSchema');

const User = mongoose.model('User', UserSchema);

module.exports = User;