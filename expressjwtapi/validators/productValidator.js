const {body, validationResult, param} = require("express-validator");

exports.productValidator =[
    body("name").isString().isLength({min : 3}).optional(),
body("price").isInt().optional(),
(req,res,next)=>{
    const errors =validationResult(req);
    
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});

        next();
}
]