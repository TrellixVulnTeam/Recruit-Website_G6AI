const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Users = new Schema({
    name: {type: String},
    email:{type: String},
    password: {type: String},
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {timestamps: true}
);

Users.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

Users.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
   
    return user
}

module.exports = mongoose.model('Users', Users);