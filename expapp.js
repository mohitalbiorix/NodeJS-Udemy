const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
const expressHbs = require('express-handlebars');
const hbs = require('hbs');


// middleware 

/*
 An Express-based application is a series of middleware function calls. Advantages of using middleware: Middleware can process request objects multiple times before the server works for that request.
 Middleware can be used to add logging and authentication functionality.

 */

// app.use(route, callback , [callback])

// we can use app.get, app.post based on action type instead of app.use().

  

 // use those function in router files
/*

    app.use('/add-product', (req, res, next) => {
        res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">send</button></form>');
        //next(); // Allow the request to continue to the next middleware. no need to next(), if set routes of middleware
    })

    app.post('/product', (req, res, next) => {
        console.log(req.body);
        res.redirect('/')
    })

    app.use('/', (req, res, next) => {
        res.send('<h1>Hello from Express!</h1>');
    })

*/
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname,'public'))); // use for static servng files

app.use((req,res,next)=>{
    // res.sendFile(path.join(__dirname,'views','404Error.html'))
    res.status(404).render('404Error', {pageTitle: 'Page Not Found'});
})

// app.set('view engine','pug');  for pug
app.set('view engine','hbs');
app.set('views', 'views') 



/** server run on 3000 port */
app.listen(3000);
