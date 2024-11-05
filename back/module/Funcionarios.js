import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Login from "./Login.js";
import Turnos from "./Turnos.js"

const Funcionarios = sequelize.define("Funcionarios", {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_funcionaros')")
    },
    nome: {
        type: DataTypes.STRING, allowNull: false
    },
    id_login: {
        type: DataTypes.INTEGER, allowNull: false, foreignKey: { model: Login, key: "id" }
    },
    id_turno: {
        type: DataTypes.INTEGER, allowNull: false, foreignKey: { model: Turnos, key: "id" }
    }
},
    {
        freezeTableName: true,
        tableName: "Funcionarios"
    }

)

export default Funcionarios