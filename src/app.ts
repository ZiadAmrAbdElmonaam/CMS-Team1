import express, { Request, Response, NextFunction } from "express";
// remove at deployment
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

// import routes
// import clinicRoutes from './routes/clinicRoute';
import medicineRoutes from "./routes/medicineRoute";

import adminRoute from "./routes/adminRoute";
import reportRoute from "./routes/reportRoute";
import employeRoute from "./routes/employeeRoute";
import patientRoute from "./routes/patientRoute";
import invoicesRoute from "./routes/invoiceRoute";
import loginRoute from "./routes/loginRoute";

const server = express();
const port: number = 8080;
mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    console.log("DB Connected");
    // connect to the server
    server.listen(Number(process.env.port as string) || port, () => {
      console.log("server is up and currently listening");
    });
  })
  .catch((error: any) => console.log("Db Connection Error " + error));

//a- Middleware to write request url and method
server.use(morgan(":method :url"));

// b- Middle ware for CORS Package to allow Users reach your site.
server.use(cors());

// routes
server.use(express.json());

// server.use(clinicRoutes);
server.use(medicineRoutes);

server.use(adminRoute);
server.use(reportRoute);
server.use(employeRoute);
server.use(loginRoute);
server.use(patientRoute);
server.use(invoicesRoute);

// c- General middleware for not Found url pathes with 404 status code.
server.use((request: Request, response: Response) => {
  response.status(404).send("Page Not Found");
});

// c- General middleware for not Found url pathes with 404 status code.
server.use((request: Request, response: Response) => {
  response.status(404).send("Page Not Found");
});

export interface ICustomError extends Error {
  status?: number;
}

// d- One Error handling middleware

server.use(
  (
    error: ICustomError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    let status = error.status || 500;
    response.status(status).json({ message: "Internal Error" + error });
  }
);
