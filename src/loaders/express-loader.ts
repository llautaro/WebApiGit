import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
//import routes from '../api';
//import { error } from '../api/middleware';
//import { apiResponse, constants } from '../helpers';
//import  routes from "../routes";
import { isString } from 'util';
//import { routerUser } from '../routes/user';
import { routes } from '../routes';
import error from '../middleware/error';

require('dotenv').config();

export default (app: express.Application) => {
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req: Request, res: Response, next: NextFunction) => {
    Object.keys(req.body).forEach((key: string) => {
      if (isString(req.body[key])) {
        req.body[key] = req.body[key].trim();
      }
      return req.body[key];
    });

    Object.keys(req.params).forEach((key: string) => {
      if (isString(req.params[key])) {
        req.params[key] = req.params[key].trim();
      }
      return req.params[key];
    });
    next();
  });

  // app.use(legalAgreement);
  app.use("api/",routes);
  app.use(error);
  //app.use(error);

  //app.use((req, res) => {
    //return res.status(404).json(apiResponse.error(constants.CODE.ROUTE_NOT_FOUND, constants.TITLE.ROUTE_NOT_FOUND));
  //});
};