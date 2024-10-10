const jwt = require("jsonwebtoken")
const secret = process.env.SECRET

const createToken = async (user) =>
{
    const token = jwt.sign({
        name:user.name,
        id:user.id
    },secret)

    return token
}

module.exports = createToken