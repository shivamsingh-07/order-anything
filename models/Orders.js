const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    order_id: String,
    cust_id: String,
    seller: { type: String, default: "" },
    items: [
        {
            name: String,
            quantity: Number,
            pickup: String,
        },
    ],
    status: { type: String, default: "Task Created" },
    created_on: { type: String, default: new Date() },
});

module.exports = mongoose.model("orders", OrderSchema);
