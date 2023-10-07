import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtApplication from '../config/application'
import { AuthFailureError, ForbiddenError, constants } from '../helper'

/** Ignore check email verify condition endpoint list */
const endpointList = ['/verify-email', '/resend-verification-code'];


export default () => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.headers && !req.headers.startTime) {
      req.headers.startTime = Date.now();
    }
    if (req.headers.authorization) {
      if (!req.headers.authorization.startsWith('Bearer ')) {
        throw new AuthFailureError(constants.CODE.AUTHENTICATION_ERROR, 'constants.TITLE.AUTHENTICATION_ERROR');
      }
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        jwt.verify(token, jwtApplication.jwtSecret, (error: any, payload: any) => {
          if (error) {
            if (error.name === 'TokenExpiredError') {
              throw new AuthFailureError(constants.CODE.EXPIRED_TOKEN,'constants.TITLE.EXPIRED_TOKEN');
            }
            throw new AuthFailureError(constants.CODE.AUTHENTICATION_ERROR, 'constants.TITLE.AUTHENTICATION_ERROR');
          }
          /** Check valid type of request 
          if (!payload || type.indexOf(payload.type) === -1) {
            throw new ForbiddenError('constants.CODE.UNAUTHORIZED_REQUEST', 'constants.TITLE.UNAUTHORIZED_REQUEST');
          }
          */
          /** Check email verified
          if (payload && endpointList.indexOf(req.originalUrl) === -1 && !payload.isEmailVerified) {
            throw new ForbiddenError('constants.CODE.EMAIL_NOT_VERIFIED', 'constants.TITLE.EMAIL_NOT_VERIFIED');
          } */
          req.user = payload;
          next();
        });
      }
    } else {
      throw new AuthFailureError(constants.CODE.AUTHENTICATION_ERROR, 'constants.TITLE.AUTHENTICATION_ERROR');
    }
  };
};
