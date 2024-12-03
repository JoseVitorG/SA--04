import EPIs from "../module/EPIs.js"


const listarEPIs = async (req, res) => {
    try {
        const response = await EPIs.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const listarEPI = async (req, res) => {
    try {
        const { id } = req.params
        const response = await EPIs.findByPk(id)
        res.status(200).send(response)
    } catch (e) {
        res.status(500).send(e)
    }
}

const criarEpi = async (req, res) => {
    try {
        const body = req.body
        if (body.nome && body.descri && body.qtd && body.foto) {
            if (body.qtd > 0) {
                await EPIs.create(body)
                res.status(201).send("adicionado")
            } else res.status(500).send("quantidade tem que ser maior que 0")
        } else res.status(500).status("tem que ter todos os coisas coisados")
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const atualizarEpi = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        if (body.nome || body.descri || body.qtd) {
            await EPIs.update({ body }, { where: { id } })
            res.status(202).send(true)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const deletarEpi = async (req, res) => {
    try {
        const { id } = req.params
        await EPIs.destroy({ where: { id } })
        res.status(200).send(true)
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

export { listarEPIs, criarEpi, atualizarEpi, deletarEpi, listarEPI }