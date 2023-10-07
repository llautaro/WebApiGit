
'use strict';
import { timeStamp } from 'console';
import { DataTypes, Model, Optional,UUIDV4 } from 'sequelize';
import { sequelize } from './index';
/*
interface UserAttributes {
  id: string;
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  dateCreated: Date;
  dateDeleted:Date;
}*/

export class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public name!: string | null;
  public firstname!: string | null;
  public isActive!: boolean;
  public roles!: string[];
  public readonly dateCreated!: Date;
  public dateDeleted!: Date | null;
}

User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: "UQ_e12875dfb3b1d92d7d7c5377e22"
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  firstname: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  roles: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    allowNull: false,
    defaultValue: ["user"]
  },

  dateCreated: {
    type: DataTypes.DATE,
    allowNull: false
  },

  dateDeleted: {
    type: DataTypes.DATE,
    allowNull: true
  }


}, {
  sequelize,
  tableName: 'user',
  modelName: 'User',
  timestamps:false
});
/*

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes {
    
    id!: string;
  email!: string;
  password!: string;
  fullName!: string;
  isActive!: boolean;
  roles!: string[];
  dateCreated!: Date;
  dateDeleted!: Date;
    static associate(models: any) {
      // define association here
    }
  };

  //var user = sequelize.define('user',{},{})
  

  User.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "UQ_e12875dfb3b1d92d7d7c5377e22"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fullName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      defaultValue: ["user"]
    },

    dateCreated: {
      type: DataTypes.DATE,
      allowNull: false
    },

    dateDeleted: {
      type: DataTypes.DATE,
      allowNull: true
    }


  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
    timestamps:false
  });
  return User;
};

*/