const jwt = require("jsonwebtoken");
const { head } = require("../routes/userroutes");
const { headers } = require("express-validator");
exports.JWTController = {
    createToken(payload, refresh = false) {
        console.log("process", process.env.SECRET)
        const accesToken = jwt.sign(
            payload,
            process.env.SECRET, {
                expiresIn: 60*5,
        }
        );

        return {
            acces_token: accesToken,
            refresh_token: refresh
                ? jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 30 * 24 * 60 * 60,
                })
                : null,
        };
    },
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            return decoded
        }
        catch (e) {
            return false
        }
    },
    verifyAccessToken(req, res, next) {
    
        const headers = req.headers
        if (!headers['authorization'])
            return res.status(405).json({ message: "token not providerd" });

        const token = headers['authorization'].split(" ")[1]
            
        if (!this.verifyToken(token))
            return res.status(405).json({ message: "ivalid token" });

        else {
            next();
        }
    },
};