const express = require("express")
const connection = require("./db/connection")
const redisClient = require("./db/redisConnection")
const cors = require('cors');

const UserRoutes = require("./routes/UserRoutes")
const TaskRoutes = require("./routes/TaskRoutes")

const port =  process.env.PORT

const app = express()

const User = require("./models/User")
const Task = require("./models/Task")

app.use(express.json())

app.use((req, res, next) => {

    // Qualquer endereço pode fazer requisição "*"
    res.header("Access-Control-Allow-Origin", "*");

    // Tipos de método que a API aceita
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

    // Permitir o envio de dados para API
    res.header("Access-Control-Allow-Headers", "Content-Type");

    // Executar o cors
    app.use(cors());

    // Quando não houver erro deve continuar o processamento
    next();
});

app.use("/user",UserRoutes)
app.use("/task",TaskRoutes)

const bootstrap = async () =>{
    await redisClient.connect()
    connection.sync().then(
        app.listen(port)
        )
}

bootstrap()
