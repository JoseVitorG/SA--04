import sequelize from "../db.js"
import EPIs from "../module/EPIs.js"
import Funcionarios from "../module/Funcionarios.js"
import Historico from "../module/Historico.js"
import Login from "../module/Login.js"

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
        const { user, pegos } = req.body;
        const { email, senha } = user;

        let userRecord = await Login.findOne({ where: { email, senha } });

        if (userRecord) {
            if (pegos && pegos.length > 0) {
                let epiIds = pegos.map(i => i.id);
                let epes = await EPIs.findAll({ where: { id: epiIds } });

                let estoqueSuficiente = epes.every(epi =>
                    epi.qtd >= pegos.find(i => i.id === epi.id).qtd
                );

                if (estoqueSuficiente) {
                    await Historico.bulkCreate(pegos.map(i => ({
                        id_funcionarios: userRecord.id,
                        id_epis: i.id,
                        qtd: i.qtd,
                        horario_pego: new Date()
                    })));

                    for (let epi of epes) {
                        const epiQtd = pegos.find(i => i.id === epi.id).qtd;
                        await EPIs.update(
                            { qtd: epi.qtd - epiQtd },
                            { where: { id: epi.id } }
                        );
                    }

                    res.status(201).send("Histórico e estoque atualizados com sucesso");
                } else {
                    res.status(500).send("Quantidade no estoque insuficiente");
                }
            } else {
                res.status(500).send("Faltando informações (pegos ou qtd)");
            }
        } else {
            res.status(500).send("Usuário ou senha errada");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao processar a requisição");
    }
};

const devolver_api = async (req, res) => {
    const body = req.body;

    if (!body.id_epis || !body.qtd) {
        return res.status(400).send("Faltando dados necessários: id_epis ou qtd");
    }

    try {
        let total = await EPIs.findByPk(body.id_epis);

        if (!total) {
            return res.status(404).send("EPI não encontrado");
        }

        await Historico.update(
            { horario_devolvido: new Date() },
            { where: { id: body.id } }
        );

        await EPIs.update(
            { qtd: total.qtd + body.qtd },
            { where: { id: body.id_epis } }
        );

        res.status(200).send("Devolução registrada e estoque atualizado");

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao processar a devolução");
    }
};


export { listarHistorico, add_historico, devolver_api }