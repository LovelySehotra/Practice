import { Sequelize } from "sequelize";
import { userModel } from "./User.sq";
import { sessionModel } from "./Session.sq";


const db = new Sequelize('stonetekktest', 'postgres', '0506', {
    host: 'localhost',
    dialect:  'postgres' ,
    logging: false,
  });
export const User = userModel(db);
export const Session = sessionModel(db);
User.hasOne(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });
export { db };