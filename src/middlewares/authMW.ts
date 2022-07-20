import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

export interface IMyRequest extends Request {
  id?: number,
  role?: string,
}

export default (request: Request, response: Response, next: NextFunction) => {
  // let decodedToekn = null;
  try {
    //@ts-ignore
    let token = request.get('Authorization').split(' ')[1];
    let decodedToekn = jwt.verify(token, process.env.secret_Key as string);
    (request as IMyRequest).role = (decodedToekn as IMyRequest).role;
    (request as IMyRequest).id = (decodedToekn as IMyRequest).id;
    next();
    // Catch clause variable type annotation must be 'any' or 'unknown' if specified.
  } catch (error: any) {
    error.message = 'Not Authorized';
    error.status = 403;
    next(error);
  }
};
