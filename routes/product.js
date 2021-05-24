const router = require("express").Router();
const Product = require("../models/Products");
const uniqid = require("uniqid");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", (req, res) => {
    if (req.query.prod_id)
        Product.find({ prod_id: req.query.prod_id }, { _id: 0, __v: 0 }, (err, prod) => {
            if (err) return res.status(400).json(err);

            res.status(200).json(prod);
        });
    else
        Product.find({}, { _id: 0, __v: 0 }, (err, prod) => {
            if (err) return res.status(400).json(err);

            res.status(200).json(prod);
        });
});

router.post("/add", isAdmin, (req, res) => {
    const { name, category, location } = req.body;

    try {
        const product = new Product({
            prod_id: uniqid(),
            name: name,
            category: category,
            location: location,
        });

        product.save().then((newProd) => res.status(200).send(newProd));
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.put("/update/:prod_id", isAdmin, (req, res) => {
    Product.findOneAndUpdate({ prod_id: req.params.prod_id }, req.body, (err, data) => {
        if (err) return res.status(400).json(err);

        if (data) res.status(200).json({ message: "Product updated successfully" });
        else res.status(400).json({ message: "Product not found" });
    });
});

router.delete("/delete/:id", isAdmin, (req, res) => {
    const prod_id = req.params.id;

    Product.findOneAndDelete({ prod_id }, { _id: 0, __v: 0 }, (err, prod) => {
        if (err) return res.status(400).json(err);

        if (prod != null) res.status(200).json({ message: "Product deleted successfully" });
        else res.status(400).json({ message: "Product not found" });
    });
});

module.exports = router;
