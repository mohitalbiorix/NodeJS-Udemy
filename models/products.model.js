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
    constructor(t) {
        this.title = t;
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