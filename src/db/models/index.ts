'use strict';

import fs from 'fs';
import path from 'path';
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db: any = {};
console.log("__dirname:" + __dirname)

//let sequelize: any;

export const sequelize = new Sequelize("testdb","postgres","px3EYK8fP5qB",{host: "149.50.131.134",
dialect:'postgres'}
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch( ()=>{
    console.error('Unable to connect to the database:');
  });


/*

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

*/