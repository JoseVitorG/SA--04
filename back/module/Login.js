import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Login = sequelize.define("Login", {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_login')")
    },
    email:{
        type: DataTypes.STRING, allowNull: false, unique: true
    },
    senha:{
        type: DataTypes.STRING, allowNull: false
    }

})

export default Login