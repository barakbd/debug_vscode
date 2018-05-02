//https://expressjs.com/en/guide/error-handling.html
import { ErrorRequestHandler } from "express";

export const errorRequestHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log("errorRequestHandler - no header sent yet");
  res.status(400);
  res.json(err);
};
