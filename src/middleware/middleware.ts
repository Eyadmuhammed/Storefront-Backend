import { Request, Response, NextFunction } from "express";
import Error from "../interfaces/error.interface";
const errromiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'something Error';
    res.status(status).json({ status, message });
};

export default errromiddleware;
