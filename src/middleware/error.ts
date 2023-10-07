/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { apiResponse, constants } from '../helper';
//import { logger } from '../../libs';

interface GlobalDataObject {
  [key: string]: number | string | {};
}


 interface IError extends Error {
  code: string;
  title: string;
  data?: GlobalDataObject | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (error: IError, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  //logger.error('Error : ', error);
  switch (error.name) {
    case 'BadRequestError':
      statusCode = 400;
      break;

    case 'AuthFailureError':
      statusCode = 401;
      break;

    case 'ForbiddenError':
      statusCode = 403;
      break;

    case 'NotFoundError':
      statusCode = 404;
      break;

    default:
      return res
        .status(statusCode)
        .json(apiResponse.error(constants.CODE.GENERAL_EXCEPTION_MESSAGE, constants.TITLE.GENERAL_EXCEPTION_MESSAGE, error.data));
  }
  return res.status(statusCode).json(apiResponse.error(error.code, error.message, error.data));
};
