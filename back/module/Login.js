import { DataTypes } from "sequelize";
import sequelize from "../db";

const Login = sequelize.define("Login", {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primaryKey: true, defaultValue: sequelize.literal("nextval('id_login')")
    },
    email:{
        type: DataTypes.STRING, allowNull: false, unique
    },
    senha:{
        type: DataTypes.STRING, allowNull: false
    }

})

export default Login