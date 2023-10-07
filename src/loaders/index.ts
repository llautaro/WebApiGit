import express from 'express';
import expressLoader from './express-loader';

export default (expressApp: express.Application) => {
  expressLoader(expressApp);
};
