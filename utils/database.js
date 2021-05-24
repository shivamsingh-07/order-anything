const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/store", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Database Connected...");
});
