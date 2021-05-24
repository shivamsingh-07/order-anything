const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user_id: String,
    name: String,
    email: String,
    password: String,
    auth_type: { type: String, default: "cust" },
    created_on: { type: String, default: new Date() },
});

module.exports = mongoose.model("users", UserSchema);
