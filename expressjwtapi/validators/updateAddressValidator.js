const {body, validationResult, param} = require("express-validator");

exports.updateAddressValidator = [
    param("addressId").not().isEmpty().isInt(),
    body("name").isString().isLength({min : 3}).not().isEmpty(),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty())
            return res.status(400).json({errors : errors.array()});
        next()
        }
]