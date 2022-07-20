import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";
import { ICustomError } from "../app";


export default (request: Request, response: Response, next: NextFunction) => {

  let result = validationResult(request);
  if (!result.isEmpty()) {
    //@ts-ignore
    let message: string = result.errors.reduce((current: string, error: ICustomError) => current + error.msg + " ", "");
    let error: ICustomError = new Error(message);
    error.status = 422;
    throw error;
  }
  else
    next();

}

