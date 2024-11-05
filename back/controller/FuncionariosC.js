import { where } from "sequelize"
import Funcionarios from "../module/Funcionarios"

const listarFuncionarios = async (req, res) => {
    try {
        const response = await Funcionarios.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const criarFuncionario = async (req, res) => {
    try {
        const body = req.params
        await Funcionarios.create({ body })
        res.status(201).send(true)
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const atualizarFuncionario = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        await Funcionarios.update({ body }, { where: { id } })
        res.status(202).send(true)
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const deletarFuncionario = async (req, res) => {
    try {
        const { id } = req.params
        await Funcionarios.destroy({ where: { id } })
        res.status(200).send(true)
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

export { deletarFuncionario, criarFuncionario ,atualizarFuncionario, listarFuncionarios }