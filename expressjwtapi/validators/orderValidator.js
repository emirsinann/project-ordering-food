const { body, validationResult } = require("express-validator");

exports.orderValidator = [
    body("iscredit").isBoolean().not().isEmpty(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors : errors.array()});
        next()
        }
]