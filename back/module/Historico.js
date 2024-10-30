import { DataTypes } from "sequelize";
import sequelize from "../db";

const Historico = sequelize.define("Histórico", {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_historico')")
    },
    id_funcionarios: {
        type: DataTypes.STRING, allowNull: false
    },
    id_epis: {
        type: DataTypes.INTEGER, allowNull: false
    },
    horario_pego: {
        type: DataTypes.DATE, allowNull: false
    },
    horario_devolvido: {
        type: DataTypes.DATE, allowNull: false
    }
},
    {
        freezeTableName: true,
        tableName: "Histórico"
    }

)

export default Historico