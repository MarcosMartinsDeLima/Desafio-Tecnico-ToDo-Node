const {DataTypes} = require("sequelize")

const connection = require("../db/connection")

const Task = connection.define("Task",{
    title:{
        type:DataTypes.STRING,
        require:true
    },
    description:{
        type:DataTypes.STRING,
        require:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        require:true
    },
    userId:{
        type:DataTypes.INTEGER,
        require:true,
        references:{
            model:"Users",
            key:'id'
        }
    }

})