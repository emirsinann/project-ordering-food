const { User } = require("../models/User");

exports.userResponseParser = (user) =>{
    return {
        id:user.id,
        email:user.email,
        name : user.name,
        contact : user.contact
    }
}