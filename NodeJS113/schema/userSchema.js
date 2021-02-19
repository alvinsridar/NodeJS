const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\S*@\S*\.com/.test(v);
            },
            message: 'Invalid email format.'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
    }
});

//hash password for user signup or password update before save()
//cannot use arrow fn here due to "this"
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    console.log(this);
    next();
});

module.exports = userSchema;