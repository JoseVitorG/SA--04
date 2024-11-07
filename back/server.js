import express from "express"
import bodyParser from "body-parser"
import route from "./router/router.js"
import cors from "cors"
import sequelize from "./db.js"
const porta = 6969


const app = express()
app.use(cors())
app.use(bodyParser.json())

try {
    // await sequelize.sync({ force: true })
    await sequelize.sync()
} catch (e) {
    console.log(e)
}

app.use(route)

app.listen(porta, () => { console.log("foi") })