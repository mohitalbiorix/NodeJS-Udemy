const mongoose = require('mongoose');
const User = require('../models/user');

const url = 'localhost:27017';
const database = 'user'
mongoose.connect(`mongodb://${url}/${database}`).then(
    () => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Max',
                    email: 'max@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        console.log("connection is successful");
    }).catch(
        (e) => {
            console.log('No Connection');
        })