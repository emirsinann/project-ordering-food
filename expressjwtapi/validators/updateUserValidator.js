const {body, validationResult, param} = require("express-validator");

exports.updateUserValidator =[
    param("id").not().isEmpty().isInt(),
    body("name").isString().isLength({min : 3}).optional(),
body("email").isEmail().withMessage("Email Format incorrect").optional(),
body("contact").isString().isLength({max : 11}).optional(),
(req,res,next)=>{
    const errors =validationResult(req);
    
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});

        next();
}
]