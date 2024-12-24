import { Sequelize } from "sequelize";

const sequelize = new Sequelize('stonetekktest', 'postgres', '0506', {
    host: 'localhost',
    dialect:  'postgres' ,
    logging: false,
  });

  export default sequelize;