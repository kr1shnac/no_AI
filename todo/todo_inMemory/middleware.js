const jwt = require("jsonwebtoken");

function authMiddleware (req, res, next) {
    const token = req.headers.token;

    if(!token) {
        return res.status(404).json({
            message: "you have not logged in!"
        })
    }

    const decoded = jwt.verify(token, "secreat");
    const username = decoded.username;

    if(!username) {
        return res.status(403).json({
            message: "token is not valid"
        })
    }

    req.username = username;

    next();
}

module.exports = ({
    authMiddleware
})