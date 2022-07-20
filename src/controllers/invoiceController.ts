import { RequestHandler } from "express";
import Invoice from "../models/invoice";

export const getAllInovice: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  Invoice.find({})
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const createInvoice: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  let object = new Invoice({
    paymentMethod: (req.body as { paymentMethod: string }).paymentMethod,
    patientId: (req.body as { patientId: number }).patientId,
    date: (req.body as { date: Date }).date,
    price: (req.body as { price: number }).price,
  });
  object
    .save()
    .then(() => {
      res.status(201).json({ data: "invoice Added " });
    })
    .catch((error) => next(error));
};

export const updateInvoice: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  Invoice.findOne({
    _id: (req.body as { id: number }).id,
  })
    .then((data: any) => {
      for (let key in req.body) {
        data[key] = req.body[key];
      }

      data.save().then(res.status(200).json({ data: "invoce data updated " }));
    })

    .catch((error: any) => {
      next(error);
    });
};

export const getInvoiceById: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  Invoice.find({ _id: req.params.id })
    .then((data: any) => {
      if (data == null) {
        next(new Error("invoice not found"));
      } else res.status(200).json(data);
    })
    .catch((error: any) => {
      next(error);
    });
};

export const deleteInvoiceById: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  Invoice.deleteOne({ _id: req.params.id })
    .then((data: any) => {
      if (data == null) {
        next(new Error("invoice not found"));
      } else res.status(200).json({ data: "invooice deleted " });
    })
    .catch((error: any) => {
      next(error);
    });
};
