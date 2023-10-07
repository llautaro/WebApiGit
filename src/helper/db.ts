import Sequelize from 'sequelize';
import { sequelizeErrorHandler } from '.';
import db from '../db';
//import { logger } from '../libs';
import { IQuery } from '../types/common';

const { sequelize } = db;
/**
 * Find One in db
 * @params model
 * @params query
 */
const findOne = (model: any, query: IQuery, plainJson: boolean = false) => {
  return model
    .findOne(query)
    .then((data: any) => (plainJson && data ? data.toJSON() : data))
    .catch((error: Error) => {
      //logger.error('Find One : ', error);
      return sequelizeErrorHandler(error);
    });
};

/**
 * Find All in db
 * @params model
 * @params query
 */
const findAll = (model: any, query: IQuery) => {
  return model.findAll(query).catch((error: Error) => {
    //logger.error('Find All : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * Find All with count
 * @params model
 * @params query
 */
const findAndCountAll = (model: any, query: IQuery) => {
  return model.findAndCountAll(query).catch((error: Error) => {
    //logger.error('Find All : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * Find By Pk in db
 * @params model
 * @params id
 */
const findByPk = (model: any, id: number) => {
  return model.findByPk(id).catch((error: Error) => {
    //logger.error('FindByPk : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * get count
 * @params model
 * @params query
 */
const count = (model: any, query: IQuery) => {
  return model.count(query).catch((error: Error) => {
    //logger.error('count : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * Create record with transaction
 * @params data
 */
const createWithTransaction = (transaction: Sequelize.Transaction, model: any, data: any) => {
  return model.create(data, { transaction }).catch((error: Error) => {
    //logger.error('Create record : ', error);
    transaction.rollback();
    sequelizeErrorHandler(error);
  });
};

/**
 * Create record
 * @params data
 */
const create = (model: any, data: any) => {
  return model.create(data).catch((error: Error) => {
    //logger.error('Create record : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * Find OR Create new record
 * @params query
 */
const findOrCreate = (model: any, query: any) => {
  return model.findOrCreate(query).catch((error: Error) => {
    //logger.error('Find or Create record : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * bulk Record Create With Transaction
 * @params data
 */
const bulkCreateWithTransaction = (transaction: Sequelize.Transaction, model: any, data: any) => {
  return model.bulkCreate(data, { transaction }).catch((error: Error) => {
    //logger.error('Bulk Create record : ', error);
    transaction.rollback();
    sequelizeErrorHandler(error);
  });
};

/**
 * bulk Record Create
 * @params data
 */
const bulkCreate = (model: any, data: any) => {
  return model.bulkCreate(data).catch((error: Error) => {
    //logger.error('Bulk Create record : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * bulk Record Update
 * @params data
 */
const bulkUpdate = (model: any, data: any, options: any = {}) => {
  return model.bulkCreate(data, options).catch((error: Error) => {
    //logger.error('Bulk Create record : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * Update record
 * @params query
 * @params data
 */
const update = (model: any, query: IQuery, returning: boolean = true) => {
  return model
    .update(query.data, { where: query.where, returning })
    .then(([rowsUpdate, [updatedUser]]: any) => {
      if (rowsUpdate > 0) {
        return updatedUser;
      }
      return false;
    })
    .catch((error: Error) => {
      //logger.error('Update record : ', error);
      return sequelizeErrorHandler(error);
    });
};

/**
 * Update record with transaction
 * @params query
 * @params data
 */
const updateWithTransaction = (transaction: Sequelize.Transaction, model: any, query: IQuery, returning: boolean = true) => {
  return model
    .update(query.data, { where: query.where, returning, transaction })
    .then(([rowsUpdate, [updatedData]]: any) => {
      if (rowsUpdate > 0) {
        return updatedData;
      }
      return false;
    })
    .catch((error: Error) => {
      //logger.error('Update record with transaction : ', error);
      transaction.rollback();
      sequelizeErrorHandler(error);
    });
};

/**
 * delete record
 * @params query
 * @params data
 */
const destroy = (model: any, query: IQuery) => {
  return model.destroy({ where: query.where }).catch((error: Error) => {
    //logger.error('Destroy record : ', error);
    sequelizeErrorHandler(error);
  });
};

/**
 * delete record
 * @params query
 * @params data
 */
const destroyWithTransaction = (transaction: Sequelize.Transaction, model: any, query: IQuery) => {
  return model.destroy({ where: query.where, transaction }).catch((error: Error) => {
    //logger.error('Destroy record : ', error);
    transaction.rollback();
    sequelizeErrorHandler(error);
  });
};

/** Run select query on database
 * @params query
 */
const selectQuery = (query: string) => {
  return sequelize.query(query, { type: Sequelize.QueryTypes.SELECT }).catch((error: Error) => {
    //logger.error('Select Query Error : ', error);
    sequelizeErrorHandler(error);
  });
};

export default {
  create,
  update,
  destroy,
  findByPk,
  findOne,
  count,
  createWithTransaction,
  updateWithTransaction,
  destroyWithTransaction,
  bulkCreateWithTransaction,
  findAll,
  findAndCountAll,
  selectQuery,
  findOrCreate,
  bulkCreate,
  bulkUpdate
};
