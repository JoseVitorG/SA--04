import EPIs from "../module/EPIs.js"
import Funcionarios from "../module/Funcionarios.js"
import Historico from "../module/Historico.js"
import Login from "../module/Login.js"
import Turnos from "../module/Turnos.js"
import { devolver_api } from "./HistoricoC.js"

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

const listarFuncionario = async (req, res) => {
    try {
        const { id } = req.params
        const response = await Funcionarios.findByPk(id, {
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
        const { email, senha, foto, nome, turno, cargo } = req.body
        if (email || senha || foto || nome || turno) {
            await Login.create({ email, senha, foto })
            const idUser = await Login.findOne({ where: { email: email } })
            await Funcionarios.create({ nome, id_login: idUser.id, id_turno: turno, cargo })
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
        const { nome, id_turno, cargo, id_login } = req.body
        const { email, senha, foto } = req.body.Login

        if (nome && id_turno && cargo && email && senha && foto && id_login) {
            await Funcionarios.update({ nome, id_turno, cargo }, { where: { id } })
            await Login.update({ email, senha, foto }, { where: { id: id_login } })
            res.status(202).send(true)
        } else res.status(500).send("uga buga")
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const deletarFuncionario = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Funcionarios.findByPk(id);
        if (!user) {
            return res.status(404).send("Funcionário não encontrado");
        }

        await Funcionarios.destroy({ where: { id } });
        await Login.destroy({ where: { id: user.id_login } });

        const historicos = await Historico.findAll({ where: { id_funcionarios: id } });

        if (historicos.length > 0) {
            for (const body of historicos) {
                const total = await EPIs.findByPk(body.id_epis);

                if (!total) {
                    return res.status(404).send(`EPI com ID ${body.id_epis} não encontrado`);
                }

                await EPIs.update(
                    { qtd: total.qtd + body.qtd },
                    { where: { id: body.id_epis } }
                );
            }
            await Historico.destroy({ where: { id_funcionarios: id } });
        }
        res.status(200).send(true);
    } catch (e) {
        console.error(e);
        res.status(500).send("Erro ao deletar funcionário");
    }
};


export { deletarFuncionario, listarFuncionario, listarTurnos, criarFuncionario, atualizarFuncionario, listarFuncionarios }