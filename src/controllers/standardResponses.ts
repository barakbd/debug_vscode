import { Response  } from "express";
  
export function standardSuccessResponse(success: any, res: Response): Response{
    return res.status(200).json(success);
};

export function standardErrorResponse(error: any, res: Response): Response{
    return res.status(error.statusCode).json(error);
};