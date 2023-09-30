const {body, validationResult, param} = require("express-validator");

exports.categoryValidator =[
    body("name").isString().isLength({min : 3}).optional(),
(req,res,next)=>{
    const errors =validationResult(req);
    
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});

        next();
}
]