import Report from "./../models/report";
import { RequestHandler } from "express";

export const getAllReport: RequestHandler = (req, res, next) => {
  Report.find({})
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((error: any) => {
      next(error);
    });
};

export const getReportById: RequestHandler = (req, res, next) => {
  Report.findOne({ _id: req.params.id })
    .then((data: any) => {
      if (data == null) {
        next(new Error("Report is not found"));
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error: any) => {
      next(error);
    });
};

export const createReport: RequestHandler = (req, res, next) => {
  let reportObj = new Report({
    _id: (req.body as { id: Number }).id,
    invoiceReport: (req.body as { invoiceReport: String }).invoiceReport,
    appointmentReport: (req.body as { appointmentReport: String })
      .appointmentReport,
  });
  reportObj
    .save()
    .then((data: any) => {
      res.status(201).json({ data: " data  added " });
    })
    .catch((error: any) => next(error));
  //});
};

export const updateReport: RequestHandler = async (req, res, next) => {
  try {
    const data: any = await Report.findOne({ _id: req.body.id });
    for (const key in req.body) {
      if (typeof req.body[key] == "object") {
        for (let item in req.body[key]) {
          data[key][item] = req.body[key][item];
        }
      } else data[key] = req.body[key];
    }

    await data.save();

    res.status(200).json({ data: "  updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteReport: RequestHandler = (req, response, next) => {
  Report.deleteOne({ _id: req.params.id }, {})
    .then((data: any) => {
      response.status(200).json(data);
    })
    .catch((error: any) => next(error));
};
