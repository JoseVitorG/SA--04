import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Turnos = sequelize.define("Turnos", {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_turnos')")
    },
    nome: {
        type: DataTypes.STRING, allowNull: false
    },
    id_ini: {
        type: DataTypes.INTEGER, allowNull: false
    },
    id_fim: {
        type: DataTypes.INTEGER, allowNull: false
    }
},
    {
        freezeTableName: true,
        tableName: "Turnos"
    }

)

export default Turnos