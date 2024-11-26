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

const listarTurnos = async (req, res) => {
    const response = await Turnos.findAll()
    res.status(200).send(response)
}

const criarFuncionario = async (req, res) => {
    try {
        const { email, senha, foto, nome, turno, cargo } = req.params
        if (email && senha && foto && nome && turno) {
            await Login.create({ email, senha, foto })
            const idUser = Login.findOne({ where: { email: email } })
            await Funcionarios.create({ nome, id_login: idUser.id, turno, cargo })
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

export { deletarFuncionario, listarTurnos, criarFuncionario, atualizarFuncionario, listarFuncionarios }