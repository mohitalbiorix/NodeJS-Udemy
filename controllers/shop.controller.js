const Cart = require('../models/cart');
const Product = require('../models/products.model');

exports.getProducts = (req, res, next) => {

  // without sequlize
   /*  Product.fetchAll().then(([product])=>{
      res.render('shop/product-list', {
        prods: product,
        pageTitle: 'All Products',
        path: '/products'
    });
    }).catch(err=>console.log(err)); */

  // with sequlize
    Product.findAll().then((product)=>{
      res.render('shop/product-list', {
        prods: product,
        pageTitle: 'All Products',
        path: '/products'
    });
    }).catch(err=>console.log(err));

}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    
    // without sequlize
    /* Product.findById(prodId)
    .then(([product])=>{
        res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products'
      });
    }).catch(err=>console.log(err)) */

    // with sequlize
      Product.findByPk(prodId)
      .then((product)=>{
          res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
      }).catch(err=>console.log(err))
    
    // another way of using sequlize
    
  /*   Product.findAll({where:{id:prodId}})
      .then((product)=>{
          res.render('shop/product-detail', {
          product: product[0],
          pageTitle: product.title,
          path: '/products'
        });
      }).catch(err=>console.log(err)) 
      
  */

  };

exports.getIndex = (req, res, next) => {

  // without sequlize
   /*  Product.fetchAll().then(([product])=>{
          res.render('shop/index', {
            prods: product,
            pageTitle: 'Shop',
            path: '/'
        });
    }).catch(err=>console.log(err)); */

  // with sequlize
    Product.findAll().then((product)=>{
          res.render('shop/index', {
            prods: product,
            pageTitle: 'Shop',
            path: '/'
        });
    }).catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(
  //         prod => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });

  req.user.getCart().then(cart => {
    req.user.getProducts().then(
      products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      }).catch(err => console.log(err))
  }).catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  /*  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  }); */
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};


exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect('/cart');
    });
  };