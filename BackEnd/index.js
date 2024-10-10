const express = require("express")
const connection = require("./db/connection")

const port =  process.env.PORT

const app = express()

const User = require("./models/User")
const Task = require("./models/Task")

app.use(express.json())

connection.sync().then(
    app.listen(port)
)