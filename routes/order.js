const router = require("express").Router();
const Order = require("../models/Orders");
const uniqid = require("uniqid");
const isCustomer = require("../middlewares/isCustomer");
const isAdmin = require("../middlewares/isAdmin");
const isAdminOrSeller = require("../middlewares/isAdminOrSeller");
const getPickup = require("../utils/pickup");

router.get("/", isAdminOrSeller, (req, res) => {
    if (req.query.status)
        Order.find({ status: req.query.status }, { _id: 0, __v: 0 }, (err, orders) => {
            if (err) return res.status(400).json(err);

            res.status(200).json(orders);
        });
    else
        Order.find({}, { _id: 0, __v: 0 }, (err, orders) => {
            if (err) return res.status(400).json(err);

            res.status(200).json(orders);
        });
});

router.post("/create", isCustomer, async (req, res) => {
    const { products } = req.body;

    try {
        const items = await getPickup(products);
        const order = new Order({
            order_id: uniqid(),
            cust_id: res.locals.user,
            items: items,
        });

        order.save().then((newOrder) => res.status(200).send(newOrder));
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

router.put("/update/:order_id", isAdminOrSeller, (req, res) => {
    Order.findOneAndUpdate({ order_id: req.params.order_id }, req.body, (err, data) => {
        if (err) return res.status(400).json(err);

        if (data) res.status(200).json({ message: "Order updated successfully" });
        else res.status(400).json({ message: "Order not found" });
    });
});

router.delete("/delete/:id", isAdmin, (req, res) => {
    const order_id = req.params.id;

    Order.findOneAndDelete({ order_id }, { _id: 0, __v: 0 }, (err, prod) => {
        if (err) return res.status(400).json(err);

        if (prod != null) res.status(200).json({ message: "Order deleted successfully" });
        else res.status(400).json({ message: "Order not found" });
    });
});

module.exports = router;
