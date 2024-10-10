const express = require("express")
const connection = require("./db/connection")

const UserRoutes = require("./routes/UserRoutes")
const TaskRoutes = require("./routes/TaskRoutes")

const port =  process.env.PORT

const app = express()

const User = require("./models/User")
const Task = require("./models/Task")

app.use(express.json())

app.use("/user",UserRoutes)
app.use("/task",TaskRoutes)

connection.sync().then(
    app.listen(port)
)