import { Response, NextFunction } from 'express';
import { BadRequestError } from '../helper/error';

export enum validationSource {
  BODY = 'body',
  HEADER = 'headers',
  QUERY = 'query',
  PARAM = 'params'
}
const validationMiddleware = (schema: any, source: validationSource = validationSource.BODY) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.headers && !req.headers.startTime) {
      req.headers.startTime = Date.now();
    }
    const { error } = schema.validate(req[source]);
    if (!error) {
      return next();
    }
    
    const { details } = error;
    let title = details.map((i: { message: string }) => i.message.replace(/['"]+/g, '')).join(',');
    const { type, context } = details[0];
    let code = '';
    const codeString = context.label
      .toLowerCase()
      .replace(/\[(\w+)\]/g, '')
      .replace(/\./g, '_');
      
    throw new BadRequestError(code, title);
  };
};

export default validationMiddleware;
