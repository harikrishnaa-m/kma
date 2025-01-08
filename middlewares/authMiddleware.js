const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {

    const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const acccessToken = authHeader.split(' ')[1];

    jwt.verify(acccessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(401)

        } else {
            req.user = user;
            next();
        }
    })

};

module.exports = {authMiddleware};