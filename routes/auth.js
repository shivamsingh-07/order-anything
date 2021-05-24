const router = require("express").Router();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var uniqid = require("uniqid");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Checking Account
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "Email or password is wrong." });

    // Checking password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: "Invalid Password!" });

    // Assigning JWT Token
    const token = jwt.sign({ user: user.user_id, auth_type: user.auth_type }, "!@#$%^&*()_+", { expiresIn: "1h" });
    res.status(200).json({ token });
});

router.post("/signup", async (req, res) => {
    const { name, email, password, auth_type } = req.body;

    try {
        // Existing Email
        const emailExist = await User.findOne({ email: email });
        if (emailExist) return res.status(400).json({ message: "Email already exists!" });

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(password, salt);

        // Creating user
        const user = new User({
            user_id: uniqid(),
            name: name,
            email: email,
            password: pass,
            auth_type: auth_type,
        });

        const newUser = await user.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = router;
