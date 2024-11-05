import { Sequelize } from 'sequelize';

// postgresql://jos_:F6I2rl_mFOYJZm8oNvWNEQ@soda-cougar-2273.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full

const sequelize = new Sequelize('postgresql://jos_:F6I2rl_mFOYJZm8oNvWNEQ@soda-cougar-2273.jxf.gcp-southamerica-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full')

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


export default sequelize