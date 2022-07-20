import { Request, Response, NextFunction } from 'express';
import { IMyRequest } from "./authMW";
import { ICustomError } from "../app";

export default (requiredRole: Array<string>) => (request: Request, response: Response, next: NextFunction) => {
    let authStatus: boolean = false;
    for (let choosenRole in requiredRole) {
        if (requiredRole[choosenRole] == 'patient-byId' || requiredRole[choosenRole] == 'doctor-byId' || requiredRole[choosenRole] == 'employee-byId' ||requiredRole[choosenRole] ==  'admin-byId') {
            console.log(requiredRole[choosenRole].split('-')[0]);
            if (((request as IMyRequest).role == requiredRole[choosenRole].split('-')[0]) && ((request as IMyRequest).id == ((request.params as { id: any }).id || 1))) {
                authStatus = true;
                next()
            }
        }
        else if (((request as IMyRequest).role != ('patient-byId' || 'doctor-byId' || 'employee-byId' || 'admin-byId')) && (request as IMyRequest).role == requiredRole[choosenRole]) {
            authStatus = true;
            next()
        }

    }
    if (authStatus === false) {
        let error: ICustomError = new Error("Not authorized");
        error.status = 403;
        next(error);
    }
}