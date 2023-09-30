const { body, validationResult } = require("express-validator");

exports.addressValidator = [
    body("name").isString().isLength({min : 2}).not().isEmpty(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors : errors.array()});
        next()
        }
]