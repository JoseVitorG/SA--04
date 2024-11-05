import Historico from "../module/Historico.js"

const listarHistorico = async (req, res) => {
    try {
        const response = await Historico.findAll()
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send("erro")
    }
}

export { listarHistorico }