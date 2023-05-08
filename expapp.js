const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const errorController = require('./controllers/404Error.controller');
const User = require('./models/user');
// require('./database/conn')
const mongoose = require('mongoose');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public'))); // use for static servng files

app.use((req, res, next) => {
    User.findById('64589a9b6ddd3b15e05d971f')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });


app.use('/admin', adminRoutes);
app.use(errorController.getErrors);
app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose
  .connect(
    'mongodb://localhost:27017/user'
  )
  .then(result => {
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
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });