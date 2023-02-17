const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const errorController = require('./controllers/404Error.controllers');

app.use(bodyparser.urlencoded({ extended: false }));
app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname,'public'))); // use for static servng files

app.use(errorController.getErrors);
app.set('view engine','ejs');
app.set('views', 'views') 

app.listen(3000);
