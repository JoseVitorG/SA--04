import EPIs from "../module/EPIs"
import Funcionarios from "../module/Funcionarios"
import Historico from "../module/Historico"
import Login from "../module/Login"
import Turnos from "../module/Turnos"


const listarEPIs = async (req, res) => {
    try {
        const response = await EPIs.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const listarFuncionarios = async (req, res) => {
    try {
        const response = await Funcionarios.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const listarHistorico = async (req, res) => {
    try {
        const response = await Historico.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const listarLogin = async (req, res) => {
    try {
        const response = await Login.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const listarTurnos = async (req, res) => {
    try {
        const response = await Turnos.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}


export { listarEPIs, listarFuncionarios, listarLogin, listarHistorico, listarTurnos }