const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const errorController = require('./controllers/404Error.controller');

// database  -- > sequlize

const sequelize = require('./util/databse');
const Product = require('./models/products.model');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

// association
Product.belongsTo(User,{constraint:true,onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });
  

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Max', email: 'test@test.com' });
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
      })
    .catch(err => {
        console.log(err);
    });

app.use(bodyparser.urlencoded({ extended: false }));
// app.use(express.json())
app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public'))); // use for static servng files

app.use(errorController.getErrors);
app.set('view engine', 'ejs');
app.set('views', 'views');



/* 
User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) - This creates the table, dropping it first if it already existed
User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model. */