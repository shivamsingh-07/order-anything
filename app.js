const express = require("express");
const db = require("./utils/database");
const app = express();

// Middlewares
app.use(express.json({ extended: true }));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/order", require("./routes/order"));
app.use("/product", require("./routes/product"));

app.listen(5000, () => console.log("Live at 5000..."));
