const { Sequelize } = require("sequelize");

require("dotenv").config()
const dbname = process.env.DB_NAME
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const connection = new Sequelize(dbname,user,password,{
    dialect:"postgres",
    host:"postgres"
})

try {
    connection.authenticate();
    console.log("Conexão realizada")
} catch (error) {
    console.log("Ocorreu um erro",error)
}

module.exports= connection
