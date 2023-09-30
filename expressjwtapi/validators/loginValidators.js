const {body, validationResult} = require("express-validator");

exports.loginValidators =[
body("email").isEmail().withMessage("Email Format incorrect"),
body("password").isString().isLength({min : 3}).not().isEmpty(),
(req,res,next)=>{
    const errors =validationResult(req);
    
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array()});

        next();
}
]