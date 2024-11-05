import EPIs from "../module/EPIs"

const listarEPIs = async (req, res) => {
    try {
        const response = await EPIs.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

const criarEpi = async (req, res) => {
    try {
        const body = req.params
        await EPIs.create({ body })
        res.status(201).send(true)
    } catch (e) {
        console.log(e)
        res.status(500).send("erro")
    }
}

const atualizarEpi = async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        await EPIs.update({ body }, { where: { id } })
        res.status(202).send(true)
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




export { listarEPIs, criarEpi, atualizarEpi, deletarEpi }