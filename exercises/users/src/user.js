const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./postSchema');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => {
                return name.length >= 3;
            },
            message: "Name must be longer than 2 characters."
        },
        required: [true, 'Name is required.']
    },
    postCount: {
        type: Number
    },
    posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;