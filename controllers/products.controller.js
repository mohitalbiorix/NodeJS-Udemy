const Product = require('../models/products.model');

exports.getAddProducts = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
}

exports.postAddProducts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  /* 
    // without sequlize
  const product = new Product(null, title, imageUrl, price, description);
  product
    .save().then(() => {
      res.redirect('/');
    })
    .catch(err => console.log(err)); 
  */

  // with sequlize
/*   console.log(req.user)
      Product.create({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl
      }).then(result => {
        res.redirect('/admin/products');
      }).catch(err => {
        console.log(err);
      }) */

    // with association 

    req.user.createProduct({
      title:title,
      price:price,
      imageUrl:imageUrl,
      description:description
    }).then(result=>{
      res.redirect('/admin/products')
    }).catch(err=>{
      console.log(err);
    })
}

exports.getProducts = (req, res, next) => {

  // without sequlize
  /* Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }) */

  //with sequlize
  req.user.getProducts()
  // Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => console.log(err));


}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;

  // without sequlize
  /* Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }); */

  // with sequlize
  req.user.getProducts({where:{id:prodId}})
  // Product.findByPk(prodId)
    .then((product) => {
      const prod = product[0];
      if(!prod){
          return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: prod
      });
    }).catch(err => console.log(err))


};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // without sequlize;
  /*   const updatedProduct = new Product(
      prodId,
      updatedTitle,
      updatedImageUrl,
      updatedPrice,
      updatedDesc
    );
    updatedProduct.save();
    res.redirect('/admin/products'); */

  // with sequlize

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save()
    }).then(result => {
      console.log("UPDATED PRODUCT!");
      res.redirect('/admin/products');
    }).catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // without sequlize

  /*  Product.deleteById(prodId).then(() => {
     res.redirect('/');
   })
     .catch(err => console.log(err)); */

  // with sequlize

  Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    }).then(result => {
      console.log("DESTROYED PRODUCT");
      res.redirect('/admin/products')
    })
}