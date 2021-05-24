const mongoose = require("mongoose");

const ProdSchema = new mongoose.Schema({
    prod_id: String,
    name: "",
    category: "",
    location: Array,
    created_on: { type: String, default: new Date() },
});

module.exports = mongoose.model("products", ProdSchema);
