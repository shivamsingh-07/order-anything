const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.headers.authorization)
        jwt.verify(req.headers.authorization.slice(7), "!@#$%^&*()_+", (err, payload) => {
            if (err) return res.status(400).json({ message: err.message });

            if (payload.auth_type == "admin") next();
            else res.status(401).json({ message: "Invalid Token" });
        });
    else res.status(401).json({ message: "Access Token Required" });
};
