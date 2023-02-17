const path = require('path');
const fs = require('fs');

const filePath = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        /*  fs.readFile(p, (err, fileContent) => {
             let products = [];
             if (!err) {
                 products = JSON.parse(fileContent);
             }
             products.push(this);
             fs.writeFile(p, JSON.stringify(products), (err) => {
                 console.log(err)
             })
         }); */

        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}