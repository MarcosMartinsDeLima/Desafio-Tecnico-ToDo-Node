const jwt = require("jsonwebtoken")
const User = require("../models/User")


const secret = process.env.SECRET

const getUserFromToken = async (token)=>
{
    const decode = jwt.verify(token,secret)
    const userId = decode.id
    const user = await User.findOne({where:{id:userId}})

    return user
}

module.exports = getUserFromToken