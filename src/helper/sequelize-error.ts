

import { BadRequestError, InternalError } from "./error";
import constants  from "./constants";

/* https://www.postgresql.org/docs/8.2/errcodes-appendix.html */

/* sequelize Unique Constraint Error */
const sequelizeUniqueConstraintError = (error: any) => {
  const code = error.original.code || 0;
  const errorResponse: any = {};
  let constraint = '';
  switch (code) {
    case '23505':
      constraint = error.original.constraint;
      //if (constraint && uniqueConstraint[constraint]) {
      //  errorResponse.errorCode = uniqueConstraint[constraint].errorCode;
      //  errorResponse.errorTitle = uniqueConstraint[constraint].errorTitle;
      //}
      break;
    default:
      break;
  }
  return errorResponse;
};

/* Sequelize Database Error */
const sequelizeDatabaseError = (error: any) => {
  const code = error.original.code || 0;
  const errorResponse: any = {};
  switch (code) {
    case '22001':
      errorResponse.errorCode = constants.CODE.TOO_LONG_CHARACTER;
      errorResponse.errorTitle = constants.TITLE.TOO_LONG_CHARACTER;
      break;
    default:
      break;
  }
  return errorResponse;
};

/** Handle sequelize error */
const sequelizeErrorHandler = (error: any) => {
  const errorResponse = {
    errorCode: constants.CODE.GENERAL_EXCEPTION_MESSAGE,
    errorTitle: constants.TITLE.GENERAL_EXCEPTION_MESSAGE
  };
  console.log(error)
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      Object.assign(errorResponse, sequelizeUniqueConstraintError(error));
      break;
    case 'SequelizeDatabaseError':
      Object.assign(errorResponse, sequelizeDatabaseError(error));
      break;
    default:
      throw new InternalError(errorResponse.errorCode, errorResponse.errorTitle);
  }
  throw new BadRequestError(errorResponse.errorCode, errorResponse.errorTitle);
};

export default sequelizeErrorHandler;
