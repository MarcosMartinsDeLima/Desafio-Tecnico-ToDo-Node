const jwt = require("jsonwebtoken")

const secret = process.env.SECRET


const verifyToken = (req,resp,next) =>
{
    if(!req.headers.authorization){
        return resp.status(401).json({"message":"Acesso negado"})
    }

    const token = req.headers.authorization.split(' ')[1]

    try {
        const authorized = jwt.verify(token,secret)
        req.user = authorized
        next() 
    } catch (error) {
        return resp.status(400).json({"message":"Token invalido"})
    }
}

module.exports = verifyToken