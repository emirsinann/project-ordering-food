const bcyrpt = require("bcrypt");
const {body, validationResult} = require("express-validator");
const { connect,close } = require("../dbconfig");
const { User } = require("../models/User");
const { userResponseParser } = require("../parser/userResponseParser");
const { JWTController } = require("./JWTController");
const { UserController } = require("./UserController");

exports.HomeController = {
    async register(req,res){


        await connect()

        
        
        let user = await UserController.getUserByEmail(req.body.email);
        if(user)
            return res.status(400).json({errors : {msg : 'user account already exists'}});
    
        const hashedPassword = bcyrpt.hashSync(req.body.password,10)
    
        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            contact : req.body.contact
        })
        res.status(200).json(userResponseParser(user));
        /* register kısmında token oluşturmak istersem tekrar burayı aktif etmem gerekiyor.
        
        const token =JWTController.createToken({email : user.email},true)
        res.cookie("refresh_token",token.refresh_token,{
            expires : new Date(Date.now()+30*24*3600000),
            httpOnly : true,
        });
        
        //close()
        res.send({...userResponseParser(user),acces_token : token.acces_token});
        // res.send(user);*/
        
},
async login(req,res){


    await connect()
    
    let user =  await UserController.getUserByEmail(req.body.email);
    if(!user)
        return res.status(400).json({errors : {msg : 'Please Register'}});

    
        if(bcyrpt.compareSync(req.body.password,user.password))
        {
            const token =JWTController.createToken({email : user.email,id : user.id},true)
        res.cookie("refresh_token",token.refresh_token,{
            expires : new Date(Date.now()+30*24*3600000),
            httpOnly : true,
        });
       return res.status(200).json({...userResponseParser(user),acces_token : token.acces_token});
        }
    
    else
    return res.status(400).json({errors : {msg : 'Incorrect password'}});
}
}