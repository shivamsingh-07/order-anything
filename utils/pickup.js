const Product = require("../models/Products");

module.exports = (products) =>
    Promise.all(
        products.map(
            async (product) =>
                new Promise((resolve, reject) => {
                    Product.find({ name: product.name }, { location: 1, _id: 0 }, (err, data) => {
                        if (err) reject(err);

                        resolve({
                            name: product.name,
                            quantity: product.quantity,
                            pickup: data[0].location[Math.floor(Math.random() * data[0].location.length)],
                        });
                    });
                })
        )
    );
