const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        lowercase: false,
    },
    password: {
        type:  String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    }
})


//Fire a function before db insertion
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    // console.log('user about to be saved', this);
    next();
});


//Sign in a user
userSchema.statics.signin = async function(username, password) {
    const foundUser = await this.findOne({username});
    if (foundUser) {
        const auth = await bcrypt.compare(password, foundUser.password);
        if (auth) {
            return foundUser;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect username');
}


const User = mongoose.model('user', userSchema);

module.exports = User;