const { connect, sequelise } = require("../dbconfig");
const { User } = require("../models/User");
const { userResponseParser } = require("../parser/userResponseParser");
//const { JWTController } = require("./JWTController");
const jwt = require("jsonwebtoken");
exports.UserController = {
    async getUserByEmail(email){
       const user = await User.findOne({
            where : {email : email},
        })
        return user;
    },
    async updateUser(req,res)
    {
        //anahtar olup olmadığı kontrol edilmeli.
        await connect();
        let data = jwt.decode(req.headers["authorization"].split(" ")[1], process.env.SECRET)
        const body = req.body;
        console.log(data.id , "data ****** req.paramsdan gelen" ,req.params.id);
        if(data.id== req.params.id)
        {
        for(let k in body){
            if(k=="password")
            delete body[k]
            
            else if(body[k] == null || body[k] == undefined )
            delete body[k]
        }
        let user =  await User.update(body , {where: {id : req.params.id}})

    return  res.status(200).json({message : "User Updated Succesfully"})
    }
    else
   return  res.status(404).json({errors: {msg : "Kullanici Güncellenemedi"}});
    },
    async getUser(req,res){
        let data = jwt.decode(req.headers["authorization"].split(" ")[1], process.env.SECRET)
        console.log(data.id , "data ****** req.paramsdan gelen" ,req.params.id);
       await connect();
        let user = await User.findByPk(req.params.id)
        if(data.id != req.params.id )
      return   res.status(404).json({errors: {msg : "User Not Found"}});
        
        else
       return  res.status(200).json(userResponseParser(user))
    }
    ,
    async deleteUser(req,res){
       await connect();
       let data = jwt.decode(req.headers["authorization"].split(" ")[1], process.env.SECRET)
       if(data.id == req.params.id){
        let user = await User.findByPk(req.params.id)
        user.destroy()
      return  res.status(200).json("User Deleted SuccesFuly")
       }
        if(!user)
       return  res.status(404).json({errors: {msg : "User Not Found"}});
    },
    //güncelledim
}