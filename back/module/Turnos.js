import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Turnos = sequelize.define("Turnos", {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_turnos')")
    },
    nome: {
        type: DataTypes.STRING, allowNull: false
    },
    ini: {
        type: DataTypes.TIME, allowNull: false
    },
    fim: {
        type: DataTypes.TIME, allowNull: false
    }
},
    {
        freezeTableName: true,
        tableName: "Turnos"
    }

)

export default Turnos