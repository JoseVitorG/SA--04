import sequelize from "../db.js"
import EPIs from "../module/EPIs.js"
import Funcionarios from "../module/Funcionarios.js"
import Historico from "../module/Historico.js"

const listarHistorico = async (_, res) => {
    try {
        const response = await Historico.findAll({
            attributes: [
                [
                    sequelize.fn('TO_CHAR',
                        sequelize.fn('TIMEZONE', 'America/Sao_Paulo', sequelize.col('horario_pego')),
                        'DD/MM/YYYY HH24:MI'),
                    "horario_pego"
                ],
                [
                    sequelize.fn('TO_CHAR',
                        sequelize.fn('TIMEZONE', 'America/Sao_Paulo', sequelize.col('horario_devolvido')),
                        'DD/MM/YYYY HH24:MI'),
                    "horario_devolvido"
                ],
                "qtd"
            ],
            include: [
                { model: Funcionarios },
                { model: EPIs }
            ]
        })
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const add_historico = async (req, res) => {
    try {
        const body = req.body
        console.log(body)
        if (body.id_funcionarios && body.id_epis && body.qtd) {
            let total = await EPIs.findByPk(body.id_epis)
            if (total.qtd >= body.qtd) {
                await Historico.create(body)
                await EPIs.update(
                    { qtd: total.qtd - body.qtd },
                    { where: { id: body.id_epis } }
                )
                res.status(201).send("add")
            } res.status(500).send("maior que a quantidade no estoque")
        }
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const devolver_api = async (req, res) => {
    const body = req.body
    let total = await EPIs.findByPk(body.id_epis)
    if (body.id_epis && body.qtd) {
        await Historico.update(
            { horario_devolvido: new Date() },
            { where: { id: body.id } })
        await EPIs.update(
            { qtd: total.qtd + body.qtd },
            { where: { id: body.id_epis } }
        )
    }
}

export { listarHistorico, add_historico, devolver_api }