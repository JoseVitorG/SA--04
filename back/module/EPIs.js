import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const EPIs = sequelize.define('EPIs', {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_sequence')")
    },
    nome: {
        type: DataTypes.STRING, allowNull: false, unique: true
    },
    descri: {
        type: DataTypes.STRING
    },
    qtd: {
        type: DataTypes.INTEGER, allowNull: false
    }

},
    {
        freezeTableName: true,
        tableName: "EPIs"
    }
)

export default EPIs