const createToken = require("../helper/createToken")
const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = class UserController
{
    static async createUser(req,resp)
    {
        const {name,email,password,confirmPassword} = req.body

        //validações
        if(!name || !email || !password){
            resp.status(422).json({"message":"Todos os campos são obrigatorios"})
            return
        }

        if(password != confirmPassword){
            resp.status(422).json({"message":"A senha de confirmação deve ser a mesma"})
            return
        }
        
        const emailExiste = await User.findOne({where:{email}})

        if(emailExiste){
            resp.status(400).json({"message":"Email já está cadastrado"})
            return
        }

        // criptografar senha
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password,salt)

        //criar user

        const user = new User({
            name,
            email,
            password:hashPassword
        })

        try{
            const newUser = await user.save()
            const token = await createToken(newUser)
            resp.status(201).json({
                "message":"Usuario criado com sucesso",
                "user":newUser,
                "token":token  
            })
            return
        }catch(err)
        {
            resp.status(500).json({"message":"Ocorreu um erro",err})
        }
    }

    static async Login(req,resp)
    {
        const {email,password} = req.body

        if(!email || !password){
            resp.status(422).json({"message":"Senha e email são obrigatórios"})
            return
        }

        const user = await User.findOne({where:{email}})

        //usuario existe?

        if(!user){
            resp.status(404).json({"message":"Usuário não encontrado"})
            return
        }

        //comparar senha

        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            resp.status(422).json({"message":"Senha invalida"})
            return
        }
        
        try {
            const token = await createToken(user)
            resp.status(200).json({token})
        } catch (error) {
            resp.status(500).json({"messsage":error})
        }

    }
}
