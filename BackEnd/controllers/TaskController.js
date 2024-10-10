const getUserFromToken = require("../helper/getUserFromToken")
const Task = require('../models/Task')

module.exports = class TaskController
{
    static async createTask(req,resp)
    {
        const {title,description,status} = req.body

        if(!title){
            return resp.status(422).json({"message":"Titulo é obrigatório"})
        }

        const token = req.headers.authorization.split(' ')[1]
        const user = await getUserFromToken(token)

        const task = new Task({
            title,
            description,
            status:false,
            userId:user.id
        })

        try {
            const newTask = await task.save()
            resp.status(201).json({newTask})
        } catch (error) {
            return resp.status(500).json(error)
        }
    }

    static async getAllTasks(req,resp)
    {
        const tasks = await Task.findAll()

        return resp.status(200).json(tasks)
    }

    static async getById(req,resp)
    {
        const id = req.params.id

        const task = await Task.findOne({where:{id}})

        if(!task){
            return resp.status(404).json({"message":"Não foi possivel encontrar essa tarefa"})
        }

        return resp.status(200).json({task})
    }

    static async updateStatus(req,resp)
    {
        const id = req.params.id

        const task = await Task.findOne({where:{id}})

        if(!task){
            return resp.status(404).json({"message":`Não foi possivel encontrar essa tarefa com esse id ${id}`})
        }

        const {status} = req.body

        try {
           const task = await Task.update({status},{where:{id}})
           return resp.status(200).json({"message":"Tarefa atualizada",task})
        } catch (error) {
            return resp.status(500).json({error})
        }
    }

    static async updateTarefa(req,resp)
    {
        const id = req.params.id

        const task = await Task.findOne({where:{id}})

        if(!task){
            return resp.status(404).json({"message":`Não foi possivel encontrar essa tarefa com esse id ${id}`})
        }

        const {title,description,status} = req.body

        if(!title || !description || !status){
            return resp.status(422).json({"message":"Prencha todos os campos"})
        }

        try{
            const task = await Task.update({title,description,status},{where:{id}})
            return resp.status(200).json({"message":"Tarefa atualiza",task})
        }
        catch(error){
            return resp.status(500).json({error})
        }
    }

    static async delete(req,resp)
    {
        const id = req.params.id

        const task = await Task.findOne({where:{id}})

        if(!task){
            return resp.status(404).json({"message":`Não foi possivel encontrar essa tarefa com esse id ${id}`})
        }

        try {
            await Task.destroy({where:{id}})
            return resp.status(205).json({})
        } catch (error) {
            return resp.status(500).json({error})
        }
    }
}