import Funcionarios from "../module/Funcionarios.js"
import Login from "../module/Login.js"
import Turnos from "../module/Turnos.js"

const listarFuncionarios = async (req, res) => {
    try {
        const response = await Funcionarios.findAll({
            attributes: { exclude: ["id_login", "id_turno"] },
            include: [
                { model: Login },
                { model: Turnos }
            ]
        })
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const criarFuncionario = async (req, res) => {
    try {
        const body = req.params
        if (body.nome && body.id_login && body.id_turno) {
            await Funcionarios.create({ body })
            res.status(201).send(true)
        } else res.status(500).send("erro")
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const atualizarFuncionario = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        if (body.nome || body.id_login || body.id_turno) {
            await Funcionarios.update({ body }, { where: { id } })
            res.status(202).send(true)
        } else res.status(500).send("uga buga")
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

export { deletarFuncionario, criarFuncionario, atualizarFuncionario, listarFuncionarios }