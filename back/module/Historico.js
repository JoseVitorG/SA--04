import { DataTypes } from "sequelize";
import sequelize from "../db";
import Funcionarios from "./Funcionarios";
import EPIs from "./EPIs";

const Historico = sequelize.define("Histórico", {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_historico')")
    },
    id_funcionarios: {
        type: DataTypes.STRING, allowNull: false, foreignKey: { model: Funcionarios, key: "id" }
    },
    id_epis: {
        type: DataTypes.INTEGER, allowNull: false, foreignKey: { model: EPIs, key: "id" }
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