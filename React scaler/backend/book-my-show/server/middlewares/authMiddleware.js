const jwt = require("jsonwebtoken"); // Common js import syntax for importing a default export 

const authMiddleware = async (req, res, next) => {
    try {
        console.log("Middleware");
        console.log("Headers", req.headers.authorization); // Bearer token
        const token = req.headers.authorization.split(" ")[1]; // Extract token from Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded", decoded);
        req.body.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({success: false, messafe: "Token Invalid"});
    }
};

module.exports = authMiddleware;